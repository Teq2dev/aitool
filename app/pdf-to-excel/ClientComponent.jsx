'use client';

import React from 'react';
import OfficeConverterClient from '@/components/pdf-tools/OfficeConverterClient';

export default function ClientComponent() {
  return (
    <OfficeConverterClient
      toolSlug="pdf-to-excel"
      apiEndpoint="/api/pdf-to-excel"
      inputAccept={{ 'application/pdf': ['.pdf'] }}
      acceptedExtensions={['.pdf']}
      inputFormatLabel="PDF"
      outputExt=".xlsx"
      outputFormatLabel="Excel (XLSX)"
      ctaLabel="Convert to Excel (XLSX)"
      accent="emerald"
    />
  );
}
