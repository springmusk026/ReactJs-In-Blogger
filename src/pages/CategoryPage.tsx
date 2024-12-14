import React from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/Blog/PostCard';
import Sidebar from '../components/Layout/Sidebar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { BLOG_CONFIG } from '../config/constants';

const CategoryPage = () => {
  const { category } = useParams();
  const { posts, loading, error } = useBlogPosts(BLOG_CONFIG.BLOG_URL);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const categoryPosts = posts.filter(post =>
    post.categories.some(cat => cat.slug === category)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-8 capitalize">
            {category?.replace('-', ' ')} Posts
          </h1>
          
          {categoryPosts.length > 0 ? (
            <div className="space-y-8">
              {categoryPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No posts found in this category.</p>
          )}
        </div>
        
        <div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;