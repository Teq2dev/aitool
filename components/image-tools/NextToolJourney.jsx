'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  FileText,
  Minimize2,
  Crop,
  RotateCw,
  RefreshCw,
  FileArchive,
  Layers,
  Scissors,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

const WORKFLOW_PRESETS = {
  'pdf-to-image': {
    title: 'Extracted your images? Continue your workflow:',
    badge: 'Image Optimization Next Steps',
    items: [
      {
        href: '/image-compressor',
        name: 'Compress Images',
        desc: 'Reduce file size by up to 80% without visible loss in browser memory.',
        icon: Minimize2,
        color: 'from-amber-500 to-orange-500',
        badge: 'Recommended'
      },
      {
        href: '/image-resizer',
        name: 'Resize Dimensions',
        desc: 'Scale exact pixel widths or percentage with aspect ratio preservation.',
        icon: Crop,
        color: 'from-blue-500 to-indigo-500'
      },
      {
        href: '/image-cropper',
        name: 'Crop Image',
        desc: 'Select precise coordinates or aspect ratios (1:1, 16:9, 4:3).',
        icon: Scissors,
        color: 'from-emerald-500 to-teal-500'
      },
      {
        href: '/image-converter',
        name: 'Universal Converter',
        desc: 'Convert extracted frames to modern WebP, PNG, or JPG formats.',
        icon: RefreshCw,
        color: 'from-purple-500 to-pink-500'
      }
    ]
  },
  'image-to-pdf': {
    title: 'Created your PDF? Continue your workflow:',
    badge: 'PDF Document Next Steps',
    items: [
      {
        href: '/compress-pdf',
        name: 'Compress PDF',
        desc: 'Shrink document payload size for email or web portal upload limits.',
        icon: FileArchive,
        color: 'from-emerald-500 to-teal-500',
        badge: 'Recommended'
      },
      {
        href: '/merge-pdf',
        name: 'Merge with Other PDFs',
        desc: 'Combine multiple PDF files into one clean sequential document.',
        icon: Layers,
        color: 'from-blue-500 to-indigo-500'
      },
      {
        href: '/split-pdf',
        name: 'Split or Extract Pages',
        desc: 'Separate page ranges or extract individual PDF pages instantly.',
        icon: Scissors,
        color: 'from-amber-500 to-orange-500'
      },
      {
        href: '/rotate-pdf',
        name: 'Rotate Orientation',
        desc: 'Fix sideways or upside-down page orientations in 90-degree steps.',
        icon: RotateCw,
        color: 'from-violet-500 to-purple-500'
      }
    ]
  },
  'image-compression': {
    title: 'Done compressing? Related image & document tools:',
    badge: 'Next Workflow Step',
    items: [
      {
        href: '/image-resizer',
        name: 'Bulk Image Resizer',
        desc: 'Scale dimensions by pixels or percentage with aspect-ratio lock.',
        icon: Crop,
        color: 'from-blue-500 to-indigo-500'
      },
      {
        href: '/image-cropper',
        name: 'Smart Image Cropper',
        desc: 'Crop to exact presets (1:1 square, 16:9 widescreen, 4:3 portrait).',
        icon: Scissors,
        color: 'from-emerald-500 to-teal-500'
      },
      {
        href: '/jpg-to-pdf',
        name: 'Convert Image to PDF',
        desc: 'Bundle your compressed photos into a clean, printable PDF document.',
        icon: FileText,
        color: 'from-red-500 to-rose-500',
        badge: 'Package to PDF'
      },
      {
        href: '/image-converter',
        name: 'Universal Converter',
        desc: 'Convert between JPG, PNG, and WebP formats in browser memory.',
        icon: RefreshCw,
        color: 'from-purple-500 to-pink-500'
      }
    ]
  },
  'image-editing': {
    title: 'Image edited! Next recommended steps:',
    badge: 'Workflow Pipeline',
    items: [
      {
        href: '/image-compressor',
        name: 'Smart Image Compressor',
        desc: 'Shrink payload size before publishing or sharing.',
        icon: Minimize2,
        color: 'from-amber-500 to-orange-500',
        badge: 'Popular'
      },
      {
        href: '/jpg-to-pdf',
        name: 'JPG to PDF Converter',
        desc: 'Bundle your edited pictures into a professional multi-page PDF.',
        icon: FileText,
        color: 'from-red-500 to-rose-500'
      },
      {
        href: '/image-rotator',
        name: 'Image Rotator & Flipper',
        desc: 'Reorient 90/180/270 degrees or mirror horizontally/vertically.',
        icon: RotateCw,
        color: 'from-indigo-500 to-blue-500'
      },
      {
        href: '/image-converter',
        name: 'Universal Converter',
        desc: 'Convert to WebP for superior web performance and smaller payloads.',
        icon: RefreshCw,
        color: 'from-purple-500 to-pink-500'
      }
    ]
  }
};

export default function NextToolJourney({ workflow = 'image-editing', customTitle = null, className = '' }) {
  const config = WORKFLOW_PRESETS[workflow] || WORKFLOW_PRESETS['image-editing'];

  return (
    <div className={`mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white text-base">
            {customTitle || config.title}
          </h3>
        </div>
        <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          {config.badge}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {config.items.map((tool, idx) => {
          const Icon = tool.icon || ImageIcon;
          return (
            <Link
              key={idx}
              href={tool.href}
              className="group relative flex flex-col p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {tool.badge && (
                <span className="absolute top-2.5 right-2.5 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  {tool.badge}
                </span>
              )}
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${tool.color} text-white shadow-sm group-hover:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tool.name}
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2 flex-1">
                {tool.desc}
              </p>
              <div className="flex items-center text-xs font-medium text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                <span>Launch tool</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
