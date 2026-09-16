import {
  PenTool,
  Sparkles,
  FileText,
  Image,
  Palette,
  Wand2,
  Video,
  Clapperboard,
  Film,
  Megaphone,
  TrendingUp,
  Target,
  SearchCheck,
  Compass,
  Code2,
  Terminal,
  Cpu,
  Bot,
  Zap,
  Briefcase,
  GraduationCap,
  BookOpen,
  Headphones,
  MessageSquare,
  Mic,
  Volume2,
  Music,
  Table,
  FileSpreadsheet,
  Mail,
  Send,
  Globe,
  Layout,
  Share2,
  Smartphone,
  TerminalSquare,
  Presentation,
  PieChart,
  Brush,
  ShieldCheck,
  SpellCheck,
  RefreshCw,
  Layers,
  Stamp,
  Scroll,
  UserCheck,
  FileUser,
  DollarSign,
  Coins,
  Gamepad2,
  HeartPulse,
  Box,
  FileCode2,
  Scale,
  Plane,
  Microscope,
  Camera,
  Grid
} from 'lucide-react';

// Color themes array for deterministic selection
const COLOR_THEMES = [
  {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100/60 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    hoverBorder: 'hover:border-blue-400/60',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    text: 'text-violet-600 dark:text-violet-400',
    badge: 'bg-violet-100/60 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    hoverBorder: 'hover:border-violet-400/60',
    gradient: 'from-violet-500 to-purple-600'
  },
  {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-100/60 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    hoverBorder: 'hover:border-emerald-400/60',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-100/60 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    hoverBorder: 'hover:border-amber-400/60',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    text: 'text-rose-600 dark:text-rose-400',
    badge: 'bg-rose-100/60 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    hoverBorder: 'hover:border-rose-400/60',
    gradient: 'from-rose-500 to-pink-600'
  },
  {
    bg: 'bg-cyan-50 dark:bg-cyan-950/40',
    text: 'text-cyan-600 dark:text-cyan-400',
    badge: 'bg-cyan-100/60 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
    hoverBorder: 'hover:border-cyan-400/60',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    text: 'text-indigo-600 dark:text-indigo-400',
    badge: 'bg-indigo-100/60 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
    hoverBorder: 'hover:border-indigo-400/60',
    gradient: 'from-indigo-500 to-violet-600'
  },
  {
    bg: 'bg-teal-50 dark:bg-teal-950/40',
    text: 'text-teal-600 dark:text-teal-400',
    badge: 'bg-teal-100/60 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
    hoverBorder: 'hover:border-teal-400/60',
    gradient: 'from-teal-500 to-emerald-600'
  }
];

// Specific mapping by slug / key
const ICON_MAP = {
  'ai-writers': { icon: PenTool, themeIndex: 0 },
  'aiwriters': { icon: PenTool, themeIndex: 0 },
  'copywriting': { icon: FileText, themeIndex: 0 },
  'copy-writing': { icon: FileText, themeIndex: 0 },
  'blog-content': { icon: FileText, themeIndex: 1 },
  'blogcontent': { icon: FileText, themeIndex: 1 },
  'story-generation': { icon: Scroll, themeIndex: 3 },
  'grammar-check': { icon: SpellCheck, themeIndex: 2 },
  'grammarcheck': { icon: SpellCheck, themeIndex: 2 },
  'paraphrase': { icon: RefreshCw, themeIndex: 5 },
  'ai-content-detector': { icon: ShieldCheck, themeIndex: 3 },
  'aicontentdetector': { icon: ShieldCheck, themeIndex: 3 },

  'text-to-image': { icon: Wand2, themeIndex: 1 },
  'texttoimage': { icon: Wand2, themeIndex: 1 },
  'image-editing': { icon: Image, themeIndex: 1 },
  'imageediting': { icon: Image, themeIndex: 1 },
  'drawing-painting': { icon: Brush, themeIndex: 4 },
  'drawingpainting': { icon: Brush, themeIndex: 4 },
  'logo-generator': { icon: Stamp, themeIndex: 1 },

  'video-editing': { icon: Video, themeIndex: 4 },
  'videooditing': { icon: Video, themeIndex: 4 },
  'text-to-video': { icon: Clapperboard, themeIndex: 4 },
  'reels-video': { icon: Film, themeIndex: 4 },
  'reels-short-videos': { icon: Film, themeIndex: 4 },

  'audio-editing': { icon: Volume2, themeIndex: 6 },
  'audioediting': { icon: Volume2, themeIndex: 6 },
  'text-to-speech': { icon: Mic, themeIndex: 6 },
  'music': { icon: Music, themeIndex: 6 },

  'seo': { icon: Target, themeIndex: 2 },
  'marketing': { icon: Megaphone, themeIndex: 3 },
  'digital-marketing': { icon: TrendingUp, themeIndex: 3 },
  'email-marketing': { icon: Mail, themeIndex: 4 },
  'emailmarketing': { icon: Mail, themeIndex: 4 },
  'social-media': { icon: Share2, themeIndex: 3 },
  'socialmediamarketing': { icon: Share2, themeIndex: 3 },
  'presentation-makers': { icon: Presentation, themeIndex: 3 },
  'presentationmakers': { icon: Presentation, themeIndex: 3 },

  'dev-tools': { icon: Code2, themeIndex: 5 },
  'developers': { icon: Terminal, themeIndex: 5 },
  'ai-autonomous-agents': { icon: Bot, themeIndex: 6 },
  'website-builder': { icon: Globe, themeIndex: 0 },
  'prompt-generators': { icon: TerminalSquare, themeIndex: 1 },
  'promptgenerators': { icon: TerminalSquare, themeIndex: 1 },

  'productivity': { icon: Zap, themeIndex: 6 },
  'spreadsheets': { icon: Table, themeIndex: 2 },
  'spreadsheet-ai': { icon: FileSpreadsheet, themeIndex: 2 },
  'ai-document-processing': { icon: FileCode2, themeIndex: 0 },

  'education': { icon: GraduationCap, themeIndex: 5 },
  'students': { icon: BookOpen, themeIndex: 5 },
  'teachers': { icon: BookOpen, themeIndex: 5 },
  'research': { icon: Microscope, themeIndex: 6 },

  'customer-support': { icon: Headphones, themeIndex: 7 },
  'customersupport': { icon: Headphones, themeIndex: 7 },
  'business': { icon: Briefcase, themeIndex: 6 },
  'hr': { icon: UserCheck, themeIndex: 0 },
  'resumewriting': { icon: FileUser, themeIndex: 0 },

  'sales': { icon: DollarSign, themeIndex: 2 },
  'finance': { icon: Coins, themeIndex: 2 },
  'legal': { icon: Scale, themeIndex: 6 },
  'healthcare': { icon: HeartPulse, themeIndex: 4 },
  'travel': { icon: Plane, themeIndex: 5 },
  'gaming': { icon: Gamepad2, themeIndex: 1 },
  'designing': { icon: Palette, themeIndex: 1 },
  'ui-ux-designers': { icon: Palette, themeIndex: 1 },
  'content-creators': { icon: Camera, themeIndex: 4 },
  '3d-spatial-ai': { icon: Box, themeIndex: 5 },
  'ai-search-engines': { icon: SearchCheck, themeIndex: 6 },
  'aisearchengines': { icon: SearchCheck, themeIndex: 6 },
};

/**
 * Hash function to get deterministic index for unknown categories
 */
function hashString(str = '') {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Resolves category slug/name to Lucide Icon & color theme
 */
export function getCategoryVisuals(category) {
  const slug = (category?.slug || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const cleanKey = (category?.slug || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
  const nameKey = (category?.name || '').toLowerCase();

  // 1. Direct slug match
  if (ICON_MAP[slug]) {
    const item = ICON_MAP[slug];
    return { Icon: item.icon, theme: COLOR_THEMES[item.themeIndex] };
  }

  // 2. Clean key match
  if (ICON_MAP[cleanKey]) {
    const item = ICON_MAP[cleanKey];
    return { Icon: item.icon, theme: COLOR_THEMES[item.themeIndex] };
  }

  // 3. Keyword matching in name or slug
  if (nameKey.includes('write') || nameKey.includes('text') || nameKey.includes('content') || nameKey.includes('copy')) {
    return { Icon: PenTool, theme: COLOR_THEMES[0] };
  }
  if (nameKey.includes('image') || nameKey.includes('photo') || nameKey.includes('draw') || nameKey.includes('art')) {
    return { Icon: Image, theme: COLOR_THEMES[1] };
  }
  if (nameKey.includes('video') || nameKey.includes('film') || nameKey.includes('movie')) {
    return { Icon: Video, theme: COLOR_THEMES[4] };
  }
  if (nameKey.includes('code') || nameKey.includes('dev') || nameKey.includes('bot') || nameKey.includes('agent')) {
    return { Icon: Code2, theme: COLOR_THEMES[5] };
  }
  if (nameKey.includes('market') || nameKey.includes('seo') || nameKey.includes('social') || nameKey.includes('ad')) {
    return { Icon: Megaphone, theme: COLOR_THEMES[3] };
  }
  if (nameKey.includes('audio') || nameKey.includes('sound') || nameKey.includes('voice') || nameKey.includes('music') || nameKey.includes('speech')) {
    return { Icon: Mic, theme: COLOR_THEMES[6] };
  }
  if (nameKey.includes('learn') || nameKey.includes('edu') || nameKey.includes('student') || nameKey.includes('school')) {
    return { Icon: GraduationCap, theme: COLOR_THEMES[5] };
  }
  if (nameKey.includes('bus') || nameKey.includes('work') || nameKey.includes('job') || nameKey.includes('hr')) {
    return { Icon: Briefcase, theme: COLOR_THEMES[6] };
  }
  if (nameKey.includes('design') || nameKey.includes('logo') || nameKey.includes('ui')) {
    return { Icon: Palette, theme: COLOR_THEMES[1] };
  }
  if (nameKey.includes('sheet') || nameKey.includes('table') || nameKey.includes('excel') || nameKey.includes('data')) {
    return { Icon: Table, theme: COLOR_THEMES[2] };
  }

  // 4. Deterministic fallback
  const themeIdx = hashString(slug || nameKey) % COLOR_THEMES.length;
  return { Icon: Sparkles, theme: COLOR_THEMES[themeIdx] };
}
