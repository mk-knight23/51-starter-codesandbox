import Fuse from 'fuse.js'
import type { Content, BlogPost, DocumentationPage } from '@/content/types/content'
import blogPosts from '@/content/blog.json'
import documentationPages from '@/content/docs.json'

interface SearchResult {
  item: Content
  refIndex: number
  score: number
}

interface SearchOptions {
  limit?: number
  threshold?: number
  keys?: string[]
}

// Combine all content
const allContent: Content[] = [...blogPosts, ...documentationPages]

// Initialize Fuse.js with search configuration
const fuse = new Fuse(allContent, {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'content', weight: 0.2 },
    { name: 'tags', weight: 0.1 },
    { name: 'category', weight: 0.1 }
  ],
  threshold: 0.4,
  distance: 100,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
})

// Search function
export function searchContent(query: string, options: SearchOptions = {}): SearchResult[] {
  if (!query.trim()) return []

  const {
    limit = 10,
    threshold = 0.4,
    keys
  } = options

  // Update threshold if provided
  fuse.options.threshold = threshold

  // Update keys if provided
  if (keys) {
    fuse.options.keys = keys.map(key => ({
      name: key,
      weight: 0.3
    }))
  }

  // Perform search
  const results = fuse.search(query, { limit })

  return results.map(result => ({
    item: result.item,
    refIndex: result.refIndex,
    score: result.score || 0
  }))
}

// Get search suggestions
export function getSuggestions(query: string, limit: number = 5): Content[] {
  if (!query.trim()) return []

  const results = searchContent(query, { limit })
  return results.map(result => result.item)
}

// Search by category
export function searchByCategory(category: string, limit: number = 10): Content[] {
  const results = searchContent(category, { limit })
  return results.map(result => result.item)
}

// Search by tags
export function searchByTag(tag: string, limit: number = 10): Content[] {
  const results = searchContent(tag, {
    limit,
    keys: ['tags']
  })
  return results.map(result => result.item)
}

// Search with filters
export function searchWithFilters(
  query: string,
  filters: {
    category?: string
    type?: 'blog' | 'docs'
    tags?: string[]
    dateRange?: [string, string]
  },
  options: SearchOptions = {}
): SearchResult[] {
  let results = searchContent(query, options)

  // Filter by type
  if (filters.type) {
    results = results.filter(result => {
      if (filters.type === 'blog' && 'tags' in result.item) {
        return true
      }
      if (filters.type === 'docs' && 'section' in result.item) {
        return true
      }
      return false
    })
  }

  // Filter by category
  if (filters.category) {
    results = results.filter(result =>
      result.item.category === filters.category
    )
  }

  // Filter by tags
  if (filters.tags && filters.tags.length > 0) {
    results = results.filter(result =>
      result.item.tags?.some(tag => filters.tags!.includes(tag))
    )
  }

  // Filter by date range
  if (filters.dateRange) {
    const [startDate, endDate] = filters.dateRange
    results = results.filter(result => {
      const date = new Date(result.item.date)
      return date >= new Date(startDate) && date <= new Date(endDate)
    })
  }

  return results
}

// Get popular content (based on search frequency or other metrics)
export function getPopularContent(limit: number = 10): Content[] {
  // In a real implementation, this might be based on analytics or view counts
  // For now, we'll return recent content
  return allContent
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

// Get related content based on tags and category
export function getRelatedContent(
  content: Content,
  limit: number = 5
): Content[] {
  const related: Content[] = []
  const potentialMatches = allContent.filter(item => item !== content)

  // First try to match by tags
  if (content.tags) {
    for (const item of potentialMatches) {
      if (item.tags && item.tags.some(tag => content.tags!.includes(tag))) {
        related.push(item)
        if (related.length >= limit) break
      }
    }
  }

  // If we need more content, try category matching
  if (related.length < limit && content.category) {
    for (const item of potentialMatches) {
      if (item.category === content.category && !related.includes(item)) {
        related.push(item)
        if (related.length >= limit) break
      }
    }
  }

  // Fill remaining with recent content
  if (related.length < limit) {
    for (const item of potentialMatches) {
      if (!related.includes(item)) {
        related.push(item)
        if (related.length >= limit) break
      }
    }
  }

  return related.slice(0, limit)
}

// Index content (call this when content changes)
export function rebuildIndex() {
  fuse.setCollection(allContent)
}

// Initialize index on module load
rebuildIndex()