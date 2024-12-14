import { useState, useEffect } from 'react';
import { fetchBloggerFeed } from '../services/feed/blogger';
import { parseFeedXml } from '../services/feed/parser';
import { Post, Category } from '../types/blog';

interface BlogData {
  posts: Post[];
  categories: Category[];
}

export const useBlogPosts = (blogUrl: string) => {
  const [data, setData] = useState<BlogData>({ posts: [], categories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const feedXml = await fetchBloggerFeed(blogUrl);
        const parsedData = parseFeedXml(feedXml);
        setData(parsedData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch posts'));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [blogUrl]);

  return { ...data, loading, error };
};