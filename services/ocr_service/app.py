"""
app.py — FastAPI Microservice for PaddleOCR Table Extraction & OpenPyXL Generator

Endpoints:
 - POST /extract-table : Extracts table matrix from image (JPG/PNG) via PaddleOCR / PP-Structure
 - POST /generate-excel : Generates genuine .xlsx file from edited headers/rows via openpyxl
 - GET /health : Health check
"""

import os
import sys
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, File, UploadFile, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, JSONResponse
from pydantic import BaseModel

# Add current dir to sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from tatr_extractor import extract_table_tatr
from excel_generator import generate_xlsx

# Resource Limits Policy
MAX_TABLE_IMG_SIZE_BYTES = 10 * 1024 * 1024 # 10 MB for table extraction
MAX_TABLE_IMG_PIXELS = 50_000_000 # 50 Megapixels
MAX_TABLE_IMG_DIM = 12000

MAX_CONV_PDF_BYTES = 10 * 1024 * 1024 # 10 MB for PDF-to-X converters
MAX_OFFICE_FILE_BYTES = 20 * 1024 * 1024 # 20 MB for Office-to-PDF / Unlock
MAX_PPTX_CONV_PAGES = 10 # PDF -> PPTX max 10 pages
MAX_DOCX_CONV_PAGES = 10 # PDF -> Word max 10 pages
MAX_XLSX_CONV_PAGES = 20 # PDF -> Excel max 20 pages
MAX_PPTX_SLIDES = 20 # PPTX -> PDF max 20 slides
MAX_XLSX_SHEETS = 20 # Excel -> PDF max 20 sheets
MAX_UNLOCK_PAGES = 50 # Unlock PDF max 50 pages

ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/jpg", "image/webp"}
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

app = FastAPI(
    title="BestAIToolsFree OCR & Table Extraction Service",
    version="1.2.0",
    docs_url="/docs",
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "BestAIToolsFree Microservice Backend",
        "frontend_website": "http://localhost:3000",
        "docs": "http://localhost:8000/docs",
        "health": "http://localhost:8000/health"
    }

class ExcelGenerateRequest(BaseModel):
    headers: Optional[List[str]] = []
    rows: Optional[List[List[str]]] = []
    tables: Optional[List[Dict[str, Any]]] = None
    sheetName: Optional[str] = "Extracted Table"
    filename: Optional[str] = "extracted-table.xlsx"

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "BestAIToolsFree OCR Table Extraction Microservice",
        "primaryEngine": "Microsoft Table Transformer (TATR DETR) + PaddleOCR",
        "fallbackEngine": "PP-StructureV2 / SLANet-v2.0 (PaddlePaddle 2.6.2)",
        "excelEngine": "openpyxl 3.1.5",
    }

@app.post("/extract-table")
async def handle_extract_table(image: UploadFile = File(...)):
    # 1. Validate File Presence
    if not image or not image.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No image file was provided."
        )

    # 2. Validate Extension & MIME
    ext = os.path.splitext(image.filename.lower())[1]
    if ext not in ALLOWED_EXTENSIONS and image.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported file format. Please upload a JPG, JPEG, or PNG image."
        )

    # 3. Read and Validate Size
    try:
        contents = await image.read()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to read uploaded file contents."
        )

    if len(contents) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded image is empty (0 bytes)."
        )

    if len(contents) > MAX_TABLE_IMG_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"Image size ({round(len(contents)/1024/1024, 1)} MB) exceeds the 10 MB limit for AI table extraction."
        )

    # Validate image resolution
    try:
        from PIL import Image
        import io
        with Image.open(io.BytesIO(contents)) as img:
            w, h = img.size
            if (w * h) > MAX_TABLE_IMG_PIXELS or w > MAX_TABLE_IMG_DIM or h > MAX_TABLE_IMG_DIM:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Image resolution ({w}x{h}, {round(w*h/1_000_000, 1)} MP) exceeds maximum allowed limit of 50 MP (12,000 x 12,000 px)."
                )
    except HTTPException:
        raise
    except Exception as img_err:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid or corrupted image: {str(img_err)}"
        )

    # 4. Extract Table (TATR primary -> PP-Structure fallback)
    try:
        try:
            result = extract_table_tatr(contents)
            return result
        except Exception as tatr_err:
            print(f"[TATR Warning] Extraction fallback triggered: {tatr_err}")
            import traceback
            traceback.print_exc()
            # Fallback to PP-Structure V2
            from image_processor import preprocess_for_ocr
            from table_extractor import extract_table as extract_table_ppstructure
            preprocessed_img = preprocess_for_ocr(contents)
            result = extract_table_ppstructure(preprocessed_img)
            return result
    except ValueError as ve:
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={"success": False, "error": str(ve)}
        )
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"success": False, "error": str(e)}
        )

@app.post("/generate-excel")
def handle_generate_excel(req: ExcelGenerateRequest):
    try:
        xlsx_bytes = generate_xlsx(
            headers=req.headers,
            rows=req.rows,
            sheet_name=req.sheetName or "Table Data",
            tables=req.tables
        )
        clean_name = req.filename or "table.xlsx"
        if not clean_name.endswith(".xlsx"):
            clean_name += ".xlsx"

        return Response(
            content=xlsx_bytes,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={
                "Content-Disposition": f'attachment; filename="{clean_name}"',
                "Access-Control-Expose-Headers": "Content-Disposition",
            }
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate Excel workbook."
        )



from fastapi import Form
import io
try:
    from pypdf import PdfReader, PdfWriter
except ImportError:
    pass

@app.post("/unlock-pdf")
async def unlock_pdf_endpoint(file: UploadFile = File(...), password: str = Form("")):
    try:
        pdf_bytes = await file.read()
        if len(pdf_bytes) == 0:
            return JSONResponse({"error": "Uploaded file is empty (0 bytes)."}, status_code=400)
        if len(pdf_bytes) > MAX_OFFICE_FILE_BYTES:
            return JSONResponse({"error": f"PDF file size ({round(len(pdf_bytes)/1024/1024, 1)} MB) exceeds the 20 MB limit."}, status_code=413)

        reader = PdfReader(io.BytesIO(pdf_bytes))
        if len(reader.pages) > MAX_UNLOCK_PAGES:
            return JSONResponse({"error": f"PDF has {len(reader.pages)} pages, which exceeds the maximum limit of {MAX_UNLOCK_PAGES} pages for unlock."}, status_code=400)
        
        if reader.is_encrypted:
            # Try to decrypt with empty password first (owner password only)
            success = reader.decrypt("")
            if not success and password:
                success = reader.decrypt(password)
                
            if not success:
                return JSONResponse({"error": "Incorrect password or cannot decrypt"}, status_code=400)
                
        writer = PdfWriter()
        for page in reader.pages:
            writer.add_page(page)
            
        out_io = io.BytesIO()
        writer.write(out_io)
        out_io.seek(0)
        
        return Response(
            content=out_io.read(), 
            media_type="application/pdf", 
            headers={"Content-Disposition": f'attachment; filename="unlocked_{file.filename}"'}
        )
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

import pdf_converters

@app.post("/pdf-to-word")
async def handle_pdf_to_word(file: UploadFile = File(...)):
    try:
        content = await file.read()
        if len(content) == 0:
            return JSONResponse({"error": "Uploaded file is empty (0 bytes)."}, status_code=400)
        if len(content) > MAX_CONV_PDF_BYTES:
            return JSONResponse({"error": f"PDF file size ({round(len(content)/1024/1024, 1)} MB) exceeds the 10 MB limit for Word conversion."}, status_code=413)

        try:
            import pymupdf as fitz
            with fitz.open(stream=content, filetype="pdf") as doc:
                if doc.page_count > MAX_DOCX_CONV_PAGES:
                    return JSONResponse({"error": f"Document has {doc.page_count} pages, which exceeds the maximum limit of {MAX_DOCX_CONV_PAGES} pages for Word conversion."}, status_code=400)
        except Exception as pe:
            if "exceeds" in str(pe):
                raise
            return JSONResponse({"error": f"Could not read PDF structure: {str(pe)}"}, status_code=400)

        out_bytes = pdf_converters.pdf_to_docx(content)
        base_name = os.path.splitext(file.filename or "converted")[0]
        return Response(
            content=out_bytes,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={"Content-Disposition": f'attachment; filename="{base_name}.docx"'}
        )
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

@app.post("/pdf-to-powerpoint")
async def handle_pdf_to_powerpoint(file: UploadFile = File(...)):
    try:
        content = await file.read()
        if len(content) == 0:
            return JSONResponse({"error": "Uploaded file is empty (0 bytes)."}, status_code=400)
        if len(content) > MAX_CONV_PDF_BYTES:
            return JSONResponse({"error": f"PDF file size ({round(len(content)/1024/1024, 1)} MB) exceeds the 10 MB limit for PowerPoint conversion."}, status_code=413)

        try:
            import pymupdf as fitz
            with fitz.open(stream=content, filetype="pdf") as doc:
                if doc.page_count > MAX_PPTX_CONV_PAGES:
                    return JSONResponse({"error": f"Document has {doc.page_count} pages, which exceeds the maximum limit of {MAX_PPTX_CONV_PAGES} pages for PowerPoint conversion. Please split your document."}, status_code=400)
        except Exception as pe:
            if "exceeds" in str(pe):
                raise
            return JSONResponse({"error": f"Could not read PDF structure: {str(pe)}"}, status_code=400)

        out_bytes = pdf_converters.pdf_to_pptx(content)
        base_name = os.path.splitext(file.filename or "converted")[0]
        return Response(
            content=out_bytes,
            media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
            headers={"Content-Disposition": f'attachment; filename="{base_name}.pptx"'}
        )
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

@app.post("/pdf-to-excel")
async def handle_pdf_to_excel(file: UploadFile = File(...)):
    try:
        content = await file.read()
        if len(content) == 0:
            return JSONResponse({"error": "Uploaded file is empty (0 bytes)."}, status_code=400)
        if len(content) > MAX_CONV_PDF_BYTES:
            return JSONResponse({"error": f"PDF file size ({round(len(content)/1024/1024, 1)} MB) exceeds the 10 MB limit for Excel conversion."}, status_code=413)

        try:
            import pymupdf as fitz
            with fitz.open(stream=content, filetype="pdf") as doc:
                if doc.page_count > MAX_XLSX_CONV_PAGES:
                    return JSONResponse({"error": f"Document has {doc.page_count} pages, which exceeds the maximum limit of {MAX_XLSX_CONV_PAGES} pages for Excel conversion."}, status_code=400)
        except Exception as pe:
            if "exceeds" in str(pe):
                raise
            return JSONResponse({"error": f"Could not read PDF structure: {str(pe)}"}, status_code=400)

        out_bytes = pdf_converters.pdf_to_xlsx(content)
        base_name = os.path.splitext(file.filename or "converted")[0]
        return Response(
            content=out_bytes,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f'attachment; filename="{base_name}.xlsx"'}
        )
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

@app.post("/word-to-pdf")
async def handle_word_to_pdf(file: UploadFile = File(...)):
    try:
        content = await file.read()
        if len(content) == 0:
            return JSONResponse({"error": "Uploaded file is empty (0 bytes)."}, status_code=400)
        if len(content) > MAX_OFFICE_FILE_BYTES:
            return JSONResponse({"error": f"Word document size ({round(len(content)/1024/1024, 1)} MB) exceeds the 20 MB limit for PDF conversion."}, status_code=413)

        out_bytes = pdf_converters.docx_to_pdf(content)
        base_name = os.path.splitext(file.filename or "converted")[0]
        return Response(
            content=out_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": f'attachment; filename="{base_name}.pdf"'}
        )
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

@app.post("/powerpoint-to-pdf")
async def handle_powerpoint_to_pdf(file: UploadFile = File(...)):
    try:
        content = await file.read()
        if len(content) == 0:
            return JSONResponse({"error": "Uploaded file is empty (0 bytes)."}, status_code=400)
        if len(content) > MAX_OFFICE_FILE_BYTES:
            return JSONResponse({"error": f"Presentation size ({round(len(content)/1024/1024, 1)} MB) exceeds the 20 MB limit for PDF conversion."}, status_code=413)

        try:
            import pptx
            prs = pptx.Presentation(io.BytesIO(content))
            if len(prs.slides) > MAX_PPTX_SLIDES:
                return JSONResponse({"error": f"Presentation has {len(prs.slides)} slides, which exceeds the limit of {MAX_PPTX_SLIDES} slides for PDF conversion."}, status_code=400)
        except Exception as pe:
            if "exceeds" in str(pe):
                raise
            return JSONResponse({"error": f"Could not read presentation structure: {str(pe)}"}, status_code=400)

        out_bytes = pdf_converters.pptx_to_pdf(content)
        base_name = os.path.splitext(file.filename or "converted")[0]
        return Response(
            content=out_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": f'attachment; filename="{base_name}.pdf"'}
        )
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

@app.post("/excel-to-pdf")
async def handle_excel_to_pdf(file: UploadFile = File(...)):
    try:
        content = await file.read()
        if len(content) == 0:
            return JSONResponse({"error": "Uploaded file is empty (0 bytes)."}, status_code=400)
        if len(content) > MAX_OFFICE_FILE_BYTES:
            return JSONResponse({"error": f"Spreadsheet size ({round(len(content)/1024/1024, 1)} MB) exceeds the 20 MB limit for PDF conversion."}, status_code=413)

        try:
            import openpyxl
            wb = openpyxl.load_workbook(io.BytesIO(content), read_only=True)
            sheet_count = len(wb.sheetnames)
            wb.close()
            if sheet_count > MAX_XLSX_SHEETS:
                return JSONResponse({"error": f"Workbook contains {sheet_count} worksheets, which exceeds the limit of {MAX_XLSX_SHEETS} sheets for PDF conversion."}, status_code=400)
        except Exception as oe:
            if "exceeds" in str(oe):
                raise
            return JSONResponse({"error": f"Could not read spreadsheet structure: {str(oe)}"}, status_code=400)

        out_bytes = pdf_converters.xlsx_to_pdf(content)
        base_name = os.path.splitext(file.filename or "converted")[0]
        return Response(
            content=out_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": f'attachment; filename="{base_name}.pdf"'}
        )
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app:app", host="0.0.0.0", port=port, workers=1)


