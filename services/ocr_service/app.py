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

MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024 # 25 MB
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

    if len(contents) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File too large ({round(len(contents)/1024/1024, 1)} MB). Max limit is 25 MB."
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

if __name__ == "__main__":
    import uvicorn
    host = os.environ.get("OCR_SERVICE_HOST", "0.0.0.0")
    port = int(os.environ.get("OCR_SERVICE_PORT", "8000"))
    uvicorn.run(app, host=host, port=port, log_level="info")

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
        reader = PdfReader(io.BytesIO(pdf_bytes))
        
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
        out_bytes = pdf_converters.xlsx_to_pdf(content)
        base_name = os.path.splitext(file.filename or "converted")[0]
        return Response(
            content=out_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": f'attachment; filename="{base_name}.pdf"'}
        )
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

