'use client';

import ToolEditorForm from '@/components/ToolEditorForm';

export default function SubmitToolPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Submit Your AI Tool - Best AI Tools Free',
    description: 'Share your AI tool with thousands of users. Submit your tool to the Best AI Tools Free directory.',
    url: 'https://www.bestaitoolsfree.com/submit',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <ToolEditorForm mode="create" />
    </>
  );
}
