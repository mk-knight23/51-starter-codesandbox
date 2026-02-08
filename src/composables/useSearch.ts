import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { searchContent, searchWithFilters, getPopularContent, getRelatedContent } from '@/utils/search'

export interface SearchFilters {
  category?: string
  type?: 'blog' | 'docs'
  tags?: string[]
  dateRange?: [string, string]
}

export function useSearch() {
  const router = useRouter()
  const query = ref('')
  const filters = ref<SearchFilters>({})
  const isLoading = ref(false)

  // Search results
  const results = computed(() => {
    if (!query.value.trim()) return []
    return searchContent(query.value, { limit: 20 })
  })

  // Filtered results
  const filteredResults = computed(() => {
    if (!query.value.trim()) return []
    return searchWithFilters(query.value, filters.value, { limit: 20 })
  })

  // Popular content
  const popularContent = computed(() => getPopularContent(10))

  // Related content based on current route/selected item
  const relatedContent = computed(() => {
    // This would ideally come from the current route or selected item
    // For now, returns empty array until implemented
    return []
  })

  // Search functions
  async function performSearch(newQuery: string, newFilters?: SearchFilters) {
    isLoading.value = true

    try {
      query.value = newQuery
      if (newFilters) {
        filters.value = newFilters
      }

      // Update URL with search params
      const params = new URLSearchParams()
      params.set('q', newQuery)

      if (newFilters?.category) {
        params.set('category', newFilters.category)
      }
      if (newFilters?.type) {
        params.set('type', newFilters.type)
      }

      router.push({ path: '/search', query: params.toString() })
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Clear search
  function clearSearch() {
    query.value = ''
    filters.value = {}
    router.replace({ path: '/search' })
  }

  // Update filters
  function updateFilters(newFilters: Partial<SearchFilters>) {
    filters.value = { ...filters.value, ...newFilters }
    performSearch(query.value, filters.value)
  }

  // Get search suggestions
  function getSuggestions(limit: number = 5) {
    if (!query.value.trim()) return []
    return searchContent(query.value, { limit })
  }

  // Search by tag
  function searchByTag(tag: string, limit: number = 10) {
    return searchByTag(tag, limit)
  }

  // Search by category
  function searchByCategory(category: string, limit: number = 10) {
    return searchByCategory(category, limit)
  }

  // Get content by type
  function getContentByType(type: 'blog' | 'docs', limit: number = 10) {
    const results = searchContent('', { limit })
    return results.filter(result => {
      if (type === 'blog' && 'tags' in result.item) {
        return true
      }
      if (type === 'docs' && 'section' in result.item) {
        return true
      }
      return false
    })
  }

  // Get search stats
  const searchStats = computed(() => {
    return {
      totalResults: results.value.length,
      filteredResults: filteredResults.value.length,
      query: query.value,
      hasFilters: Object.keys(filters.value).length > 0
    }
  })

  return {
    query,
    filters,
    isLoading,
    results,
    filteredResults,
    popularContent,
    relatedContent,
    searchStats,
    performSearch,
    clearSearch,
    updateFilters,
    getSuggestions,
    searchByTag,
    searchByCategory,
    getContentByType
  }
}