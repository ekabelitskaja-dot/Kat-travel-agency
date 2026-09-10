import type {MetadataRoute} from 'next';

import {SITE_URL} from '@/lib/site';

const aiCrawlers = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'Google-Extended',
  'Bingbot',
  'Googlebot'
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {userAgent: '*', allow: '/'},
      ...aiCrawlers.map((userAgent) => ({userAgent, allow: '/'}))
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
