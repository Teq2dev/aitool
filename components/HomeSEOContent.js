'use client';

import Link from 'next/link';
import { 
  Briefcase, 
  Building2, 
  Palette, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  Compass,
  FileText,
  Video,
  Image as ImageIcon,
  Code,
  Headphones,
  BarChart3,
  Presentation,
  Cpu,
  GraduationCap,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Search,
  Scale,
  Zap,
  Globe2,
  Lock
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HomeSEOContent() {
  const { getLangUrl } = useLanguage();

  const faqs = [
    {
      q: "What is an AI tool and how does it work?",
      a: "An AI tool is specialized software powered by artificial intelligence models—such as Large Language Models (LLMs), neural networks, or diffusion engines—designed to automate tasks, generate content, analyze complex datasets, or enhance human workflows. Rather than relying solely on rigid rule-based programming, AI tools understand context, interpret natural language prompts, recognize patterns, and produce dynamic outputs including text, imagery, code, audio, and structured data."
    },
    {
      q: "Are there genuinely free AI tools available?",
      a: "Yes. Many AI tools offer completely free access, open-source repositories, or generous freemium tiers with recurring monthly allowances. Best AI Tools Free clearly tags each listing with its exact pricing model—whether 100% Free, Freemium, Free Trial, or Paid—enabling users to easily discover powerful solutions that cost nothing to start using."
    },
    {
      q: "How do I choose the best AI tool for my specific workflow?",
      a: "Begin by clarifying your primary objective (e.g., generating marketing copy, creating conceptual artwork, or debugging application code). Then compare candidate tools based on output quality, prompt flexibility, learning curve, pricing sustainability, and integration with your existing tool stack. Testing tools using free tiers or trials before committing is always recommended."
    },
    {
      q: "What major categories of AI software can I explore on Best AI Tools Free?",
      a: "Our curated directory spans major industry categories including AI Writing & Copywriting, Image Generation & Editing, Video Creation, Developer & Coding Tools, Productivity & Automation, SEO & Search Optimization, Presentation Makers, Audio & Speech Synthesis, Customer Support Chatbots, and Business Operations."
    },
    {
      q: "Are AI tools safe to use with sensitive business or personal data?",
      a: "Security practices vary by provider. Established platforms offer enterprise-grade encryption in transit and at rest, clear data retention policies, and opt-outs ensuring user inputs are not used for public model training. When evaluating AI tools for sensitive workflows, always check privacy policies and compliance standards like GDPR and SOC 2."
    },
    {
      q: "Can I use outputs from AI tools for commercial projects?",
      a: "In most cases, yes. Leading AI software providers grant full commercial rights for content created on their platforms, especially under standard paid or commercial licenses. However, licensing terms can vary between free and commercial tiers, so reviewing the official provider license terms is recommended."
    },
    {
      q: "How does an AI directory save time compared to standard search engines?",
      a: "Traditional search engines often prioritize sponsored listings, affiliate aggregators, and generic review roundups. An organized directory like Best AI Tools Free categorizes software by verified use cases, displays standardized metadata on pricing and features, and facilitates direct comparisons without navigation clutter."
    },
    {
      q: "How often are new AI tools added and verified on Best AI Tools Free?",
      a: "Our directory is continuously updated with newly released AI software, major model updates, and emerging tools submitted by developers. Each tool listing is reviewed to confirm active web endpoints, verified features, and accurate pricing tiers."
    },
    {
      q: "Can developers and founders submit their AI tools to this directory?",
      a: "Yes. Creators and development teams can submit their AI software via our Submit Tool page. Submissions are reviewed for functionality, utility, and accurate descriptions before being published to our global index."
    },
    {
      q: "Do I need coding or technical skills to use modern AI software?",
      a: "No. The vast majority of modern AI applications feature user-friendly graphical interfaces, intuitive natural language inputs, and pre-built templates requiring zero technical background. Specialized developer tools exist for technical users, but general productivity, creative, and business tools are built for everyone."
    }
  ];

  return (
    <section aria-label="AI Tools Comprehensive Guide and FAQ" className="bg-slate-50/70 border-t border-slate-200/80 py-16 sm:py-20 lg:py-24 text-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-20 lg:space-y-28">

        {/* 1. What AI Tools Are & How an AI Directory Helps (Balanced 2-Column Desktop Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Complete AI Ecosystem Guide</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Understanding Modern AI Tools & Discovery
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Artificial intelligence software has transformed modern work, creativity, and digital problem-solving. From generative language models that write essays to neural image renderers and automated code assistants, AI tools empower individuals and teams to accomplish complex tasks in seconds rather than hours.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              However, as thousands of new applications launch each month, discovering the right software becomes challenging. A curated, editorial AI directory like <strong>Best AI Tools Free</strong> organizes the global ecosystem by intent, verified functionality, pricing model, and user role—giving you a transparent, ad-free environment to discover, compare, and adopt top-tier AI software.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 pt-2 lg:pt-0">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold flex-shrink-0" aria-hidden="true">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Verified Listings</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Every tool is vetted for active endpoints, genuine free tiers, and safe usage policies.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0" aria-hidden="true">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Zero Ad Clutter</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Direct links to official tools without sponsored redirection or deceptive landing pages.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold flex-shrink-0" aria-hidden="true">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Global Multi-Language</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Native directory support across 11 international languages for worldwide creators.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Major AI Tool Categories */}
        <div className="space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Explore AI Tools by Category
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Browse our hand-verified collections of artificial intelligence applications organized across primary professional and creative disciplines:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <Link 
              href={getLangUrl('/categories/ai-writers')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">AI Writing & Copy</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Draft long-form articles, persuasive ad copy, emails, and essays with generative LLMs.
                </p>
              </div>
            </Link>

            <Link 
              href={getLangUrl('/categories/text-to-image')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Image Generation</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Produce photorealistic visuals, digital illustrations, concept art, and graphics from text prompts.
                </p>
              </div>
            </Link>

            <Link 
              href={getLangUrl('/categories/video-editing')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold group-hover:bg-rose-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <Video className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors">Video Creation</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Create AI video avatars, generate text-to-video clips, and automate video editing workflows.
                </p>
              </div>
            </Link>

            <Link 
              href={getLangUrl('/categories/dev-tools')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <Code className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Developer & Code Tools</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Speed up engineering with intelligent code completions, automated refactoring, and bug fixes.
                </p>
              </div>
            </Link>

            <Link 
              href={getLangUrl('/categories/productivity')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Productivity & Workflow</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Automate task management, summarize meetings, synthesize notes, and streamline operations.
                </p>
              </div>
            </Link>

            <Link 
              href={getLangUrl('/categories/seo')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold group-hover:bg-amber-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">SEO & Search Optimization</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Identify high-value keywords, score content relevance, and optimize pages for search engine ranking.
                </p>
              </div>
            </Link>

            <Link 
              href={getLangUrl('/categories/designing')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold group-hover:bg-pink-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <Palette className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-pink-600 transition-colors">Design & UI/UX</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Generate color palettes, mockups, design assets, and user interface prototypes effortlessly.
                </p>
              </div>
            </Link>

            <Link 
              href={getLangUrl('/categories/aisearchengines')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold group-hover:bg-sky-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <Search className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">AI Research & Search</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Query deep neural search engines with direct citations and live web data retrieval.
                </p>
              </div>
            </Link>

            <Link 
              href={getLangUrl('/categories/business')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Business & Management</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Optimize strategic planning, sales forecasting, invoice processing, and financial models.
                </p>
              </div>
            </Link>

            <Link 
              href={getLangUrl('/categories/customersupport')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold group-hover:bg-teal-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors">Chatbots & Customer Support</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Deploy 24/7 intelligent conversational agents to resolve tickets and assist clients.
                </p>
              </div>
            </Link>

            <Link 
              href={getLangUrl('/categories/audioediting')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold group-hover:bg-cyan-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">Audio & Voice Synthesis</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Convert text to speech, clone realistic voiceovers, and isolate audio vocals.
                </p>
              </div>
            </Link>

            <Link 
              href={getLangUrl('/categories/presentationmakers')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold group-hover:bg-violet-600 group-hover:text-white transition-colors" aria-hidden="true">
                    <Presentation className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-violet-600 transition-colors">Presentation Makers</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Transform outlines and bullet points into professional slide decks and pitch presentations.
                </p>
              </div>
            </Link>
          </div>

          <div className="pt-2">
            <Link 
              href={getLangUrl('/categories')} 
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
            >
              <span>Explore all AI software categories</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* 3. Free vs Freemium vs Paid AI Tools (Full Width 3-Column Card Layout) */}
        <div className="p-8 sm:p-10 lg:p-14 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 text-white shadow-xl">
          <div className="w-full space-y-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Free vs. Freemium vs. Paid AI Tools
              </h2>
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed mt-2">
                Understanding pricing structures prevents surprise billing and helps you plan sustainable workflows:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-slate-900">
              <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-sm space-y-2.5 shadow-sm">
                <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">100% Free</span>
                <h3 className="font-bold text-slate-900 text-base">Free & Open Source</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Completely free software without feature paywalls or token limits, often powered by open-source models or community hosting.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-sm space-y-2.5 shadow-sm">
                <span className="inline-block px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">Freemium</span>
                <h3 className="font-bold text-slate-900 text-base">Freemium Tiers</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Offers recurring monthly free credits or essential feature sets, with optional paid upgrades for heavy volume and advanced models.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-sm space-y-2.5 shadow-sm">
                <span className="inline-block px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs">Free Trial</span>
                <h3 className="font-bold text-slate-900 text-base">Free Trials & Commercial</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Time-limited or credit-limited trial access allowing you to evaluate premium commercial software before subscribing.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link 
                href={getLangUrl('/tools?pricing=Free')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-md hover:bg-blue-50 transition-all cursor-pointer"
              >
                <span>Browse Free AI Tools Directory</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4. AI Tools by User Role */}
        <div className="space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              AI Tools for Different Roles & Disciplines
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Every profession benefits from tailored AI tooling designed to eliminate bottlenecks:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold" aria-hidden="true">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">For Businesses & Teams</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Scale customer support, automate repetitive invoicing, generate sales proposals, and synthesize meeting records to boost team productivity across the company.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold" aria-hidden="true">
                    <Palette className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">For Creators & Video Editors</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Produce YouTube thumbnails, generate viral short-form video clips from long recordings, master podcast audio tracks, and storyboard creative ideas instantly.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold" aria-hidden="true">
                    <Code className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">For Developers & Engineers</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Accelerate software development cycles with inline code completions, automated test suite generation, syntax translation, and runtime debugging assistants.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold" aria-hidden="true">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">For Marketers & Copywriters</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Conduct competitor keyword research, draft personalized email outreach campaigns, write social media calendars, and test ad copy variations in minutes.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold" aria-hidden="true">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">For Designers & Artists</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Generate concept art moodboards, remove image backgrounds seamlessly, upscale raster graphics, and create custom vector illustrations on demand.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold" aria-hidden="true">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">For Students & Researchers</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Summarize extensive academic papers, extract key citations, generate flashcards, and clarify difficult concepts with interactive conversational AI tutors.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. How to Compare & Evaluate AI Tools */}
        <div className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              How to Compare and Evaluate AI Software
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              When choosing between competing tools in the same category, consider these core evaluation pillars:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex gap-4 items-start p-2">
              <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Output Quality & Model Accuracy</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Evaluate whether generated content meets professional standards, handles edge cases gracefully, and avoids repetitive generic phrasing.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-2">
              <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Pricing Transparency & Token Caps</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Check whether credit limits and subscription fees scale predictably with your expected output volume and team size.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-2">
              <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Integration & Workflow Fit</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Look for native plugins and API connections with existing platforms like VS Code, Notion, Google Workspace, Slack, or Zapier.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-2">
              <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Ease of Use & Prompt Control</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Prioritize software with clear interface layouts, pre-made templates, and intuitive parameter controls that minimize onboarding friction.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-2">
              <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Data Privacy & Enterprise Security</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Ensure the vendor provides commercial usage licenses and guarantees that proprietary client data is not used for public model training.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-2">
              <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Active Maintenance & Updates</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Choose tools with active development teams that regularly incorporate newer foundation models and respond to user feedback.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Why Best AI Tools Free (Balanced 2-Column Grid on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start p-8 sm:p-10 lg:p-12 rounded-3xl bg-slate-100/80 border border-slate-200">
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Why Use Best AI Tools Free for Software Discovery?
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              Finding the right software in a fast-moving ecosystem requires unbiased, organized information. Search engine results are often dominated by aggressive paid marketing, while social media feeds highlight short-lived viral trends that may lack long-term utility.
            </p>
            <p>
              <strong>Best AI Tools Free</strong> solves this discovery problem by offering a structured, categorized directory of verified artificial intelligence software. Every tool page provides verified pricing models, direct website links, concise feature breakdowns, and user ratings—enabling you to make informed decisions quickly.
            </p>
          </div>
        </div>

        {/* 7. Frequently Asked Questions (2-Column FAQ Grid) */}
        <div className="space-y-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
              <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Knowledge Base & Answers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Frequently Asked Questions About AI Tools
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Common questions regarding artificial intelligence applications, pricing tiers, safety, and directory submissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2.5"
              >
                <h3 className="font-bold text-slate-900 text-base leading-snug flex items-start gap-2.5">
                  <span className="text-blue-600 font-extrabold text-sm" aria-hidden="true">Q{idx + 1}.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
