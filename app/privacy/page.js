import Breadcrumbs from '@/components/seo/Breadcrumbs';

export const metadata = {
  title: 'Privacy Policy | Best AI Tools Free',
  description: 'Read the Privacy & Cookie Policy for Best AI Tools Free. Learn how we collect, protect, and handle data in compliance with global standards.',
  alternates: {
    canonical: 'https://www.bestaitoolsfree.com/privacy',
  },
};

export default function PrivacyPage() {
  const breadcrumbData = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs data={breadcrumbData} />
        
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200 mt-6 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
              Privacy &amp; Cookie Policy
            </h1>
            <p className="text-sm text-slate-500">Last updated: August 2026</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">1. Overview</h2>
              <p>
                Best AI Tools Free ("we", "our", or "us") is dedicated to protecting your personal privacy. This Privacy Policy explains what information we collect when you visit our website (https://www.bestaitoolsfree.com), how we use it, and the choices you have regarding your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">2. Information We Collect</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Usage Data:</strong> We collect non-personally identifiable information such as browser type, operating system, referring URLs, pages viewed, and timestamps via Google Analytics to optimize performance.</li>
                <li><strong>Account &amp; Submission Information:</strong> If you sign in via OAuth (e.g. Google/Clerk) or submit a tool or blog post, we collect your email address, name, and submitted website details.</li>
                <li><strong>Cookies &amp; Local Storage:</strong> We use cookies to remember language preferences, theme states, and manage consent preferences through Cookiebot.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">3. How We Use Information</h2>
              <p>
                We use the collected information solely to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Operate, maintain, and enhance the directory and search functionality.</li>
                <li>Verify, review, and publish user-submitted AI tools and articles.</li>
                <li>Analyze aggregate user trends to improve directory navigation and speed.</li>
                <li>Comply with applicable legal obligations and prevent spam or malicious activity.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">4. Third-Party Links &amp; Tools</h2>
              <p>
                Our website links to third-party AI tools and software. We are not responsible for the privacy practices or content of third-party websites. We encourage you to read the privacy statements of any external service you visit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">5. GDPR &amp; User Rights</h2>
              <p>
                Depending on your location, you have the right to request access to, correction of, or deletion of your personal information held by us. You may also modify your cookie consent at any time via the Cookiebot settings icon.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">6. Contact Us</h2>
              <p>
                If you have questions regarding this Privacy Policy or your data, please reach out via our contact page or email us at <strong>contact@bestaitoolsfree.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
