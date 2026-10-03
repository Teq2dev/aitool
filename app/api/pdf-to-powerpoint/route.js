import { forwardToConversionService } from '@/lib/conversionConfig';

export async function POST(request) {
  return forwardToConversionService(
    request,
    '/pdf-to-powerpoint',
    'converted.pptx',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  );
}

