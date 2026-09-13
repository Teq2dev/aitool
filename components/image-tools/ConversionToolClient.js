'use client';

import ImageCompressorClient from '@/app/image-compressor/ImageCompressorClient';
import ConverterNav from '@/components/image-tools/ConverterNav';

/**
 * ConversionToolClient — wraps ImageCompressorClient for format conversion.
 * Sets a fixed output MIME type, restricts accepted input formats,
 * and renders the quick format switcher navigation bar.
 *
 * Props:
 *  toolSlug: string
 *  fixedOutputMime: string  — e.g. 'image/png'
 *  acceptedFormats: string[] — e.g. ['JPG', 'JPEG']
 */
export default function ConversionToolClient({
  toolSlug,
  fixedOutputMime,
  acceptedFormats,
}) {
  return (
    <div className="space-y-4">
      {/* Quick Format Switcher Menu */}
      <ConverterNav currentSlug={toolSlug} />

      {/* Core Conversion Studio */}
      <ImageCompressorClient
        toolSlug={toolSlug}
        fixedOutputMime={fixedOutputMime}
        acceptedFormats={acceptedFormats}
        showFormatSelector={false}
        mode="convert"
      />
    </div>
  );
}
