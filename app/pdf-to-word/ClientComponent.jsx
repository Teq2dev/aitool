'use client';

import React from 'react';
import OfficeConverterClient from '@/components/pdf-tools/OfficeConverterClient';

export default function ClientComponent() {
  return (
    <OfficeConverterClient
      toolSlug="pdf-to-word"
      apiEndpoint="/api/pdf-to-word"
      inputAccept={{ 'application/pdf': ['.pdf'] }}
      acceptedExtensions={['.pdf']}
      inputFormatLabel="PDF"
      outputExt=".docx"
      outputFormatLabel="Word (DOCX)"
      ctaLabel="Convert to Word (DOCX)"
      accent="blue"
    />
  );
}
