import { MetadataRoute } from 'next'
import { DOMAIN_URL } from '@/constants/url'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/generated/',
          '/revalidate/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/generated/'],
      },
    ],
    sitemap: `${DOMAIN_URL}/sitemap.xml`,
  }
}
