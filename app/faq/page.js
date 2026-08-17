import Breadcrumbs from '@/components/seo/Breadcrumbs';
import Link from 'next/link';

export const metadata = {
  title: 'Frequently Asked Questions (FAQ) | Best AI Tools Free',
  description: 'Find answers to common questions about Best AI Tools Free, finding free artificial intelligence software, submitting tools, and pricing models.',
  alternates: {
    canonical: 'https://www.bestaitoolsfree.com/faq',
  },
};

export default function FAQPage() {
  const breadcrumbData = [
    { label: 'Home', href: '/' },
    { label: 'FAQ' }
  ];

  const faqs = [
    {
      question: 'What is Best AI Tools Free?',
      answer: 'Best AI Tools Free is a curated directory and search platform designed to help users discover, compare, and master the best free and freemium artificial intelligence software across 50+ specialized categories.'
    },
    {
      question: 'Are all the AI tools on this website completely free?',
      answer: 'We index a wide variety of tools, with a strong focus on tools offering 100% free plans, open-source models, or generous free trial credits. Each tool card clearly displays its pricing tier: Free, Freemium, or Paid.'
    },
    {
      question: 'How do I submit my AI tool to the directory?',
      answer: 'You can submit your tool anytime via our Submit Tool page (/submit). Our editorial team reviews every application for authenticity, security, and utility.'
    },
    {
      question: 'How often is the directory updated?',
      answer: 'Our database is updated daily with fresh AI tool arrivals, updated pricing tiers, and new editorial reviews.'
    },
    {
      question: 'Can I bookmark or vote for my favorite AI tools?',
      answer: 'Yes! You can upvote tools and browse community ratings to help fellow creators and developers find the best software.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs data={breadcrumbData} />
        
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200 mt-6 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Find quick answers to common questions about our directory, tool submissions, and AI software classifications.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 bg-gray-50/70 rounded-xl border border-gray-200">
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  {faq.question}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900">Still have questions?</h3>
              <p className="text-sm text-slate-500">Contact our support team anytime.</p>
            </div>
            <Link 
              href="/contact" 
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
