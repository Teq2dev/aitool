import { forwardToConversionService } from '@/lib/conversionConfig';

export async function POST(request) {
  return forwardToConversionService(
    request,
    '/excel-to-pdf',
    'converted.pdf',
    'application/pdf'
  );
}

