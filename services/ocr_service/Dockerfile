# Dockerfile for BestAIToolsFree Python Conversion Worker
FROM python:3.11-slim

# Prevent Python from writing bytecode / buffering stdout
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install minimal system dependencies (no LibreOffice — pure Python converters only)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    libgomp1 \
    fonts-freefont-ttf \
    fonts-dejavu-core \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy and install Python dependencies first (layer cache)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source
COPY . .

# Cloud Run sets $PORT dynamically; default to 8080
ENV PORT=8080
EXPOSE 8080

# Launch FastAPI via uvicorn
CMD ["python", "app.py"]
