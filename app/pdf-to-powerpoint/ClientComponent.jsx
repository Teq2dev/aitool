'use client';

import React from 'react';
import OfficeConverterClient from '@/components/pdf-tools/OfficeConverterClient';

export default function ClientComponent() {
  return (
    <OfficeConverterClient
      toolSlug="pdf-to-powerpoint"
      apiEndpoint="/api/pdf-to-powerpoint"
      inputAccept={{ 'application/pdf': ['.pdf'] }}
      acceptedExtensions={['.pdf']}
      inputFormatLabel="PDF"
      outputExt=".pptx"
      outputFormatLabel="PowerPoint (PPTX)"
      ctaLabel="Convert to PowerPoint (PPTX)"
      accent="orange"
    />
  );
}
