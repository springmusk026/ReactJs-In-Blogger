const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export const getFeedUrl = (blogUrl: string) => {
  return `${blogUrl}/feeds/posts/default?alt=atom`;
};

export const fetchBloggerFeed = async (blogUrl: string) => {
  const feedUrl = getFeedUrl(blogUrl);
  const response = await fetch(CORS_PROXY + encodeURIComponent(feedUrl));
  
  if (!response.ok) {
    throw new Error('Failed to fetch feed');
  }
  
  return await response.text();
};