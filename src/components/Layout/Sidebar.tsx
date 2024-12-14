import React from 'react';
import { Link } from 'react-router-dom';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { BLOG_CONFIG } from '../../config/constants';
import LoadingSpinner from '../common/LoadingSpinner';

const Sidebar = () => {
  const { posts, categories, loading, error } = useBlogPosts(BLOG_CONFIG.BLOG_URL);

  // Limit categories and posts to a maximum of 10
  const recentPosts = posts.slice(0, 5); // Display top 5 posts
  const limitedCategories = categories.slice(0, 10); // Display top 10 categories

  if (loading) return <LoadingSpinner />;
  if (error) return null;

  return (
    <aside className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <ul className="space-y-2">
          {limitedCategories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/search/label/${category.slug}`}
                className="text-gray-600 hover:text-blue-600"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
        <ul className="space-y-4">
          {recentPosts.map((post) => (
            <li key={post.id}>
              <Link
                to={post.url}
                className="text-gray-600 hover:text-blue-600"
              >
                {post.title}
              </Link>
              <p className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
