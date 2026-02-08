export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'blog' | 'product'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
}

export function generateMetaTags(config: SEOConfig) {
  const metaTags: Record<string, string> = {
    title: config.title,
    description: config.description,
  }

  // Basic meta tags
  if (config.keywords) {
    metaTags.keywords = config.keywords.join(', ')
  }

  // Open Graph tags
  metaTags['og:title'] = config.title
  metaTags['og:description'] = config.description
  metaTags['og:type'] = config.type || 'website'
  metaTags['og:site_name'] = 'Vue 3 Playground'

  if (config.image) {
    metaTags['og:image'] = config.image
    metaTags['og:image:alt'] = config.title
  }

  if (config.url) {
    metaTags['og:url'] = config.url
  }

  // Twitter Card tags
  metaTags['twitter:card'] = 'summary_large_image'
  metaTags['twitter:title'] = config.title
  metaTags['twitter:description'] = config.description

  if (config.image) {
    metaTags['twitter:image'] = config.image
  }

  // Article specific tags
  if (config.type === 'article' || config.type === 'blog') {
    if (config.publishedTime) {
      metaTags['article:published_time'] = config.publishedTime
    }
    if (config.modifiedTime) {
      metaTags['article:modified_time'] = config.modifiedTime
    }
    if (config.authors) {
      metaTags['article:author'] = config.authors.join(', ')
    }
    if (config.section) {
      metaTags['article:section'] = config.section
    }
  }

  return metaTags
}

export function generateStructuredData(config: SEOConfig) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': config.title,
    'description': config.description,
    'url': config.url || 'https://vue3-playground.example.com',
  }

  if (config.type === 'article' || config.type === 'blog') {
    return {
      ...baseSchema,
      '@type': 'Blog',
      'author': {
        '@type': 'Organization',
        'name': 'Vue 3 Playground Team'
      },
      'datePublished': config.publishedTime,
      'dateModified': config.modifiedTime,
      'keywords': config.keywords?.join(', '),
    }
  }

  return baseSchema
}

export function formatUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.href
  } catch {
    return url
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}