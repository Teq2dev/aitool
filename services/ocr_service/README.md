# OCR & Table Extraction Microservice (PaddleOCR / PP-Structure + OpenPyXL)

Isolated backend service for extracting structured tabular data from images and generating genuine Microsoft Excel (`.xlsx`) workbooks.

## Architecture

- **Primary OCR Engine**: PaddleOCR / PP-StructureV3
- **Image Preprocessing**: OpenCV (CLAHE contrast enhancement, deskewing) & Pillow
- **Excel Workbook Generation**: openpyxl 3.1.5
- **API Framework**: FastAPI + Uvicorn

## Requirements & Environment

This service runs inside an isolated Python 3.11 virtual environment at `services/ocr_service/.venv`.

### Running Locally

```bash
# Activate Python 3.11 virtual environment
services\ocr_service\.venv\Scripts\activate

# Start the service
python services/ocr_service/app.py
```

The service will listen on `http://127.0.0.1:8000`.

## API Endpoints

- `POST /extract-table`: Accepts multipart form-data `image` (JPG/PNG). Returns structured table matrix JSON.
- `POST /generate-excel`: Accepts `{ headers: [...], rows: [[...]] }`. Returns formatted `.xlsx` binary download.
- `GET /health`: Health check.
