'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

const INTENT_MAP = {
  'ai-writers': {
    badge: 'Drafting & Copy',
    tags: ['Blog Posts', 'Ad Copy', 'Email Outreach']
  },
  'customer-support': {
    badge: 'Support & Triage',
    tags: ['24/7 Chatbots', 'Ticket Routing', 'Auto-Replies']
  },
  'education': {
    badge: 'Learning & Study',
    tags: ['Tutoring', 'Flashcards', 'Course Summaries']
  },
  'digital-marketing': {
    badge: 'Growth & Ads',
    tags: ['Ad Creatives', 'Funnel Analytics', 'A/B Testing']
  },
  'seo': {
    badge: 'Search & Ranking',
    tags: ['Keyword Research', 'SERP Audits', 'Backlinks']
  },
  'social-media': {
    badge: 'Audience & Engagement',
    tags: ['Content Calendar', 'Viral Hooks', 'Auto-Scheduling']
  },
  'productivity': {
    badge: 'Workflows & Speed',
    tags: ['Meeting Notes', 'Task Automation', 'Doc Summaries']
  },
  'business': {
    badge: 'Operations & Strategy',
    tags: ['Financial Models', 'Pitch Decks', 'Contract Review']
  },
  'designing': {
    badge: 'Creative & UI',
    tags: ['Vector Graphics', 'UI Layouts', 'Brand Assets']
  },
  'dev-tools': {
    badge: 'Engineering & Code',
    tags: ['Code Copilot', 'Debugging', 'Refactoring']
  },
  'music': {
    badge: 'Audio & Music',
    tags: ['Track Generation', 'Stem Separation', 'Mastering']
  },
  'healthcare': {
    badge: 'Health & Science',
    tags: ['Diagnostics', 'Research Triage', 'Clinical Notes']
  },
  'text-to-image': {
    badge: 'Generative Visuals',
    tags: ['Photorealism', 'Concept Art', '3D Renders']
  },
  'image-editing': {
    badge: 'Visual Enhancement',
    tags: ['Object Removal', 'Upscaling', 'Background Swap']
  },
  'video-editing': {
    badge: 'Video Production',
    tags: ['AI Avatars', 'Auto-Subtitles', 'Shorts & Reels']
  },
  'audio-editing': {
    badge: 'Voice & Sound',
    tags: ['Noise Removal', 'Voice Synthesis', 'Podcasts']
  },
  'text-to-speech': {
    badge: 'Speech Synthesis',
    tags: ['Voice Clones', 'Multilingual Audio', 'Narration']
  },
  'text-to-video': {
    badge: 'Video Synthesis',
    tags: ['Script to Video', 'Cinematic Scenes', 'B-Roll']
  },
  'blog-content': {
    badge: 'Long-Form Content',
    tags: ['Outlines', 'SEO Articles', 'Headlines']
  },
  'copy-writing': {
    badge: 'Conversion Copy',
    tags: ['Landing Pages', 'Value Props', 'Cold Sales']
  },
  'logo-generator': {
    badge: 'Brand Identity',
    tags: ['Vector Logos', 'Icon Sets', 'Brand Kits']
  },
  'paraphrase': {
    badge: 'Editing & Polish',
    tags: ['Tone Adjustment', 'Fluency', 'Grammar']
  },
  'students': {
    badge: 'Academic Study',
    tags: ['Citation Helpers', 'Essay Outlines', 'Summaries']
  },
  'ui-ux-designers': {
    badge: 'Product Design',
    tags: ['Wireframing', 'Design Systems', 'Microcopy']
  },
  'developers': {
    badge: 'Software Engineering',
    tags: ['API Generation', 'Unit Tests', 'Terminal Copilots']
  },
  'content-creators': {
    badge: 'Creator Studio',
    tags: ['Thumbnail Ideas', 'Video Hooks', 'Repurposing']
  }
};

export default function HomeCategoryCard({ category }) {
  const { getLangUrl } = useLanguage();
  const count = category.count || category.toolCount || 0;
  const intentData = INTENT_MAP[category.slug] || {
    badge: 'AI Superpower',
    tags: ['Handpicked', 'Curated', 'Verified']
  };

  const defaultDescriptions = {
    'ai-writers': 'Automate blog articles, marketing copy, social posts, and email drafting.',
    'image-generators': 'Create photorealistic art, conceptual illustrations, logos, and digital designs.',
    'video-editing': 'Generate AI avatars, auto-subtitles, scene cuts, and text-to-video reels.',
    'code-assistants': 'Accelerate development with AI copilots, code review, and automated debugging.',
    'customer-support': 'Deploy 24/7 intelligent conversational agents, chatbots, and helpdesk triage.',
    'productivity': 'Automate repetitive workflows, meeting summaries, task planning, and notes.',
    'digital-marketing': 'Optimize ad campaigns, funnel analytics, and audience targeting workflows.',
    'seo': 'Discover high-intent keywords, optimize on-page content, and monitor SERP rankings.',
    'audio-voice': 'Generate realistic voiceovers, voice clones, audio transcription, and noise removal.',
    'education': 'Personalized tutoring, homework assistants, course creation, and study flashcards.'
  };

  const intentDescription = category.description || defaultDescriptions[category.slug] || `Discover handpicked ${category.name} software and tools to streamline your daily workflow.`;

  return (
    <Link
      href={getLangUrl(`/categories/${category.slug}`)}
      className="group relative p-4 bg-white hover:bg-slate-50/70 border border-[#E2E8F0] hover:border-[#4338CA] rounded-2xl shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between hover:-translate-y-0.5 overflow-hidden"
    >
      <div>
        {/* Header: Compact Icon & Count */}
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] border border-[rgba(67,56,202,0.12)] text-[#4338CA] flex items-center justify-center text-lg group-hover:scale-105 group-hover:bg-[#4338CA] group-hover:text-white transition-all shadow-2xs">
            <span aria-hidden="true">{category.icon || '✨'}</span>
          </div>
          <span className="text-[10px] font-bold text-[#4338CA] bg-[#EEF2FF] px-2 py-0.5 rounded-full border border-[rgba(67,56,202,0.12)]">
            {count} {count === 1 ? 'tool' : 'tools'}
          </span>
        </div>

        {/* Title + Inline Intent Badge */}
        <div className="flex items-center gap-1.5 mb-1 min-w-0">
          <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-[#4338CA] transition-colors truncate">
            {category.name}
          </h3>
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#0E7490] bg-[#ECFEFF] px-1.5 py-0.2 rounded border border-[rgba(6,182,212,0.2)] flex-shrink-0">
            {intentData.badge}
          </span>
        </div>

        {/* 1-Line Description */}
        <p className="text-xs text-[#64748B] line-clamp-1 leading-snug">
          {intentDescription}
        </p>
      </div>

      {/* Compact Footer Link */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#4338CA] group-hover:translate-x-0.5 transition-transform">
        <span>Explore Intent</span>
        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
      </div>
    </Link>
  );
}
