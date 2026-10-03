# Multi-stage Dockerfile for BestAIToolsFree Python Conversion Worker
FROM python:3.11-slim

# Prevent Python from writing bytecode
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies & LibreOffice headless
RUN apt-get update && apt-get install -y --no-install-recommends \
    libreoffice-fresh-core \
    libreoffice-writer \
    libreoffice-impress \
    libreoffice-calc \
    fonts-opensymbol \
    ttf-mscorefonts-installer \
    fonts-freefont-ttf \
    fonts-dejavu-core \
    libgl1 \
    libglib2.0-0 \
    libgomp1 \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirement file
COPY requirements.txt .

# Install Python packages
RUN pip install --no-cache-dir -r requirements.txt boto3

# Copy application source
COPY . .

# Expose port (Cloud Run sets $PORT dynamically, defaults to 8080 or 8000)
ENV PORT=8080
EXPOSE 8080

# Run FastAPI server with dynamic PORT binding
CMD ["python", "app.py"]

