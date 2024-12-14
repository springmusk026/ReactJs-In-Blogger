import React from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import Sidebar from '../components/Layout/Sidebar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { BLOG_CONFIG } from '../config/constants';
import DOMPurify from 'dompurify'; // Add DOMPurify for sanitization
import { Link } from 'react-router-dom';

const PostPage = () => {
  const { year, month, slug } = useParams();
  const { posts, loading, error } = useBlogPosts(BLOG_CONFIG.BLOG_URL);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const post = posts.find(
    (p) =>
      p.slug === slug &&
      p.url.includes(`/${year}/${month}/`)
  );

  if (!post) {
    return <div className="text-center py-12">Post not found</div>;
  }

  // Sanitize the content HTML to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center space-x-4 mb-6">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-sm text-gray-500">
                  {format(new Date(post.date), 'MMMM dd, yyyy')}
                </div>
              </div>
            </div>

            {/* Render sanitized content */}
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />

            <div className="mt-8 pt-8 border-t">
  <div className="flex flex-wrap items-center space-x-2">
    <span className="text-gray-600">Categories:</span>
    {post.categories.map((category, index) => (
      <span key={category.id} className="text-blue-600">
        <Link
  key={category.id}
  to={`/search/label/${category.slug}`}
  className="hover:text-blue-600 px-2 py-1 bg-gray-100 rounded"
>
        {category.name}
        {index < post.categories.length - 1 ? ', ' : ''} 
          </Link>
      </span>
    ))}
  </div>
</div>

          </div>
        </article>

        <div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
