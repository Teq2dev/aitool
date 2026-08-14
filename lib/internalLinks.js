import { unstable_cache } from 'next/cache';
import { getCollection } from './db';

// Extract related categories using simple keyword overlap
export const getRelatedCategories = unstable_cache(
  async (categorySlug) => {
    try {
      const collection = await getCollection('tools');
      
      const cats = await collection.aggregate([
        { $match: { status: 'approved' } },
        { $unwind: '$categories' },
        { $group: { _id: '$categories' } }
      ]).toArray();
      
      const allCategorySlugs = cats.map(c => c._id).filter(Boolean);
      
      if (!categorySlug) return allCategorySlugs.slice(0, 5);
      
      // Simple logic: return adjacent alphabetical categories or keyword match
      const related = allCategorySlugs.filter(c => c !== categorySlug && (
        c.includes(categorySlug.split('-')[0]) || categorySlug.includes(c.split('-')[0])
      ));
      
      if (related.length < 5) {
        // pad with others
        const others = allCategorySlugs.filter(c => c !== categorySlug && !related.includes(c));
        related.push(...others.slice(0, 5 - related.length));
      }
      
      return related.slice(0, 5);
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  ['related-categories'],
  { revalidate: 86400 }
);

// Map to related blogs
export const getRelatedBlogs = unstable_cache(
  async (topicSlug) => {
    try {
      const collection = await getCollection('blogs');
      const blogs = await collection.find({ status: 'published' }).limit(10).toArray();
      
      if (!topicSlug) return blogs.slice(0, 3);
      
      const related = blogs.filter(b => b.slug.includes(topicSlug) || (b.title && b.title.toLowerCase().includes(topicSlug)));
      
      if (related.length < 3) {
        const others = blogs.filter(b => !related.find(r => r.slug === b.slug));
        related.push(...others.slice(0, 3 - related.length));
      }
      return related.slice(0, 3);
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  ['related-blogs'],
  { revalidate: 86400 }
);

export function formatLocalizedUrl(path, langCode) {
  if (!langCode || langCode === 'en') return path;
  if (path.startsWith('/')) return `/${langCode}${path}`;
  return `/${langCode}/${path}`;
}
