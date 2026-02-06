'use client';

import { useEffect, useState } from 'react';
import CategoryCard from '@/components/CategoryCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  const topicCategories = categories.filter((c) => c.type === 'topic');
  const taskCategories = categories.filter((c) => c.type === 'task');
  const roleCategories = categories.filter((c) => c.type === 'role');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-black mb-2">AI Tool Categories</h1>
          <p className="text-gray-600">Explore AI tools organized by topics, tasks, and roles</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="topic">Topics</TabsTrigger>
            <TabsTrigger value="task">Tasks</TabsTrigger>
            <TabsTrigger value="role">Roles</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="topic">
            <h2 className="text-2xl font-bold text-black mb-6">By Topic / Context</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {topicCategories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="task">
            <h2 className="text-2xl font-bold text-black mb-6">By Task / Action</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {taskCategories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="role">
            <h2 className="text-2xl font-bold text-black mb-6">By Job Role</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {roleCategories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}