import { forwardToConversionService } from '@/lib/conversionConfig';

export async function POST(request) {
  return forwardToConversionService(
    request,
    '/unlock-pdf',
    'unlocked.pdf',
    'application/pdf'
  );
}

