'use client';

import React from 'react';
import OfficeConverterClient from '@/components/pdf-tools/OfficeConverterClient';

export default function ClientComponent() {
  return (
    <OfficeConverterClient
      toolSlug="excel-to-pdf"
      apiEndpoint="/api/excel-to-pdf"
      inputAccept={{
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        'application/vnd.ms-excel': ['.xls'],
      }}
      acceptedExtensions={['.xlsx', '.xls']}
      inputFormatLabel="Excel (.xlsx, .xls)"
      outputExt=".pdf"
      outputFormatLabel="PDF Document"
      ctaLabel="Convert to PDF"
      accent="emerald"
    />
  );
}
