'use client';

import React from 'react';
import OfficeConverterClient from '@/components/pdf-tools/OfficeConverterClient';

export default function ClientComponent() {
  return (
    <OfficeConverterClient
      toolSlug="word-to-pdf"
      apiEndpoint="/api/word-to-pdf"
      inputAccept={{
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        'application/msword': ['.doc'],
      }}
      acceptedExtensions={['.docx', '.doc']}
      inputFormatLabel="Word (.docx, .doc)"
      outputExt=".pdf"
      outputFormatLabel="PDF Document"
      ctaLabel="Convert to PDF"
      accent="blue"
    />
  );
}
