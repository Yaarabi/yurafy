import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || 'https://yurafy.com';

  const locales = routing.locales; // ['en', 'fr', 'ar']
  
  // Define all your static routes here
  const routes = [
    '',
    '/projects',
    '/pricing',
    '/blog',
    '/terms',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate localized URLs for each route
  routes.forEach((route) => {
    locales.forEach((locale) => {
      const isDefaultLocale = locale === routing.defaultLocale;
      const urlPath = isDefaultLocale ? route : `/${locale}${route}`;
      sitemapEntries.push({
        url: `${baseUrl}${urlPath}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
