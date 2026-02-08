<template>
  <div class="relative">
    <div class="relative">
      <input
        v-model="query"
        @input="handleSearch"
        @focus="showResults = true"
        @keydown.esc="showResults = false"
        @keydown.down="navigateResults('down')"
        @keydown.up="navigateResults('up')"
        @keydown.enter="selectResult"
        placeholder="Search articles, docs, tutorials..."
        class="w-full max-w-md px-4 py-2.5 pl-10 pr-4 text-sm border rounded-xl transition-all duration-200 bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      />
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          :class="['w-4 h-4 text-gray-400', query ? 'text-gray-600' : '']"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>

    <!-- Search Results Dropdown -->
    <div
      v-if="showResults && results.length > 0"
      class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-50"
    >
      <div class="p-2">
        <div
          v-for="(result, index) in results"
          :key="result.refIndex"
          @click="selectResult(index)"
          @mouseenter="selectedIndex = index"
          @mouseleave="selectedIndex = -1"
          :class="[
            'px-4 py-3 rounded-lg cursor-pointer transition-all duration-200',
            'hover:bg-gray-100 dark:hover:bg-gray-700',
            selectedIndex === index ? 'bg-gray-100 dark:bg-gray-700' : ''
          ]"
        >
          <!-- Result Type Badge -->
          <div class="flex items-center gap-2 mb-1">
            <span
              :class="[
                'inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold',
                getTypeBadge(result.item)
              ]"
            >
              {{ getTypeLabel(result.item) }}
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400">
              {{ formatDate(result.item.date) }}
            </span>
          </div>

          <!-- Result Title -->
          <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
            {{ result.item.title }}
          </h3>

          <!-- Result Description -->
          <p class="text-gray-600 dark:text-gray-400 text-xs mt-1 line-clamp-2">
            {{ result.item.description }}
          </p>

          <!-- Result Tags -->
          <div v-if="result.item.tags && result.item.tags.length > 0" class="flex flex-wrap gap-1 mt-2">
            <span
              v-for="tag in result.item.tags.slice(0, 3)"
              :key="tag"
              class="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Search Match Highlight -->
          <div v-if="result.matches && result.matches.length > 0" class="mt-2 text-xs text-gray-500">
            <span class="font-medium">Found in:</span>
            <span v-for="match in result.matches.slice(0, 2)" :key="match.key" class="ml-1">
              {{ match.key }}
            </span>
          </div>
        </div>
      </div>

      <!-- View All Results -->
      <div class="border-t border-gray-200 dark:border-gray-700 p-2">
        <router-link
          :to="{ path: '/search', query: { q: query } }"
          class="block w-full text-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          View all {{ results.length }} results
        </router-link>
      </div>
    </div>

    <!-- No Results -->
    <div
      v-if="showResults && query && results.length === 0"
      class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50"
    >
      <p class="text-gray-500 dark:text-gray-400 text-sm text-center">
        No results found for "{{ query }}"
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { searchContent, type SearchResult } from '@/utils/search'

const router = useRouter()

const query = ref('')
const showResults = ref(false)
const selectedIndex = ref(-1)
const results = ref<SearchResult[]>([])

// Search delay to prevent excessive API calls
let searchTimeout: NodeJS.Timeout

function handleSearch() {
  clearTimeout(searchTimeout)

  if (query.value.trim().length < 2) {
    results.value = []
    return
  }

  searchTimeout = setTimeout(() => {
    results.value = searchContent(query.value, { limit: 8 })
    showResults.value = true
  }, 300)
}

function selectResult(index?: number) {
  if (typeof index === 'number') {
    selectedIndex.value = index
  }

  if (selectedIndex.value >= 0 && selectedIndex.value < results.value.length) {
    const result = results.value[selectedIndex.value]
    navigateToContent(result.item)
  }

  // Close results after selection
  showResults.value = false
  selectedIndex.value = -1
}

function navigateToContent(content: any) {
  const type = 'tags' in content ? 'blog' : 'docs'
  const slug = content.slug || content.title.toLowerCase().replace(/\s+/g, '-')

  router.push({
    path: `/${type}/${slug}`
  })
}

function navigateResults(direction: 'up' | 'down') {
  if (direction === 'down') {
    selectedIndex.value = Math.min(selectedIndex.value + 1, results.value.length - 1)
  } else {
    selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
  }
}

function getTypeBadge(item: any): string {
  if ('tags' in item) {
    return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
  }
  return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
}

function getTypeLabel(item: any): string {
  if ('tags' in item) {
    return 'Blog'
  }
  return 'Docs'
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return '1 day ago'
  if (diffDays < 30) return `${diffDays} days ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

// Close results when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Element
  const searchBox = target.closest('.relative')

  if (!searchBox) {
    showResults.value = false
  }
}

document.addEventListener('click', handleClickOutside)

// Cleanup
watch(() => query.value, (newVal) => {
  if (!newVal) {
    showResults.value = false
  }
})
</script>