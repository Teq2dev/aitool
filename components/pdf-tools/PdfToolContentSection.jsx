'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Cpu,
  Layers,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Lock,
  Server,
  Zap,
} from 'lucide-react';
import { getToolUiTranslation } from '@/lib/toolUiDictionary';

export default function PdfToolContentSection({ tool, lang = 'en' }) {
  const [openFaq, setOpenFaq] = useState(null);

  if (!tool) return null;

  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  const t = (key, params) => getToolUiTranslation(lang, key, params);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="mt-20 space-y-16 text-slate-700">
      {/* 1. Practical Applications & Use Cases */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-blue-600 uppercase tracking-wider">
            {t('realWorldWorkflowsTag')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('practicalApplications')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {tool.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tool.useCases.map((useCase, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {useCase.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Step-by-Step Usage Guide */}
      <section className="bg-slate-50/80 rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-black text-blue-600 uppercase tracking-wider">
            {t('simpleWorkflowTag')}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {t('howToUse', { name: tool.h1 || tool.name || tool.seoTitle?.split('–')[0].trim() })}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tool.steps.map((step) => (
            <div
              key={step.step}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  {step.step}
                </span>
                <h3 className="font-bold text-slate-900 text-sm">
                  {step.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Technical Engine & Honest Limitations */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engine description */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            {t('processingArchitectureTag')}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {t('howProcessingWorks')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {tool.processing?.description}
          </p>
          <div className="pt-2">
            <p className="text-xs font-semibold text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-700">{t('underlyingEngine')}</span> {tool.processing?.engine}
            </p>
          </div>
        </div>

        {/* Technical limitations */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full border border-amber-200">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            {t('techSpecsLimitsTag')}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {t('operationalBoundaries')}
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
            {tool.limitations?.map((lim, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{lim}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Privacy & File Security */}
      {tool.privacy && (
        <section
          className={`rounded-3xl p-6 sm:p-8 md:p-10 text-white space-y-3 shadow-md ${
            tool.privacy.isClientSide
              ? 'bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950'
              : 'bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 border border-white/20 text-white">
            {tool.privacy.isClientSide ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('inBrowserClientSideProcessing')}</span>
              </>
            ) : (
              <>
                <Server className="w-3.5 h-3.5 text-blue-400" />
                <span>{t('encryptedTransmission')}</span>
              </>
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {tool.privacy.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            {tool.privacy.text}
          </p>
        </section>
      )}

      {/* 5. Frequently Asked Questions */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-blue-600 uppercase tracking-wider">
            {t('gotQuestionsTag')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('frequentlyAskedQuestions')}
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {tool.faqs?.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden transition-colors shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question || faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer || faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Quick Navigation to Related PDF Tools */}
      {tool.internalLinks && tool.internalLinks.length > 0 && (
        <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-center space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {t('exploreRelatedUtilities')}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {tool.internalLinks.map((link) => (
              <Link
                key={link.href}
                href={`${langPrefix}${link.href.startsWith('/') ? link.href : '/' + link.href}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs transition-all"
              >
                {link.label}
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
