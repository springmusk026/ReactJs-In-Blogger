import { Post, Author, Category } from '../../types/blog';
import { format } from 'date-fns';

export const parseFeedXml = (xmlText: string) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  
  // First, extract all unique categories from the feed
  const allCategories = new Map<string, Category>();
  const categoryElements = xmlDoc.getElementsByTagName('category');
  for (let i = 0; i < categoryElements.length; i++) {
    const term = categoryElements[i].getAttribute('term');
    if (term && !allCategories.has(term)) {
      allCategories.set(term, {
        id: term,
        name: term,
        slug: term.toLowerCase().replace(/\s+/g, '-'),
      });
    }
  }
  
  const entries = xmlDoc.getElementsByTagName('entry');
  const posts: Post[] = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    
    // Get basic post info
    const id = entry.getElementsByTagName('id')[0]?.textContent || '';
    const title = entry.getElementsByTagName('title')[0]?.textContent || '';
    const rawContent = entry.getElementsByTagName('content')[0]?.textContent || '';
    const published = entry.getElementsByTagName('published')[0]?.textContent || '';
    
    // Process content and extract first image as featured image if available
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = rawContent;
    
    // Try to find the first image for featured image
    let featuredImage = '';
    const firstImg = tempDiv.querySelector('img');
    if (firstImg) {
      featuredImage = firstImg.src;
      // Optionally remove the first image from content if it's used as featured
      firstImg.remove();
    }
    
    // Clean content
    const content = tempDiv.innerHTML.trim();
    
    // Create a clean excerpt (without HTML)
    const excerpt = tempDiv.textContent?.trim().substring(0, 200) + '...' || '';
    
    // Get author info with fallback values
    const authorEl = entry.getElementsByTagName('author')[0];
    const author: Author = {
      id: authorEl?.getElementsByTagName('email')[0]?.textContent || '1',
      name: authorEl?.getElementsByTagName('name')[0]?.textContent || 'Anonymous',
      avatar: authorEl?.getElementsByTagName('gd:image')[0]?.getAttribute('src') || 
             `https://ui-avatars.com/api/?name=${encodeURIComponent(authorEl?.getElementsByTagName('name')[0]?.textContent || 'Anonymous')}`,
      bio: '',
    };
    
    // Get categories for this post
    const postCategories: Category[] = [];
    const postCategoryElements = entry.getElementsByTagName('category');
    for (let j = 0; j < postCategoryElements.length; j++) {
      const term = postCategoryElements[j].getAttribute('term');
      if (term && allCategories.has(term)) {
        postCategories.push(allCategories.get(term)!);
      }
    }
    
    // Get links and extract slug
    const links = entry.getElementsByTagName('link');
    let permalink = '';
    for (let j = 0; j < links.length; j++) {
      if (links[j].getAttribute('rel') === 'alternate') {
        permalink = links[j].getAttribute('href') || '';
        break;
      }
    }
    
    // Extract date components for URL
    const publishDate = new Date(published);
    const year = format(publishDate, 'yyyy');
    const month = format(publishDate, 'MM');
    
    // Extract slug from permalink or generate from title
    let slug = '';
    const slugMatch = permalink.match(/\/([^/]+)\.html$/);
    if (slugMatch) {
      slug = slugMatch[1];
    } else {
      // Generate slug from title if permalink parsing fails
      slug = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    posts.push({
      id,
      title,
      content,
      excerpt,
      slug,
      date: published,
      author,
      categories: postCategories,
      featuredImage,
      url: `/${year}/${month}/${slug}`,
    });
  }
  
  return {
    posts,
    categories: Array.from(allCategories.values()),
  };
};