"""
revalidation.py — Post-fix validation using the same ground-truth test images.

Runs:
  1. The exact same 6 ground-truth images from before (same cell accuracy formula)
  2. 7 additional edge-case tests
  3. Performance measurement (warm vs. cold)
"""

import sys, os, time, io
import numpy as np

TEST_DIR = r"C:\Users\dparw\Desktop\Jpeg to exl\test"
os.environ["CUDA_VISIBLE_DEVICES"] = ""
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"
os.environ["FLAGS_allocator_strategy"] = "naive_best_fit"
os.environ["PYTHONUTF8"] = "1"

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from table_extractor import extract_table
from image_processor import load_image_bytes, deskew_image, enhance_table_contrast

RESULTS = []


# ─── Ground truth (same as previous validation) ───────────────────────────────

GROUND_TRUTH = {
    "470e2004699fedbf92f7876075929dcf754b9d5a.png": {
        "label": "Excel screenshot (EmployeeName/Qty/Price)",
        "expected_rows": 11, "expected_cols": 6,
        "gt_cells": {
            (0,0): "EmployeeName", (0,1): "Qty",   (0,2): "Price",
            (0,3): "Value",        (0,4): "Description1", (0,5): "Description2",
            (1,0): "A",            (1,1): "23.00",  (1,2): "12.50",
            (1,3): "100",          (1,4): "Des-1",  (1,5): "Item-1",
            (2,0): "A",            (2,1): "34.00",  (2,2): "12.50",
            (2,3): "200",          (2,4): "Des-1",  (2,5): "Item-1",
            (3,0): "A",            (3,1): "45.00",  (3,2): "15.00",
            (10,0): "C",           (10,1): "23.00", (10,2): "17.00",
            (10,3): "1200",        (10,4): "Des-6", (10,5): "Item-3",
        }
    },
    "4a67919e0368e6d5ef4b3b7570baba221fcd8114.jpg": {
        "label": "Excel screenshot (Sales Team Review)",
        "expected_rows": 10, "expected_cols": 6,
        "gt_cells": {
            (0,0): "Salesperson",    (0,1): "Region Covered", (0,5): "Percent Change",
            (1,0): "Jeffrey Burke",  (1,1): "Oklahoma",
            (2,0): "Amy Fernandez",  (2,1): "North Carolina",
            (8,0): "Paula Hall",     (8,1): "Virginia",
        }
    },
    "xcxc.jpg": {
        "label": "Balance sheet (2-col vertical list)",
        "expected_rows": 30, "expected_cols": 2,
        "gt_cells": {
            (0,0): "Current Assets",
            (1,0): "Cash and Cash Equivalents", (1,1): "8,903,000",
            (2,0): "Short-Term Investments",    (2,1): "20,546,000",
            (3,0): "Net Receivables",           (3,1): "3,993,000",
        }
    },
    "images.jpg": {
        "label": "Salary sheet (borderless, colored rows)",
        "expected_rows": 8, "expected_cols": 5,
        "gt_cells": {
            (0,0): "Employee Name", (0,1): "Basic",      (0,2): "Allowances",
            (0,3): "Deductions",    (0,4): "Net Salary",
            (1,0): "John Doe",      (1,1): "4.000",      (1,2): "1.000",
            (1,3): "300",           (1,4): "4.700",
            (2,0): "Jane Smith",    (2,1): "4.500",
            (7,0): "James Miller",  (7,1): "3.800",      (7,4): "4.100",
        }
    },
    "ds.png": {
        "label": "Excel screenshot (Employee/Department/Salary)",
        "expected_rows": 16, "expected_cols": 3,
        "gt_cells": {
            (0,0): "Employee Name", (0,1): "Department", (0,2): "Salary",
            (1,0): "John Doe",      (1,1): "HR",         (1,2): "50000",
            (15,0): "Benjamin Harris", (15,1): "Operations", (15,2): "51000",
        }
    },
    "dfsdfsdf.png": {
        "label": "Balance sheet (bordered, multi-column)",
        "expected_rows": 14, "expected_cols": 6,
        "gt_cells": {
            (0,0): "Description", (0,1): "Category", (0,2): "Debit",
            (0,3): "Credit",      (0,4): "Balance",   (0,5): "Cr/Dr",
            (1,0): "Sales",       (1,1): "Income",
        }
    },
}


def load_img(fpath):
    with open(fpath, "rb") as f:
        data = f.read()
    img = load_image_bytes(data)
    img = deskew_image(img)
    img = enhance_table_contrast(img)
    return img


def compute_accuracy(gt_cells, headers, rows):
    matrix = [headers] + rows
    correct, total, details = 0, len(gt_cells), []
    for (r, c), expected in gt_cells.items():
        if r < len(matrix) and c < len(matrix[r]):
            actual = matrix[r][c].strip()
            an = actual.replace(",","").replace("$","").strip().lower()
            en = expected.replace(",","").replace("$","").strip().lower()
            if an == en:
                correct += 1
                details.append(f"      [OK]   ({r},{c}) expected='{expected}' got='{actual}'")
            else:
                details.append(f"      [FAIL] ({r},{c}) expected='{expected}' got='{actual}'")
        else:
            details.append(f"      [MISS] ({r},{c}) expected='{expected}' -- out of range (matrix={len(matrix)}x{len(matrix[0]) if matrix else 0})")
    return correct, total, details


def run_test(fname, label, expected_rows, expected_cols, gt_cells=None, expected_no_table=False):
    fpath = os.path.join(TEST_DIR, fname)
    if not os.path.exists(fpath):
        print(f"\n  [{fname}] SKIPPED -- file not found")
        return

    print(f"\n  Testing: {label}")
    t0 = time.time()
    try:
        img = load_img(fpath)
        result = extract_table(img)
        elapsed = round(time.time() - t0, 2)

        if expected_no_table:
            print(f"      Status  : UNEXPECTED OK (expected no-table error) [{elapsed}s]")
            RESULTS.append({"label": label[:55], "status": "UNEXPECTED_OK", "elapsed": elapsed, "accuracy": "N/A"})
            return

        headers = result.get("headers", [])
        rows = result.get("rows", [])
        row_count = result.get("rowCount", 0)
        col_count = result.get("colCount", 0)
        tables_found = result.get("metadata", {}).get("tablesFound", 1)
        algorithm = result.get("metadata", {}).get("algorithm", "")

        row_ok = row_count >= expected_rows * 0.7 if expected_rows else True
        col_ok = col_count >= expected_cols * 0.7 if expected_cols else True

        print(f"      Status      : OK [{elapsed}s]")
        print(f"      Algorithm   : {algorithm}")
        print(f"      Tables found: {tables_found}")
        print(f"      Detected    : {row_count} rows x {col_count} cols")
        print(f"      Expected    : {expected_rows} rows x {expected_cols} cols")
        print(f"      Row match   : {'OK' if row_ok else 'FAIL'}   Col match: {'OK' if col_ok else 'FAIL'}")

        if gt_cells:
            correct, total, details = compute_accuracy(gt_cells, headers, rows)
            pct = round(correct / total * 100, 1) if total else 0
            print(f"      Cell acc    : {correct}/{total} ({pct}%)")
            for d in details:
                print(d)
            RESULTS.append({
                "label": label[:55], "status": "OK",
                "det_rows": row_count, "det_cols": col_count,
                "exp_rows": expected_rows, "exp_cols": expected_cols,
                "correct": correct, "total": total, "pct": pct,
                "elapsed": elapsed, "tables_found": tables_found,
            })
        else:
            print(f"      Cell acc    : No GT")
            RESULTS.append({
                "label": label[:55], "status": "OK",
                "det_rows": row_count, "det_cols": col_count,
                "exp_rows": expected_rows, "exp_cols": expected_cols,
                "correct": None, "total": None, "pct": None,
                "elapsed": elapsed, "tables_found": tables_found,
            })

    except ValueError as ve:
        elapsed = round(time.time() - t0, 2)
        if expected_no_table:
            print(f"      Status  : PASS (no-table correctly rejected) [{elapsed}s]")
            print(f"      Message : {ve}")
            RESULTS.append({"label": label[:55], "status": "NO_TABLE_PASS", "elapsed": elapsed, "accuracy": "N/A"})
        else:
            print(f"      Status  : FAIL (ValueError) [{elapsed}s] -- {ve}")
            RESULTS.append({"label": label[:55], "status": f"ERROR: {str(ve)[:60]}", "elapsed": elapsed, "accuracy": "N/A"})
    except Exception as e:
        elapsed = round(time.time() - t0, 2)
        print(f"      Status  : ERROR [{elapsed}s] -- {e}")
        RESULTS.append({"label": label[:55], "status": f"ERROR: {str(e)[:60]}", "elapsed": elapsed, "accuracy": "N/A"})


# ─── Performance helper ───────────────────────────────────────────────────────

def measure_performance():
    print("\n" + "="*70)
    print("PERFORMANCE")
    print("="*70)
    import psutil
    proc = psutil.Process(os.getpid())

    test_path = os.path.join(TEST_DIR, "ds.png")
    img = load_img(test_path)

    mem_before = proc.memory_info().rss / 1_000_000

    print("\n  [WARM] Running 3 back-to-back extractions on ds.png (medium image) ...")
    times = []
    for i in range(3):
        t0 = time.time()
        extract_table(img)
        times.append(round(time.time() - t0, 2))
    avg = round(sum(times)/len(times), 2)

    mem_after = proc.memory_info().rss / 1_000_000
    print(f"      Warm times     : {times}")
    print(f"      Average warm   : {avg}s")
    print(f"      Memory (before): {mem_before:.0f} MB")
    print(f"      Memory (after) : {mem_after:.0f} MB")

    # Larger image
    large_path = os.path.join(TEST_DIR, "IC-Personal-Financial-Statement-12332_Template.png")
    if os.path.exists(large_path):
        print("\n  [WARM] Large complex image (Personal Financial Statement) ...")
        img_large = load_img(large_path)
        t0 = time.time()
        extract_table(img_large)
        t_large = round(time.time() - t0, 2)
        print(f"      Time: {t_large}s")

    return {"warm_avg_s": avg, "warm_times": times, "mem_mb": round(mem_after - mem_before)}


# ─── Main ──────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print()
    print("="*70)
    print("SECTION 1: SAME 6 GROUND-TRUTH TESTS (pre-fix baseline comparison)")
    print("="*70)
    for fname, meta in GROUND_TRUTH.items():
        run_test(fname, meta["label"], meta["expected_rows"], meta["expected_cols"], meta.get("gt_cells"))

    print()
    print("="*70)
    print("SECTION 2: ADDITIONAL EDGE CASE TESTS")
    print("="*70)

    # 1. Clean PNG table (household balance sheet)
    run_test("fsdsdx.png", "Clean PNG: Household Balance Sheet (merged headers)", 13, 6, gt_cells={
        (1,0): "January", (1,1): "23000", (1,2): "6.6%",
        (1,3): "15000",   (1,4): "7.1%",  (1,5): "8000",
    })

    # 2. JPEG table (balance sheet with row numbers visible)
    run_test("xcxc.jpg", "JPEG table: Balance Sheet (2-column vertical list)", 30, 2)

    # 3. Borderless table (salary with colored rows, no grid lines)
    run_test("images.jpg", "Borderless colored-row salary table", 8, 5)

    # 4. Multi-table image (Cash Budget with multiple sections)
    run_test("asasx.png", "Multiple sub-tables: Cash Budget Quarterly", 5, 5)

    # 5. Merged cells (Personal Financial Statement 2-column layout)
    run_test("IC-Personal-Financial-Statement-12332_Template.png",
             "Merged cells: Personal Financial Statement", 10, 7)

    # 6. Image with NO table (synthetic white image tested via API, here we test a logo-only PNG)
    run_test("imagfdes.png", "No-table image (logo-style PNG)", 1, 1, expected_no_table=True)

    # 7. Excel screenshot with menus + column letters
    run_test("ds.png", "Excel screenshot with menu chrome + column letters", 16, 3, gt_cells={
        (0,0): "Employee Name", (0,1): "Department", (0,2): "Salary",
        (1,0): "John Doe",      (1,1): "HR",         (1,2): "50000",
    })

    perf = measure_performance()

    # ── Summary table ────────────────────────────────────────────────────────
    print()
    print("="*70)
    print("SUMMARY TABLE")
    print("="*70)
    print(f"  {'Label':<55} {'Status':<10} {'Det':<12} {'Accuracy':<18} {'Time'}")
    print(f"  {'-'*55} {'-'*10} {'-'*12} {'-'*18} {'-'*6}")
    for r in RESULTS:
        det = f"{r.get('det_rows','?')}x{r.get('det_cols','?')}" if r.get('status') == 'OK' else "--"
        if r.get('pct') is not None:
            acc = f"{r['correct']}/{r['total']} ({r['pct']}%)"
        elif r.get('status') == 'NO_TABLE_PASS':
            acc = "Correctly rejected"
        else:
            acc = r.get('accuracy', 'No GT')
        print(f"  {r['label']:<55} {r.get('status','?'):<10} {det:<12} {acc:<18} {r.get('elapsed','?')}s")

    print()
    print(f"  Warm inference avg: {perf['warm_avg_s']}s  Memory delta: {perf['mem_mb']} MB")
    print()
    print("Done.")
