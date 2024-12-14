import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Post } from '../../types/blog';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formattedDate = format(new Date(post.date), 'MMMM dd, yyyy');
  const postUrl = `/${post.date.substring(0, 4)}/${post.date.substring(5, 7)}/${post.slug}`;

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
          <time>{formattedDate}</time>
          <span>•</span>
          <div className="flex flex-wrap space-x-2">
            {post.categories.map((category) => (
              <Link
                key={category.id}
                to={`/search/label/${category.slug}`}
                className="hover:text-blue-600"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-3">
          <Link to={postUrl} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h2>

        <p className="text-gray-600 mb-4">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-gray-600">{post.author.name}</span>
          </div>
          <Link
            to={postUrl}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
