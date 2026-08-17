import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { Mail, MessageSquare, HelpCircle, Send } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | Best AI Tools Free',
  description: 'Get in touch with the Best AI Tools Free team. Inquire about tool submissions, advertising, partnerships, or directory feedback.',
  alternates: {
    canonical: 'https://www.bestaitoolsfree.com/contact',
  },
};

export default function ContactPage() {
  const breadcrumbData = [
    { label: 'Home', href: '/' },
    { label: 'Contact Us' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs data={breadcrumbData} />
        
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200 mt-6 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
              Contact Us
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              We'd love to hear from you. Whether you want to feature an AI tool, report outdated information, or explore a partnership, get in touch with our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Direct Email Support</h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  For general questions, sponsorship inquiries, bug reports, and data privacy requests:
                </p>
              </div>
              <a 
                href="mailto:contact@bestaitoolsfree.com" 
                className="text-blue-600 font-bold hover:underline text-lg break-all"
              >
                contact@bestaitoolsfree.com
              </a>
            </div>

            <div className="p-6 bg-purple-50/50 rounded-2xl border border-purple-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Tool Submissions</h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Are you an AI developer or product founder? Submit your tool directly through our portal for editorial review:
                </p>
              </div>
              <Link 
                href="/submit" 
                className="inline-flex items-center justify-center px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
              >
                <Send className="w-4 h-4 mr-2" /> Go to Submit Portal
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              Frequently Asked Support Topics
            </h2>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="font-bold text-slate-900 mb-1">How long does it take to review a submitted tool?</h3>
                <p>Tool submissions are typically reviewed by our editorial team within 24 to 48 hours.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="font-bold text-slate-900 mb-1">How do I update an existing tool listing?</h3>
                <p>Email us at contact@bestaitoolsfree.com with the tool name, URL, and updated details from the verified owner email.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
