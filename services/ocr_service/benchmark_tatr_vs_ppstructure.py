"""
benchmark_tatr_vs_ppstructure.py — Side-by-Side Accuracy & Performance Benchmark

Compares:
  Engine A: PP-Structure V2 (PaddleOCR 2.8.1 / SLANet-v2.0)
  Engine B: Microsoft Table Transformer (TATR PubTables-1M + PaddleOCR Token Mapping)

Evaluates on:
  1. Identical 6 Ground-Truth images with exact cell-accuracy formula
  2. 7 Edge-Case images (clean PNG, JPEG, borderless, multi-table, merged cells, no-table, Excel chrome)
  3. Memory Footprint (RSS MB) & Warm Inference Latency (s)
"""

import sys, os, time
import numpy as np
from PIL import Image

TEST_DIR = r"C:\Users\dparw\Desktop\Jpeg to exl\test"
os.environ["CUDA_VISIBLE_DEVICES"] = ""
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"
os.environ["FLAGS_allocator_strategy"] = "naive_best_fit"
os.environ["PYTHONUTF8"] = "1"

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from image_processor import load_image_bytes, deskew_image, enhance_table_contrast
from table_extractor import extract_table as extract_ppstructure
from tatr_extractor import extract_table_tatr

# ─── Ground Truth Dataset (Identical 6 Images) ─────────────────────────────────

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

# ─── Additional Edge Cases ───────────────────────────────────────────────────

EDGE_CASES = [
    ("fsdsdx.png", "Clean PNG: Household Balance Sheet", 13, 6, {
        (1,0): "January", (1,1): "23000", (1,2): "6.6%",
        (1,3): "15000",   (1,4): "7.1%",  (1,5): "8000",
    }, False),
    ("xcxc.jpg", "JPEG table: Balance Sheet 2-col", 30, 2, None, False),
    ("images.jpg", "Borderless table: Salary Sheet", 8, 5, None, False),
    ("asasx.png", "Multi-table: Cash Budget Quarterly", 5, 5, None, False),
    ("IC-Personal-Financial-Statement-12332_Template.png", "Merged cells: Financial Statement", 10, 7, None, False),
    ("imagfdes.png", "No-table image (logo PNG)", 1, 1, None, True),
    ("ds.png", "Excel screenshot with ribbon menus & A/B/C", 16, 3, {
        (0,0): "Employee Name", (0,1): "Department", (0,2): "Salary",
        (1,0): "John Doe",      (1,1): "HR",         (1,2): "50000",
    }, False),
]

def load_img(fname):
    fpath = os.path.join(TEST_DIR, fname)
    if not os.path.exists(fpath):
        return None
    with open(fpath, "rb") as f:
        data = f.read()
    img = load_image_bytes(data)
    img = deskew_image(img)
    img = enhance_table_contrast(img)
    return img

def compute_acc(gt_cells, headers, rows):
    if not gt_cells:
        return None, None, None
    matrix = ([headers] if headers else []) + rows
    correct, total = 0, len(gt_cells)
    details = []
    for (r, c), expected in gt_cells.items():
        if r < len(matrix) and c < len(matrix[r]):
            actual = matrix[r][c].strip()
            an = actual.replace(",", "").replace("$", "").strip().lower()
            en = expected.replace(",", "").replace("$", "").strip().lower()
            if an == en or en in an:
                correct += 1
                details.append(f"OK ({r},{c}) exp='{expected}' got='{actual}'")
            else:
                details.append(f"FAIL ({r},{c}) exp='{expected}' got='{actual}'")
        else:
            details.append(f"MISS ({r},{c}) exp='{expected}' out of range")
    pct = round(correct / total * 100, 1)
    return correct, total, pct

def eval_engine(extract_fn, img, expected_no_table=False):
    t0 = time.time()
    try:
        res = extract_fn(img)
        elapsed = round(time.time() - t0, 2)
        if expected_no_table:
            return {"status": "UNEXPECTED_OK", "elapsed": elapsed, "headers": [], "rows": [], "row_count": 0, "col_count": 0}
        headers = res.get("headers", [])
        rows = res.get("rows", [])
        return {
            "status": "OK",
            "elapsed": elapsed,
            "headers": headers,
            "rows": rows,
            "row_count": res.get("rowCount", 0),
            "col_count": res.get("colCount", 0),
            "model": res.get("metadata", {}).get("model", ""),
        }
    except ValueError as ve:
        elapsed = round(time.time() - t0, 2)
        if expected_no_table:
            return {"status": "NO_TABLE_PASS", "elapsed": elapsed, "headers": [], "rows": [], "row_count": 0, "col_count": 0}
        return {"status": f"ERR: {str(ve)[:40]}", "elapsed": elapsed, "headers": [], "rows": [], "row_count": 0, "col_count": 0}
    except Exception as e:
        elapsed = round(time.time() - t0, 2)
        return {"status": f"EXC: {str(e)[:40]}", "elapsed": elapsed, "headers": [], "rows": [], "row_count": 0, "col_count": 0}


def run_benchmark():
    import psutil
    proc = psutil.Process(os.getpid())

    print("\n" + "="*80)
    print("BENCHMARK: PP-Structure V2 vs. Microsoft Table Transformer (TATR)")
    print("="*80)

    # Warm up both engines
    sample_img = load_img("ds.png")
    print("\n[Warmup] Initializing PP-Structure V2...")
    t0 = time.time()
    extract_ppstructure(sample_img)
    t_pps_init = round(time.time() - t0, 2)
    print(f"PP-Structure warmup completed in {t_pps_init}s")

    print("\n[Warmup] Initializing Microsoft Table Transformer (TATR)...")
    t0 = time.time()
    extract_table_tatr(sample_img)
    t_tatr_init = round(time.time() - t0, 2)
    print(f"TATR warmup completed in {t_tatr_init}s")

    mem_rss = round(proc.memory_info().rss / 1_000_000, 1)
    print(f"Combined Memory Footprint: {mem_rss} MB RSS\n")

    results_gt = []

    print("-" * 80)
    print("SECTION 1: IDENTICAL 6 GROUND-TRUTH IMAGES")
    print("-" * 80)

    for fname, meta in GROUND_TRUTH.items():
        img = load_img(fname)
        if img is None:
            continue

        label = meta["label"]
        gt = meta.get("gt_cells")
        exp_r = meta["expected_rows"]
        exp_c = meta["expected_cols"]

        print(f"\n[Test] {label} ({fname})")

        # Run PP-Structure V2
        res_pps = eval_engine(extract_ppstructure, img)
        c_pps, t_pps, pct_pps = compute_acc(gt, res_pps["headers"], res_pps["rows"])

        # Run TATR
        res_tatr = eval_engine(extract_table_tatr, img)
        c_tatr, t_tatr, pct_tatr = compute_acc(gt, res_tatr["headers"], res_tatr["rows"])

        print(f"  PP-Structure V2 : {res_pps['row_count']}x{res_pps['col_count']} | Acc: {pct_pps}% ({c_pps}/{t_pps}) | Time: {res_pps['elapsed']}s")
        print(f"  TATR (DETR)     : {res_tatr['row_count']}x{res_tatr['col_count']} | Acc: {pct_tatr}% ({c_tatr}/{t_tatr}) | Time: {res_tatr['elapsed']}s")

        results_gt.append({
            "fname": fname,
            "label": label,
            "exp": f"{exp_r}x{exp_c}",
            "pps_grid": f"{res_pps['row_count']}x{res_pps['col_count']}",
            "pps_acc": f"{pct_pps}% ({c_pps}/{t_pps})" if pct_pps is not None else "N/A",
            "pps_time": f"{res_pps['elapsed']}s",
            "tatr_grid": f"{res_tatr['row_count']}x{res_tatr['col_count']}",
            "tatr_acc": f"{pct_tatr}% ({c_tatr}/{t_tatr})" if pct_tatr is not None else "N/A",
            "tatr_time": f"{res_tatr['elapsed']}s",
        })

    print("\n" + "-" * 80)
    print("SECTION 2: 7 EDGE-CASE TESTS")
    print("-" * 80)

    results_edge = []
    for fname, label, exp_r, exp_c, gt, expected_no_table in EDGE_CASES:
        img = load_img(fname)
        if img is None:
            continue

        print(f"\n[Edge Test] {label}")
        res_pps = eval_engine(extract_ppstructure, img, expected_no_table)
        c_pps, t_pps, pct_pps = compute_acc(gt, res_pps["headers"], res_pps["rows"]) if gt else (None, None, None)

        res_tatr = eval_engine(extract_table_tatr, img, expected_no_table)
        c_tatr, t_tatr, pct_tatr = compute_acc(gt, res_tatr["headers"], res_tatr["rows"]) if gt else (None, None, None)

        pps_summary = f"{res_pps['status']} ({res_pps['elapsed']}s)" if expected_no_table else f"Grid: {res_pps['row_count']}x{res_pps['col_count']} | Acc: {pct_pps}% | {res_pps['elapsed']}s"
        tatr_summary = f"{res_tatr['status']} ({res_tatr['elapsed']}s)" if expected_no_table else f"Grid: {res_tatr['row_count']}x{res_tatr['col_count']} | Acc: {pct_tatr}% | {res_tatr['elapsed']}s"

        print(f"  PP-Structure V2 : {pps_summary}")
        print(f"  TATR (DETR)     : {tatr_summary}")

        results_edge.append({
            "label": label,
            "pps": pps_summary,
            "tatr": tatr_summary,
        })

    print("\n" + "="*80)
    print("FINAL SIDE-BY-SIDE BENCHMARK TABLE")
    print("="*80)
    print(f"{'Image / Scenario':<38} | {'PP-Structure Acc':<18} | {'TATR Acc':<18} | {'PPS Time':<9} | {'TATR Time':<9}")
    print("-" * 105)
    for r in results_gt:
        print(f"{r['label'][:38]:<38} | {r['pps_acc']:<18} | {r['tatr_acc']:<18} | {r['pps_time']:<9} | {r['tatr_time']:<9}")

    print("\n" + "="*80)
    print("EDGE CASE RESULTS TABLE")
    print("="*80)
    for e in results_edge:
        print(f"{e['label']:<40} | PPS: {e['pps']:<30} | TATR: {e['tatr']}")

    print("\nBenchmark Complete.")

if __name__ == "__main__":
    run_benchmark()
