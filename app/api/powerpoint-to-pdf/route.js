import { forwardToConversionService } from '@/lib/conversionConfig';

export async function POST(request) {
  return forwardToConversionService(
    request,
    '/powerpoint-to-pdf',
    'converted.pdf',
    'application/pdf'
  );
}

