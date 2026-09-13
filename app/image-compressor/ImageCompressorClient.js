'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import ImageUploadZone from '@/components/image-tools/ImageUploadZone';
import ImageCard from '@/components/image-tools/ImageCard';
import CompressionControls from '@/components/image-tools/CompressionControls';
import BatchSummary from '@/components/image-tools/BatchSummary';
import BeforeAfterModal from '@/components/image-tools/BeforeAfterModal';
import { processImage, getFileMime, MIME_TO_EXT, validateImageFile } from '@/lib/imageProcessing';
import { trackToolView, trackUploadStarted, trackProcessingStarted, trackProcessingCompleted, trackCompressionCompleted } from '@/lib/imageAnalytics';
import { getFileSizeBucket } from '@/lib/utils';
import { Shield, Zap, Star } from 'lucide-react';
import NextToolJourney from '@/components/image-tools/NextToolJourney';

const OUTPUT_FORMATS = [
  { mime: null, label: 'Auto (Best Size)' },
  { mime: 'original', label: 'Original Format' },
  { mime: 'image/jpeg', label: 'JPEG' },
  { mime: 'image/png', label: 'PNG' },
  { mime: 'image/webp', label: 'WebP' },
];

/**
 * ImageCompressorClient — interactive image compression & conversion tool.
 *
 * Props:
 *  toolSlug: string
 *  fixedOutputMime: string | null  — if set, forces output to a specific format
 *  acceptedFormats: string[]        — displayed in upload zone
 *  showFormatSelector: boolean
 *  mode: 'compress' | 'convert'
 */
export default function ImageCompressorClient({
  toolSlug = 'image-compressor',
  fixedOutputMime = null,
  acceptedFormats = ['JPG', 'PNG', 'WebP'],
  showFormatSelector = false,
  mode = 'compress',
}) {
  // Image queue state
  const [items, setItems] = useState([]);

  // Compression settings (Default quality: 68 - Max Compression)
  const [quality, setQuality] = useState(68);
  const [outputMime, setOutputMime] = useState(fixedOutputMime);

  // Preview modal
  const [previewItem, setPreviewItem] = useState(null);

  // Track all created object URLs for cleanup
  const objectUrlsRef = useRef(new Set());

  // Track initial view
  useEffect(() => {
    trackToolView(toolSlug);
  }, [toolSlug]);

  // Cleanup all object URLs on unmount
  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current.clear();
    };
  }, []);

  const createObjectUrl = useCallback((blob) => {
    const url = URL.createObjectURL(blob);
    objectUrlsRef.current.add(url);
    return url;
  }, []);

  const revokeObjectUrl = useCallback((url) => {
    if (url) {
      URL.revokeObjectURL(url);
      objectUrlsRef.current.delete(url);
    }
  }, []);

  // Process a single image item
  const processItem = useCallback(
    async (item, qualityValue, targetMime) => {
      const { file } = item;
      const inputMime = getFileMime(file);

      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, status: 'processing' } : it))
      );

      const startTime = Date.now();
      trackProcessingStarted(toolSlug, MIME_TO_EXT[inputMime] || 'unknown', 1);

      try {
        const result = await processImage(file, {
          quality: qualityValue / 100,
          outputMime: targetMime, // Pass targetMime directly (null = Auto, 'original' = Keep, or explicit MIME)
        });

        const { blob, reduced, reductionPct, outputMime: finalMime } = result;

        const compressedUrl = createObjectUrl(blob);
        const durationMs = Date.now() - startTime;

        trackProcessingCompleted(toolSlug, {
          inputFormat: MIME_TO_EXT[inputMime] || 'unknown',
          outputFormat: MIME_TO_EXT[finalMime] || 'jpg',
          durationMs,
          reductionPct,
          sizeBucket: getFileSizeBucket(file.size),
        });

        if (mode === 'compress') {
          trackCompressionCompleted(MIME_TO_EXT[inputMime] || 'unknown', MIME_TO_EXT[finalMime] || 'jpg', reductionPct);
        }

        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id
              ? {
                  ...it,
                  status: reduced ? 'done' : 'already-optimized',
                  compressedBlob: blob,
                  compressedUrl,
                  outputMime: finalMime,
                  reductionPct,
                  reduced,
                  error: null,
                }
              : it
          )
        );
      } catch (err) {
        console.error('Processing error:', err);
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id
              ? { ...it, status: 'error', error: err.message || 'Processing failed' }
              : it
          )
        );
      }
    },
    [toolSlug, mode, createObjectUrl]
  );

  // Handle new files from upload zone
  const handleFiles = useCallback(
    async (files) => {
      const newItems = files.map((file) => {
        const previewUrl = createObjectUrl(file);
        return {
          id: crypto.randomUUID(),
          file,
          status: 'pending',
          compressedBlob: null,
          compressedUrl: null,
          outputMime: fixedOutputMime || outputMime,
          error: null,
          previewUrl,
        };
      });

      setItems((prev) => [...prev, ...newItems]);

      const totalSize = files.reduce((s, f) => s + f.size, 0);
      trackUploadStarted(toolSlug, files.length, totalSize);

      // Process each file sequentially
      for (const item of newItems) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        await processItem(item, quality, fixedOutputMime || outputMime);
      }
    },
    [quality, outputMime, fixedOutputMime, toolSlug, createObjectUrl, processItem]
  );

  // Re-process all pending/done items when settings change
  const handleReprocess = useCallback(
    async (newQuality, newOutputMime) => {
      const toProcess = items.filter((it) => it.status !== 'error');
      if (toProcess.length === 0) return;

      setItems((prev) =>
        prev.map((it) =>
          it.status !== 'error'
            ? {
                ...it,
                status: 'pending',
                compressedBlob: null,
                compressedUrl: (() => {
                  if (it.compressedUrl) revokeObjectUrl(it.compressedUrl);
                  return null;
                })(),
              }
            : it
        )
      );

      for (const item of toProcess) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        await processItem(item, newQuality, fixedOutputMime || newOutputMime);
      }
    },
    [items, fixedOutputMime, processItem, revokeObjectUrl]
  );

  const handleQualityChange = useCallback(
    (q) => {
      setQuality(q);
      if (items.some((it) => it.status === 'done' || it.status === 'already-optimized')) {
        handleReprocess(q, outputMime);
      }
    },
    [items, outputMime, handleReprocess]
  );

  const handleOutputMimeChange = useCallback(
    (mime) => {
      setOutputMime(mime);
      if (items.some((it) => it.status === 'done' || it.status === 'already-optimized')) {
        handleReprocess(quality, mime);
      }
    },
    [items, quality, handleReprocess]
  );

  // Remove a single image
  const handleRemove = useCallback(
    (id) => {
      setItems((prev) => {
        const item = prev.find((it) => it.id === id);
        if (item) {
          revokeObjectUrl(item.previewUrl);
          revokeObjectUrl(item.compressedUrl);
        }
        return prev.filter((it) => it.id !== id);
      });
    },
    [revokeObjectUrl]
  );

  // Clear all
  const handleClearAll = useCallback(() => {
    items.forEach((it) => {
      revokeObjectUrl(it.previewUrl);
      revokeObjectUrl(it.compressedUrl);
    });
    setItems([]);
    setPreviewItem(null);
  }, [items, revokeObjectUrl]);

  // Process another batch
  const handleProcessAnother = useCallback(() => {
    handleClearAll();
  }, [handleClearAll]);

  const hasItems = items.length > 0;

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <ImageUploadZone
        onFiles={handleFiles}
        acceptedFormats={acceptedFormats}
        compact={hasItems}
      />

      {/* Trust badges below upload zone (when no items) */}
      {!hasItems && (
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 py-1">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Images never uploaded to servers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-blue-600" />
            <span>Instant browser-side compression</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500" />
            <span>100% free, no account needed</span>
          </div>
        </div>
      )}

      {/* Settings — show when items exist */}
      {hasItems && !fixedOutputMime && (
        <CompressionControls
          quality={quality}
          onQualityChange={handleQualityChange}
          outputMime={outputMime}
          onOutputMimeChange={handleOutputMimeChange}
          showFormatSelector={showFormatSelector}
          availableFormats={OUTPUT_FORMATS}
        />
      )}

      {/* Image queue */}
      {hasItems && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-gray-900 text-sm">
              Processed Images ({items.length})
            </h3>
          </div>

          <div className="space-y-2.5">
            {items.map((item) => (
              <ImageCard
                key={item.id}
                item={item}
                onRemove={handleRemove}
                showPreview={(it) => setPreviewItem(it)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Batch summary */}
      {hasItems && (
        <BatchSummary
          items={items}
          toolSlug={toolSlug}
          onClearAll={handleClearAll}
          onProcessAnother={handleProcessAnother}
        />
      )}

      {/* Cross-Tool Workflow Continuum */}
      {hasItems && (
        <NextToolJourney
          workflow={mode === 'convert' ? 'image-editing' : 'image-compression'}
          customTitle={mode === 'convert' ? 'Converted your images? Recommended next steps:' : 'Compressed your images? Recommended next steps:'}
        />
      )}

      {/* Before/after modal */}
      {previewItem && (
        <BeforeAfterModal
          item={previewItem}
          onClose={() => setPreviewItem(null)}
        />
      )}
    </div>
  );
}
