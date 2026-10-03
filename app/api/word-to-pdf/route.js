import { forwardToConversionService } from '@/lib/conversionConfig';

export async function POST(request) {
  return forwardToConversionService(
    request,
    '/word-to-pdf',
    'converted.pdf',
    'application/pdf'
  );
}

