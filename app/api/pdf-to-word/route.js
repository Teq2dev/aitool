import { forwardToConversionService } from '@/lib/conversionConfig';

export async function POST(request) {
  return forwardToConversionService(
    request,
    '/pdf-to-word',
    'converted.docx',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );
}

