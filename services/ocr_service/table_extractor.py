"""
table_extractor.py — Neural Table Region Isolation & Cell Normalization Engine

Two-pass extraction algorithm:
  Pass 1: Full-image layout analysis → find all type=='table' bounding boxes
  Pass 2: Crop each table region (+ padding) → re-run recognition on the crop

This approach eliminates contamination from:
  - Excel application chrome (File/Home/Insert menus, toolbar)
  - Spreadsheet column letters (A, B, C, D...)
  - Page titles, logos, footers, decorative borders
  - Unrelated text blocks on the same page

Multiple tables: all detected table regions returned separately in tables[].
No-table images: raises ValueError with a clear user-facing message.
"""

import os
import re
import html
import time
import numpy as np
from typing import Dict, Any, List, Tuple, Optional
from bs4 import BeautifulSoup

# ─── Singleton engine ─────────────────────────────────────────────────────────
_ENGINE = None

def get_engine():
    global _ENGINE
    if _ENGINE is None:
        os.environ["CUDA_VISIBLE_DEVICES"] = ""
        os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"
        os.environ["FLAGS_allocator_strategy"] = "naive_best_fit"
        from paddleocr import PPStructure
        _ENGINE = PPStructure(table=True, ocr=True, show_log=False)
    return _ENGINE


# ─── UI Chrome filter ─────────────────────────────────────────────────────────
# Patterns that look like Excel/Sheets application chrome and should never
# be treated as table data rows.
_UI_CHROME_TOKENS = [
    r'^[A-Z]{1,3}$',           # Spreadsheet column letters: A, B, AB, AAA
    r'^File$', r'^Home$', r'^Insert$', r'^Draw$', r'^View$', r'^Data$',
    r'^Review$', r'^Format$', r'^Help$', r'^Formulas$', r'^Page Layout$',
    r'^Edit$', r'^Window$', r'^Tools$', r'^Developer$',
    r'^Paste$', r'^Cut$', r'^Copy$', r'^Undo$', r'^Redo$', r'^AutoSum$',
    r'^Normal$', r'^Bold$', r'^Italic$', r'^Underline$', r'^Wrap Text$',
    r'^Calibri.*', r'^Arial.*', r'^Times.*', r'^Aptos.*', r'^Cambria.*',
    r'^Sheet\d+$',              # Sheet1, Sheet2 tabs
    r'^\d+%$',                  # Zoom percentage: 110%
    r'^Ready$', r'^Count.*',    # Excel status bar
    r'^Sign in$', r'^Share$',   # Excel online header
]
_UI_CHROME_RE = [re.compile(p, re.IGNORECASE) for p in _UI_CHROME_TOKENS]


def _looks_like_chrome(cell: str) -> bool:
    """True if a single cell value looks like Excel UI chrome."""
    cell = cell.strip()
    return bool(cell and any(pat.match(cell) for pat in _UI_CHROME_RE))


def strip_ui_chrome(headers: List[str], rows: List[List[str]]) -> Tuple[List[str], List[List[str]]]:
    """
    Remove leading rows that are predominantly Excel application chrome.
    A row is considered chrome if >= 60% of its non-empty cells match chrome patterns.
    """
    all_rows = [headers] + rows

    cleaned = []
    for row in all_rows:
        non_empty = [c.strip() for c in row if c.strip()]
        if not non_empty:
            continue  # drop fully empty rows
        chrome_count = sum(1 for c in non_empty if _looks_like_chrome(c))
        chrome_ratio = chrome_count / len(non_empty)
        if chrome_ratio < 0.6:
            cleaned.append(row)

    if not cleaned:
        return [], []
    return cleaned[0], cleaned[1:]


# ─── HTML table parser ────────────────────────────────────────────────────────

def parse_html_table_to_matrix(html_str: str) -> Tuple[List[str], List[List[str]]]:
    """Parse PP-Structure HTML table output into (headers, data_rows)."""
    if not html_str:
        return [], []
    soup = BeautifulSoup(html_str, 'html.parser')
    table = soup.find('table')
    if not table:
        return [], []

    raw_rows = []
    for tr in table.find_all('tr'):
        row_cells = []
        for cell in tr.find_all(['td', 'th']):
            text = re.sub(r'\s+', ' ', html.unescape(
                cell.get_text(separator=' ', strip=True)
            ))
            colspan = int(cell.get('colspan', 1))
            row_cells.append(text)
            for _ in range(colspan - 1):
                row_cells.append('')
        if any(c.strip() for c in row_cells):
            raw_rows.append(row_cells)

    if not raw_rows:
        return [], []

    max_cols = max(len(r) for r in raw_rows)
    for r in raw_rows:
        while len(r) < max_cols:
            r.append('')

    return raw_rows[0], raw_rows[1:]


# ─── Region OCR → 2D grid (fallback, table-crop only) ────────────────────────

def parse_ocr_regions_to_matrix(
    elements: list, img_width: int, img_height: int
) -> Tuple[List[str], List[List[str]]]:
    """Reconstruct a 2D cell matrix from raw OCR element list.
    Only called on elements that were already extracted from a cropped table region."""
    items = []
    for el in elements:
        if isinstance(el, dict):
            text = str(el.get('text', '')).strip()
            region = el.get('text_region', [])
        elif isinstance(el, (list, tuple)) and len(el) >= 2:
            region = el[0]
            val = el[1]
            text = str(val[0] if isinstance(val, (list, tuple)) else val).strip()
        else:
            continue
        if not text or not region:
            continue
        xs = [pt[0] for pt in region]
        ys = [pt[1] for pt in region]
        x0, x1 = min(xs), max(xs)
        y0, y1 = min(ys), max(ys)
        items.append({
            'text': text,
            'x0': x0, 'y0': y0, 'x1': x1, 'y1': y1,
            'cx': (x0 + x1) / 2, 'cy': (y0 + y1) / 2,
            'h': max(10, y1 - y0),
        })

    if not items:
        return [], []

    items.sort(key=lambda it: it['y0'])
    avg_h = sum(it['h'] for it in items) / len(items)
    line_thresh = max(10.0, avg_h * 0.7)

    # Cluster into rows by vertical alignment
    rows_clustered = []
    for it in items:
        matched = False
        for row in rows_clustered:
            if abs(it['cy'] - row['avgY']) <= line_thresh:
                row['items'].append(it)
                row['avgY'] = sum(i['cy'] for i in row['items']) / len(row['items'])
                matched = True
                break
        if not matched:
            rows_clustered.append({'avgY': it['cy'], 'items': [it]})

    rows_clustered.sort(key=lambda r: r['avgY'])
    for r in rows_clustered:
        r['items'].sort(key=lambda it: it['x0'])

    # Build column anchors by clustering X positions
    col_thresh = max(24.0, img_width * 0.05)
    all_xs = sorted(it['x0'] for it in items)
    col_anchors = []
    for x in all_xs:
        matched = False
        for col in col_anchors:
            if abs(x - col['avgX']) <= col_thresh:
                col['points'].append(x)
                col['avgX'] = sum(col['points']) / len(col['points'])
                matched = True
                break
        if not matched:
            col_anchors.append({'avgX': x, 'points': [x]})
    col_anchors.sort(key=lambda c: c['avgX'])

    # Fill 2D grid
    grid = []
    for r in rows_clustered:
        row_cells = [''] * len(col_anchors)
        for it in r['items']:
            best_c = min(range(len(col_anchors)),
                         key=lambda idx: abs(it['x0'] - col_anchors[idx]['avgX']))
            sep = ' ' if row_cells[best_c] else ''
            row_cells[best_c] = row_cells[best_c] + sep + it['text']
        grid.append(row_cells)

    if not grid:
        return [], []

    col_has_content = [any(row[c].strip() for row in grid)
                       for c in range(len(col_anchors))]
    filtered = [[row[c] for c in range(len(col_anchors)) if col_has_content[c]]
                for row in grid]

    return (filtered[0], filtered[1:]) if filtered else ([], [])


# ─── Crop helper ──────────────────────────────────────────────────────────────

def _crop_with_padding(
    image: np.ndarray, bbox: List[int], padding: int = 15
) -> Tuple[np.ndarray, List[int]]:
    """Crop image to bbox with padding clamped to image bounds."""
    h, w = image.shape[:2]
    x1, y1, x2, y2 = int(bbox[0]), int(bbox[1]), int(bbox[2]), int(bbox[3])
    x1 = max(0, x1 - padding)
    y1 = max(0, y1 - padding)
    x2 = min(w, x2 + padding)
    y2 = min(h, y2 + padding)
    return image[y1:y2, x1:x2].copy(), [x1, y1, x2, y2]


# ─── Single-region extraction (runs on a pre-cropped table image) ─────────────

def _extract_from_crop(engine, cropped: np.ndarray) -> Tuple[List[str], List[List[str]]]:
    """
    Run PP-Structure on an already-cropped table image and return (headers, rows).
    Since the input is already a crop of just the table, we accept ALL output
    (including the fallback to OCR grid) because contamination has been removed.
    """
    ch, cw = cropped.shape[:2]
    try:
        results = engine(cropped)
    except Exception as e:
        raise RuntimeError(f"PP-Structure inference on crop failed: {e}")

    if not isinstance(results, list):
        return [], []

    # Priority 1: type=='table' HTML in crop result
    for item in results:
        if not isinstance(item, dict):
            continue
        if item.get('type') == 'table' and isinstance(item.get('res'), dict):
            html_code = item['res'].get('html', '')
            if html_code:
                hdr, rws = parse_html_table_to_matrix(html_code)
                hdr, rws = strip_ui_chrome(hdr, rws)
                if hdr or rws:
                    return hdr, rws

    # Priority 2: any HTML output (crop is small, layout type may differ)
    for item in results:
        if not isinstance(item, dict):
            continue
        if isinstance(item.get('res'), dict):
            html_code = item['res'].get('html', '')
            if html_code:
                hdr, rws = parse_html_table_to_matrix(html_code)
                hdr, rws = strip_ui_chrome(hdr, rws)
                if hdr or rws:
                    return hdr, rws

    # Priority 3: raw OCR elements from type=='table' within the crop
    table_elements = []
    for item in results:
        if isinstance(item, dict) and item.get('type') == 'table':
            res = item.get('res', [])
            if isinstance(res, list):
                table_elements.extend(res)

    if table_elements:
        hdr, rws = parse_ocr_regions_to_matrix(table_elements, cw, ch)
        hdr, rws = strip_ui_chrome(hdr, rws)
        if hdr or rws:
            return hdr, rws

    # Priority 4: all OCR elements from the crop (crop is isolated, safe to use all)
    all_elements = []
    for item in results:
        if isinstance(item, dict):
            res = item.get('res', [])
            if isinstance(res, list):
                all_elements.extend(res)
        elif isinstance(item, list):
            all_elements.extend(item)

    if all_elements:
        hdr, rws = parse_ocr_regions_to_matrix(all_elements, cw, ch)
        hdr, rws = strip_ui_chrome(hdr, rws)
        return hdr, rws

    return [], []


# ─── Main entry point ─────────────────────────────────────────────────────────

def extract_table(image_cv: np.ndarray) -> Dict[str, Any]:
    """
    Two-pass table extraction pipeline.

    Pass 1 — Full-image layout analysis:
        Run PPStructure on the complete image.
        Collect every result item where type == 'table'.
        Items where type == 'title', 'text', 'figure', 'header', 'footer'
        are explicitly ignored.

    Pass 2 — Per-table crop & re-recognize:
        For each detected table bbox, crop the original image (+ 15px padding).
        Re-run PPStructure on the cropped image.
        Parse the HTML table output from the crop.
        Apply UI-chrome filter to remove any residual column letters or
        application menu text that leaked into the crop boundary.

    Multiple tables:
        Each detected table is returned separately in `tables[]`.
        The largest table by cell count becomes the primary `headers`/`rows`
        at the top level for backward compatibility.

    No table:
        Raises ValueError with a user-facing message when no type=='table'
        region is detected in the full-image pass.
    """
    start_time = time.time()
    engine = get_engine()
    h, w = image_cv.shape[:2]

    # ── Pass 1: Full-image layout analysis ──────────────────────────────────
    try:
        full_results = engine(image_cv)
    except Exception as e:
        raise RuntimeError(f"Layout analysis failed: {e}")

    # Collect type=='table' regions with their bboxes
    table_regions = []
    for item in (full_results or []):
        if not isinstance(item, dict):
            continue
        if item.get('type') != 'table':
            continue  # Explicitly skip: title, text, figure, header, footer, logo

        bbox = item.get('bbox')
        res = item.get('res', {})

        if bbox and isinstance(bbox, (list, tuple)) and len(bbox) == 4:
            table_regions.append({'bbox': list(map(int, bbox)), 'html_direct': None})
            # If the layout pass already extracted HTML, save it to avoid a redundant crop
            if isinstance(res, dict) and res.get('html'):
                table_regions[-1]['html_direct'] = res['html']
        elif isinstance(res, dict) and res.get('html'):
            # HTML available but no explicit bbox — treat the whole image as the table
            table_regions.append({'bbox': [0, 0, w, h], 'html_direct': res['html']})

    # ── No type=='table' detected — reject immediately ──────────────────────
    if not table_regions:
        elapsed = round(time.time() - start_time, 2)
        raise ValueError(
            "We couldn't detect a table in this image. "
            "Please upload an image that contains a visible table or spreadsheet."
        )

    # ── Pass 2: Per-table crop + recognition ────────────────────────────────
    extracted_tables = []
    for region in table_regions:
        bbox = region['bbox']
        html_direct = region.get('html_direct')

        # --- Sub-pass A: use HTML already extracted during layout pass -------
        if html_direct:
            hdr, rws = parse_html_table_to_matrix(html_direct)
            hdr, rws = strip_ui_chrome(hdr, rws)
            col_count = max(len(hdr), max((len(r) for r in rws), default=0))
            row_count = (1 if hdr else 0) + len(rws)
            if row_count > 0 and col_count > 0:
                extracted_tables.append({
                    'headers': hdr, 'rows': rws,
                    'rowCount': row_count, 'colCount': col_count,
                    'bbox': bbox, 'source': 'html_layout_pass',
                })
                continue

        # --- Sub-pass B: crop image → re-run recognition --------------------
        cropped, adj_bbox = _crop_with_padding(image_cv, bbox, padding=15)
        if cropped.size == 0:
            continue

        try:
            hdr, rws = _extract_from_crop(engine, cropped)
        except Exception:
            hdr, rws = [], []

        hdr, rws = strip_ui_chrome(hdr, rws)
        col_count = max(len(hdr), max((len(r) for r in rws), default=0))
        row_count = (1 if hdr else 0) + len(rws)
        if row_count > 0 and col_count > 0:
            extracted_tables.append({
                'headers': hdr, 'rows': rws,
                'rowCount': row_count, 'colCount': col_count,
                'bbox': bbox, 'source': 'crop_rerun',
            })

    elapsed = round(time.time() - start_time, 2)

    # ── No usable table content after extraction ─────────────────────────────
    if not extracted_tables:
        raise ValueError(
            "Tables were detected in the image but no readable content could be extracted. "
            "Please try a higher-resolution, less-compressed image."
        )

    # ── Determine primary table (largest by total cells) ────────────────────
    primary = max(extracted_tables, key=lambda t: t['rowCount'] * t['colCount'])

    return {
        "success": True,
        # Multiple-table response: each table as a separate object
        "tables": [
            {
                "headers": t['headers'],
                "rows": t['rows'],
                "rowCount": t['rowCount'],
                "colCount": t['colCount'],
            }
            for t in extracted_tables
        ],
        # Primary table at top level (backward compatibility with frontend)
        "headers": primary['headers'],
        "rows": primary['rows'],
        "rowCount": primary['rowCount'],
        "colCount": primary['colCount'],
        "metadata": {
            "processingTimeSec": elapsed,
            "model": "PP-StructureV2 / SLANet-v2.0 (paddleocr 2.8.1)",
            "imageWidth": w,
            "imageHeight": h,
            "tablesFound": len(extracted_tables),
            "algorithm": "two-pass: full-layout → bbox-crop → recognition",
        },
    }
