/**
 * AI Events Directory - Type Definitions & Constants
 * BestAIToolsFree.com
 */

export const EVENT_STATUS = {
  UPCOMING: 'upcoming',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  POSTPONED: 'postponed',
  CANCELLED: 'cancelled',
};

export const ATTENDANCE_MODE = {
  OFFLINE: 'offline', // Schema: OfflineEventAttendanceMode
  ONLINE: 'online',   // Schema: OnlineEventAttendanceMode
  MIXED: 'mixed',     // Schema: MixedEventAttendanceMode
};

export const EVENT_TYPE = {
  CONFERENCE: 'Conference',
  SUMMIT: 'Summit',
  EXPO: 'Expo',
  WORKSHOP: 'Workshop',
  SYMPOSIUM: 'Symposium',
};

export const EVENT_CATEGORIES = [
  'AI Research',
  'Machine Learning',
  'Generative AI',
  'Computer Vision',
  'Robotics',
  'AI Developer',
  'AI Business',
  'Data Science',
  'NLP',
  'MLOps',
  'AI Safety',
  'AI Hardware',
];

export const REGIONS = {
  NORTH_AMERICA: 'North America',
  EUROPE: 'Europe',
  ASIA_PACIFIC: 'Asia-Pacific',
  MIDDLE_EAST: 'Middle East',
  LATIN_AMERICA: 'Latin America',
  AFRICA: 'Africa',
  GLOBAL_VIRTUAL: 'Global / Virtual',
};

export const STATUS_LABELS = {
  [EVENT_STATUS.UPCOMING]: 'Upcoming',
  [EVENT_STATUS.ONGOING]: 'Ongoing',
  [EVENT_STATUS.COMPLETED]: 'Completed',
  [EVENT_STATUS.POSTPONED]: 'Postponed',
  [EVENT_STATUS.CANCELLED]: 'Cancelled',
};

export const STATUS_COLORS = {
  [EVENT_STATUS.UPCOMING]: {
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-100 text-emerald-800',
  },
  [EVENT_STATUS.ONGOING]: {
    bg: 'bg-blue-50 text-blue-700 border-blue-200',
    dot: 'bg-blue-500 animate-pulse',
    badge: 'bg-blue-100 text-blue-800',
  },
  [EVENT_STATUS.COMPLETED]: {
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
    dot: 'bg-slate-400',
    badge: 'bg-slate-100 text-slate-700',
  },
  [EVENT_STATUS.POSTPONED]: {
    bg: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
    badge: 'bg-amber-100 text-amber-800',
  },
  [EVENT_STATUS.CANCELLED]: {
    bg: 'bg-rose-50 text-rose-700 border-rose-200',
    dot: 'bg-rose-500',
    badge: 'bg-rose-100 text-rose-800',
  },
};
