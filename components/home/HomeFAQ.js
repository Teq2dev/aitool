'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HomeFAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0); // Open first item by default

  const faqs = [
    { q: t('faqQ1'), a: t('faqA1') },
    { q: t('faqQ2'), a: t('faqA2') },
    { q: t('faqQ3'), a: t('faqA3') },
    { q: t('faqQ4'), a: t('faqA4') },
    { q: t('faqQ5'), a: t('faqA5') },
    { q: t('faqQ6'), a: t('faqA6') },
    { q: t('faqQ7'), a: t('faqA7') },
    { q: t('faqQ8'), a: t('faqA8') },
    { q: t('faqQ9'), a: t('faqA9') },
    { q: t('faqQ10'), a: t('faqA10') }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="space-y-8">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] border border-[rgba(67,56,202,0.15)] text-[#4338CA] text-xs font-bold uppercase tracking-wider mb-4">
          <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t('faqSectionBadge') || 'Frequently Asked Questions'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
          {t('faqSectionTitle')}
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#64748B] leading-relaxed">
          {t('faqSectionSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const contentId = `faq-content-${idx}`;
          const buttonId = `faq-btn-${idx}`;

          return (
            <div
              key={idx}
              className={`bg-white border rounded-2xl transition-all duration-200 overflow-hidden ${
                isOpen ? 'border-[#4338CA] shadow-sm' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
              }`}
            >
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => toggleFAQ(idx)}
                className="w-full p-5 text-left flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4338CA] rounded-2xl"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs font-black text-[#4338CA] bg-[#EEF2FF] px-2 py-0.5 rounded-md mt-0.5 flex-shrink-0" aria-hidden="true">
                    Q{idx + 1}
                  </span>
                  <h3 className="font-bold text-[#0F172A] text-base leading-snug">
                    {faq.q}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#64748B] flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#4338CA]' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-5 pb-5 pt-1 text-sm text-[#64748B] leading-relaxed border-t border-slate-50"
                >
                  <p className="pl-9">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
