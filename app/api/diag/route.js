import { NextResponse } from 'next/server';
import { getToolBySlug } from '@/lib/getTools';
import { getCollection } from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') || 'retell-ai';

  try {
    // 1. Uncached MongoDB lookup
    const toolsCollection = await getCollection('tools');
    const dbTool = await toolsCollection.findOne({ slug });

    // 2. Cached lookup
    const cachedTool = await getToolBySlug(slug);

    return NextResponse.json({
      dbTool: dbTool ? { name: dbTool.name, slug: dbTool.slug } : null,
      cachedTool: cachedTool ? { name: cachedTool.name, slug: cachedTool.slug } : null,
      match: dbTool?.slug === cachedTool?.slug
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
