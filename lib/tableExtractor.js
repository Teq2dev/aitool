/**
 * tableExtractor.js — Intelligent Table Detection & Row/Column Grid Reconstruction
 *
 * Takes OCR word/line bounding boxes with coordinates and geometry:
 * 1. Clusters words on horizontal Y-axis lines with dynamic thresholding to form rows.
 * 2. Identifies vertical column boundaries across the entire document.
 * 3. Assigns each word/token to its respective (row, col) cell coordinate.
 * 4. Merges multi-word cell contents and cleans up OCR artifacts.
 * 5. Returns a structured 2D grid of rows and columns.
 */

export function reconstructTableFromOCR(ocrResult, imgWidth, imgHeight) {
  // Extract all text lines / words with bounding box info
  const items = [];

  if (ocrResult.data && ocrResult.data.words && ocrResult.data.words.length > 0) {
    for (const w of ocrResult.data.words) {
      if (!w.text || !w.text.trim()) continue;
      const bbox = w.bbox || {
        x0: w.x0 || 0,
        y0: w.y0 || 0,
        x1: w.x1 || 10,
        y1: w.y1 || 10,
      };
      items.push({
        text: w.text.trim(),
        x0: bbox.x0,
        y0: bbox.y0,
        x1: bbox.x1,
        y1: bbox.y1,
        cx: (bbox.x0 + bbox.x1) / 2,
        cy: (bbox.y0 + bbox.y1) / 2,
        w: bbox.x1 - bbox.x0,
        h: bbox.y1 - bbox.y0,
      });
    }
  } else if (ocrResult.data && ocrResult.data.lines && ocrResult.data.lines.length > 0) {
    for (const l of ocrResult.data.lines) {
      if (!l.text || !l.text.trim()) continue;
      const bbox = l.bbox || { x0: 0, y0: 0, x1: 100, y1: 20 };
      items.push({
        text: l.text.trim(),
        x0: bbox.x0,
        y0: bbox.y0,
        x1: bbox.x1,
        y1: bbox.y1,
        cx: (bbox.x0 + bbox.x1) / 2,
        cy: (bbox.y0 + bbox.y1) / 2,
        w: bbox.x1 - bbox.x0,
        h: bbox.y1 - bbox.y0,
      });
    }
  }

  // Fallback: If no bounding boxes available, parse raw text lines
  if (items.length === 0) {
    const rawText = (ocrResult.data?.text || ocrResult.text || '').trim();
    if (!rawText) return { headers: [], rows: [] };

    const rawLines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);
    const parsedRows = rawLines.map((line) => {
      // Split by tab, multiple spaces (>=2), or pipes/commas
      if (line.includes('\t')) return line.split('\t').map((c) => c.trim());
      if (line.includes('|')) return line.split('|').map((c) => c.trim()).filter(Boolean);
      if (line.includes('  ')) return line.split(/\s{2,}/).map((c) => c.trim());
      if (line.includes(',') && line.split(',').length >= 3) return line.split(',').map((c) => c.trim());
      return line.split(/\s+/).map((c) => c.trim());
    });

    if (parsedRows.length === 0) return { headers: [], rows: [] };
    const maxCols = Math.max(...parsedRows.map((r) => r.length));
    const normalized = parsedRows.map((r) => {
      while (r.length < maxCols) r.push('');
      return r;
    });

    return {
      headers: normalized[0] || [],
      rows: normalized.slice(1),
    };
  }

  // Sort all bounding boxes vertically top to bottom, then horizontally left to right
  items.sort((a, b) => a.y0 - b.y0 || a.x0 - b.x0);

  // Compute average word height to determine line-clustering tolerance
  const avgHeight = items.reduce((sum, it) => sum + it.h, 0) / items.length || 15;
  const lineThreshold = Math.max(8, avgHeight * 0.65);

  // Step 1: Cluster items into Horizontal Rows
  const rowClusters = [];
  for (const item of items) {
    let matchedRow = null;
    for (const row of rowClusters) {
      if (Math.abs(item.cy - row.avgY) <= lineThreshold) {
        matchedRow = row;
        break;
      }
    }

    if (matchedRow) {
      matchedRow.items.push(item);
      matchedRow.avgY = matchedRow.items.reduce((s, it) => s + it.cy, 0) / matchedRow.items.length;
    } else {
      rowClusters.push({ avgY: item.cy, items: [item] });
    }
  }

  // Sort rows top-to-bottom
  rowClusters.sort((a, b) => a.avgY - b.avgY);

  // For each row, sort items left-to-right
  rowClusters.forEach((row) => {
    row.items.sort((a, b) => a.x0 - b.x0);
  });

  // Step 2: Determine Vertical Column Anchors across all rows
  // Find all horizontal x-centers
  const xPositions = items.map((it) => it.x0).sort((a, b) => a - b);
  const colThreshold = Math.max(25, (imgWidth || 1000) * 0.04);

  const columnCenters = [];
  for (const x of xPositions) {
    const matchedCol = columnCenters.find((c) => Math.abs(x - c.avgX) <= colThreshold);
    if (matchedCol) {
      matchedCol.points.push(x);
      matchedCol.avgX = matchedCol.points.reduce((s, p) => s + p, 0) / matchedCol.points.length;
    } else {
      columnCenters.push({ avgX: x, points: [x] });
    }
  }

  // Filter significant columns and sort left-to-right
  columnCenters.sort((a, b) => a.avgX - b.avgX);

  // Step 3: Populate 2D Grid
  const grid = [];
  for (const row of rowClusters) {
    const rowCells = new Array(columnCenters.length).fill('');

    for (const item of row.items) {
      // Find closest column
      let closestColIdx = 0;
      let minDistance = Infinity;

      columnCenters.forEach((col, idx) => {
        const dist = Math.abs(item.x0 - col.avgX);
        if (dist < minDistance) {
          minDistance = dist;
          closestColIdx = idx;
        }
      });

      if (rowCells[closestColIdx]) {
        rowCells[closestColIdx] += ' ' + item.text;
      } else {
        rowCells[closestColIdx] = item.text;
      }
    }

    grid.push(rowCells);
  }

  // Remove completely empty columns across all rows
  if (grid.length > 0) {
    const activeCols = [];
    const numCols = grid[0].length;

    for (let c = 0; c < numCols; c++) {
      const hasContent = grid.some((r) => r[c] && r[c].trim().length > 0);
      if (hasContent) activeCols.push(c);
    }

    if (activeCols.length > 0 && activeCols.length < numCols) {
      const prunedGrid = grid.map((r) => activeCols.map((cIdx) => r[cIdx] || ''));
      return {
        headers: prunedGrid[0] || [],
        rows: prunedGrid.slice(1),
      };
    }
  }

  return {
    headers: grid[0] || [],
    rows: grid.slice(1),
  };
}
