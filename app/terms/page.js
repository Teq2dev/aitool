import Breadcrumbs from '@/components/seo/Breadcrumbs';

export const metadata = {
  title: 'Terms of Service | Best AI Tools Free',
  description: 'Review the Terms of Service for using Best AI Tools Free, including rules for tool submissions, content usage, and directory disclaimers.',
  alternates: {
    canonical: 'https://www.bestaitoolsfree.com/terms',
  },
};

export default function TermsPage() {
  const breadcrumbData = [
    { label: 'Home', href: '/' },
    { label: 'Terms of Service' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs data={breadcrumbData} />
        
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200 mt-6 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
              Terms of Service
            </h1>
            <p className="text-sm text-slate-500">Effective Date: August 2026</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
              <p>
                By accessing or using <strong>Best AI Tools Free</strong> (https://www.bestaitoolsfree.com), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">2. Directory &amp; Informational Purposes Only</h2>
              <p>
                Best AI Tools Free serves as an index and discovery platform for artificial intelligence tools and services created by third parties. We do not own, develop, or operate the third-party tools listed in our directory unless explicitly stated.
              </p>
              <p>
                Pricing, feature availability, and terms for third-party tools are subject to change by their respective owners at any time. We make every reasonable effort to keep listings accurate, but we do not guarantee real-time synchronization with external services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">3. Tool Submissions &amp; User Content</h2>
              <p>
                Users and product owners who submit tools, logos, descriptions, or reviews represent that they possess all necessary rights to publish such material. By submitting, you grant us a non-exclusive license to display, index, and promote the listing across our platform and search engines.
              </p>
              <p>
                We reserve the right to review, edit, reject, or remove any submission that violates intellectual property laws, contains deceptive claims, or does not meet our editorial quality standards.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">4. Intellectual Property</h2>
              <p>
                All trademarks, logos, and brand names appearing on this website belong to their respective holders. The Best AI Tools Free website design, code, logos, and curated taxonomy are protected by copyright.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">5. Disclaimer of Warranties &amp; Limitation of Liability</h2>
              <p>
                The service is provided on an "as is" and "as available" basis without warranties of any kind. Best AI Tools Free will not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of any software or service discovered through our directory.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">6. Contact Information</h2>
              <p>
                For questions regarding these Terms, please contact us at <strong>contact@bestaitoolsfree.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
