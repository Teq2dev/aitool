'use client';

import React from 'react';
import OfficeConverterClient from '@/components/pdf-tools/OfficeConverterClient';

export default function ClientComponent() {
  return (
    <OfficeConverterClient
      toolSlug="powerpoint-to-pdf"
      apiEndpoint="/api/powerpoint-to-pdf"
      inputAccept={{
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
        'application/vnd.ms-powerpoint': ['.ppt'],
      }}
      acceptedExtensions={['.pptx', '.ppt']}
      inputFormatLabel="PowerPoint (.pptx, .ppt)"
      outputExt=".pdf"
      outputFormatLabel="PDF Document"
      ctaLabel="Convert to PDF"
      accent="orange"
    />
  );
}
