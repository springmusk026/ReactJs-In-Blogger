import { useState, useEffect } from 'react';
import { getPostByPath } from '../services/api/blogger';

export const usePost = (year: string, month: string, slug: string) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const path = `/${year}/${month}/${slug}`;
        const data = await getPostByPath(path);
        setPost(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [year, month, slug]);

  return { post, loading, error };
};