<script setup lang="ts">
import { ref } from 'vue'
import { Search } from 'lucide-vue-next'

const query = ref('')
const emit = defineEmits<{
  (e: 'search', query: string): void
}>()

function handleSearch() {
  emit('search', query.value)
}
</script>

<template>
  <div class="relative">
    <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
    <input
      v-model="query"
      @keyup.enter="handleSearch"
      type="text"
      placeholder="Search projects..."
      class="input pl-10"
    />
  </div>
</template>
