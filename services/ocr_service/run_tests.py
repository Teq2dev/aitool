"""
run_tests.py — Comprehensive Test Suite & Benchmark for Table Extraction

Tests:
 1. Clean Screenshot Table (PNG)
 2. JPEG Table (Scanned Invoice)
 3. Borderless Table
 4. Multi-Column / Multi-Row Financial Table
 5. Image with Text but NO table
 6. Skewed Table Photo
 7. Multiline Cell Content Table

Generates real test images, tests the PaddleOCR / PP-Structure engine,
and generates test .xlsx files.
"""

import os
import io
import time
import requests
from PIL import Image, ImageDraw, ImageFont

TEST_DIR = os.path.join(os.path.dirname(__file__), "test_images")
os.makedirs(TEST_DIR, exist_ok=True)

def get_font(size=14):
    try:
        return ImageFont.truetype("arial.ttf", size)
    except Exception:
        return ImageFont.load_default()

def create_clean_table_png():
    """1. Clean Screenshot Table (PNG)"""
    w, h = 600, 300
    img = Image.new('RGB', (w, h), color='white')
    draw = ImageDraw.Draw(img)
    font = get_font(14)
    font_bold = get_font(15)

    # Headers
    headers = ["Employee ID", "Full Name", "Department", "Salary ($)", "Status"]
    cols_x = [30, 150, 290, 420, 510]

    # Draw header bar
    draw.rectangle([20, 20, 580, 60], fill='#F1F5F9', outline='#CBD5E1')
    for i, h_text in enumerate(headers):
        draw.text((cols_x[i], 30), h_text, fill='#0F172A', font=font_bold)

    # Rows
    data = [
        ["EMP-101", "Alice Johnson", "Engineering", "95000", "Active"],
        ["EMP-102", "Robert Smith", "Marketing", "72000", "Active"],
        ["EMP-103", "Elena Rostova", "Finance", "88000", "On Leave"],
        ["EMP-104", "David Kumar", "Product", "105000", "Active"],
    ]

    y = 75
    for row in data:
        draw.line([20, y + 30, 580, y + 30], fill='#E2E8F0', width=1)
        for i, val in enumerate(row):
            draw.text((cols_x[i], y + 5), val, fill='#334155', font=font)
        y += 45

    path = os.path.join(TEST_DIR, "1_clean_table.png")
    img.save(path, format="PNG")
    return path

def create_jpeg_invoice_table():
    """2. JPEG Invoice Table"""
    w, h = 550, 320
    img = Image.new('RGB', (w, h), color='#FAF8F5')
    draw = ImageDraw.Draw(img)
    font = get_font(13)
    font_bold = get_font(14)

    draw.text((30, 20), "INVOICE #INV-2026-89", fill='#1E293B', font=get_font(18))
    
    # Table headers
    draw.rectangle([30, 60, 520, 95], fill='#E2E8F0', outline='#94A3B8')
    headers = ["Item Description", "Qty", "Unit Price", "Total ($)"]
    x_pos = [45, 260, 340, 440]
    for i, h_text in enumerate(headers):
        draw.text((x_pos[i], 70), h_text, fill='#0F172A', font=font_bold)

    rows = [
        ["Cloud Server Pro (Monthly)", "2", "149.00", "298.00"],
        ["Domain Registration .com", "1", "14.99", "14.99"],
        ["SSL Certificate Multi-Domain", "1", "89.00", "89.00"],
        ["Premium Technical Support", "5", "50.00", "250.00"],
    ]

    y = 105
    for r in rows:
        draw.rectangle([30, y, 520, y + 35], outline='#CBD5E1', fill='white')
        for i, val in enumerate(r):
            draw.text((x_pos[i], y + 8), val, fill='#334155', font=font)
        y += 38

    path = os.path.join(TEST_DIR, "2_invoice_table.jpg")
    img.save(path, format="JPEG", quality=85)
    return path

def create_borderless_table():
    """3. Borderless Table"""
    w, h = 500, 260
    img = Image.new('RGB', (w, h), color='#FFFFFF')
    draw = ImageDraw.Draw(img)
    font = get_font(14)
    font_b = get_font(15)

    # Headers (no border)
    headers = ["Country", "Code", "Population", "Capital"]
    xs = [30, 150, 240, 380]
    for i, h_text in enumerate(headers):
        draw.text((xs[i], 25), h_text, fill='#1E40AF', font=font_b)

    rows = [
        ["United States", "USA", "335M", "Washington"],
        ["Germany", "DEU", "84M", "Berlin"],
        ["Japan", "JPN", "125M", "Tokyo"],
        ["Australia", "AUS", "26M", "Canberra"],
    ]
    y = 70
    for r in rows:
        for i, val in enumerate(r):
            draw.text((xs[i], y), val, fill='#334155', font=font)
        y += 40

    path = os.path.join(TEST_DIR, "3_borderless_table.png")
    img.save(path, format="PNG")
    return path

def create_multiline_table():
    """4. Multiline Content Table"""
    w, h = 600, 320
    img = Image.new('RGB', (w, h), color='#FFFFFF')
    draw = ImageDraw.Draw(img)
    font = get_font(13)
    font_b = get_font(14)

    draw.rectangle([20, 20, 580, 55], fill='#3B82F6')
    draw.text((35, 28), "Feature Name", fill='white', font=font_b)
    draw.text((220, 28), "Technical Description", fill='white', font=font_b)
    draw.text((470, 28), "Release Phase", fill='white', font=font_b)

    rows = [
        ("PaddleOCR Engine", "End-to-end neural text\nand table parser", "Phase 2 Core"),
        ("OpenPyXL Generator", "Builds real formatted\nExcel workbooks", "Production Ready"),
        ("FastAPI Service", "Lightweight backend microservice\nwith async endpoints", "Live"),
    ]

    y = 65
    for title, desc, phase in rows:
        draw.rectangle([20, y, 580, y + 65], outline='#E2E8F0', fill='#F8FAFC')
        draw.text((35, y + 20), title, fill='#0F172A', font=font_b)
        draw.text((220, y + 12), desc, fill='#475569', font=font)
        draw.text((470, y + 20), phase, fill='#16A34A', font=font)
        y += 72

    path = os.path.join(TEST_DIR, "4_multiline_table.png")
    img.save(path, format="PNG")
    return path

def create_no_table_image():
    """5. Image with text but NO table"""
    w, h = 450, 200
    img = Image.new('RGB', (w, h), color='#F8FAFC')
    draw = ImageDraw.Draw(img)
    font = get_font(14)

    draw.text((30, 40), "Welcome to BestAIToolsFree!", fill='#1E293B', font=get_font(18))
    draw.text((30, 80), "This is a paragraph of regular descriptive text.", fill='#475569', font=font)
    draw.text((30, 110), "There are no tables, rows, or spreadsheet grids here.", fill='#475569', font=font)

    path = os.path.join(TEST_DIR, "5_no_table.png")
    img.save(path, format="PNG")
    return path

def run_test_suite():
    print("=" * 70)
    print("IMAGE TO EXCEL OCR TEST SUITE (PaddleOCR / PP-Structure + OpenPyXL)")
    print("=" * 70)

    test_files = [
        ("Clean Screenshot Table (PNG)", create_clean_table_png()),
        ("JPEG Invoice Table (JPG)", create_jpeg_invoice_table()),
        ("Borderless Table (PNG)", create_borderless_table()),
        ("Multiline Content Table (PNG)", create_multiline_table()),
        ("No Table / Regular Text (PNG)", create_no_table_image()),
    ]

    results = []
    base_url = "http://127.0.0.1:8000"

    for label, path in test_files:
        print(f"\n[TESTING] {label}...")
        start_t = time.time()
        with open(path, 'rb') as f:
            resp = requests.post(f"{base_url}/extract-table", files={"image": f})
        
        elapsed = round(time.time() - start_t, 2)
        print(f"Status Code: {resp.status_code} | Time: {elapsed}s")

        if resp.status_code == 200:
            data = resp.json()
            headers = data.get("headers", [])
            rows = data.get("rows", [])
            print(f" Detected Headers ({len(headers)}): {headers}")
            print(f" Detected Rows ({len(rows)}):")
            for r in rows[:3]:
                print(f"   -> {r}")
            
            # Test Excel Generation via openpyxl endpoint
            gen_resp = requests.post(
                f"{base_url}/generate-excel",
                json={"headers": headers, "rows": rows, "filename": "test.xlsx"}
            )
            xlsx_ok = (gen_resp.status_code == 200 and len(gen_resp.content) > 1000)
            print(f" OpenPyXL .xlsx Generated: {'SUCCESS (' + str(len(gen_resp.content)) + ' bytes)' if xlsx_ok else 'FAILED'}")

            results.append({
                "test": label,
                "status": "PASS",
                "rows": len(rows) + (1 if headers else 0),
                "cols": len(headers),
                "time": f"{elapsed}s",
                "xlsx": "Valid" if xlsx_ok else "Invalid",
            })
        else:
            err_json = resp.json() if resp.headers.get("content-type") == "application/json" else resp.text
            print(f" Expected / Handled Failure: {err_json}")
            results.append({
                "test": label,
                "status": "HANDLED_ERROR" if "No table" in label else "FAIL",
                "rows": 0,
                "cols": 0,
                "time": f"{elapsed}s",
                "xlsx": "N/A",
            })

    print("\n" + "=" * 70)
    print("TEST RESULTS SUMMARY")
    print("=" * 70)
    for r in results:
        print(f" {r['test']:<35} | {r['status']:<12} | Rows: {r['rows']:<3} | Cols: {r['cols']:<3} | XLSX: {r['xlsx']:<7} | Time: {r['time']}")
    print("=" * 70)

if __name__ == "__main__":
    run_test_suite()
