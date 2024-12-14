import axios from 'axios';
import { BLOGGER_API } from '../../config/constants';

const bloggerClient = axios.create({
  baseURL: BLOGGER_API.BASE_URL,
  params: {
    key: BLOGGER_API.API_KEY,
  },
});

export const getBlogPosts = async (maxResults = 10, pageToken?: string) => {
  const response = await bloggerClient.get(`/blogs/${BLOGGER_API.BLOG_ID}/posts`, {
    params: {
      maxResults,
      pageToken,
    },
  });
  return response.data;
};

export const getPostByPath = async (path: string) => {
  const response = await bloggerClient.get(`/blogs/${BLOGGER_API.BLOG_ID}/posts/bypath`, {
    params: {
      path,
    },
  });
  return response.data;
};

export const getPostsByLabel = async (label: string, maxResults = 10, pageToken?: string) => {
  const response = await bloggerClient.get(`/blogs/${BLOGGER_API.BLOG_ID}/posts/search`, {
    params: {
      q: `label:${label}`,
      maxResults,
      pageToken,
    },
  });
  return response.data;
};

export const getPages = async () => {
  const response = await bloggerClient.get(`/blogs/${BLOGGER_API.BLOG_ID}/pages`);
  return response.data;
};

export const getPageByPath = async (path: string) => {
  const response = await bloggerClient.get(`/blogs/${BLOGGER_API.BLOG_ID}/pages/bypath`, {
    params: {
      path,
    },
  });
  return response.data;
};