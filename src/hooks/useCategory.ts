import { useState, useEffect } from 'react';
import { getPostsByLabel } from '../services/api/blogger';

export const useCategory = (category: string, maxResults = 10) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageToken, setPageToken] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getPostsByLabel(category, maxResults);
        setPosts(data.items);
        setPageToken(data.nextPageToken);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category, maxResults]);

  const loadMore = async () => {
    if (!pageToken) return;

    try {
      const data = await getPostsByLabel(category, maxResults, pageToken);
      setPosts(prevPosts => [...prevPosts, ...data.items]);
      setPageToken(data.nextPageToken);
    } catch (err) {
      setError(err);
    }
  };

  return { posts, loading, error, loadMore, hasMore: !!pageToken };
};