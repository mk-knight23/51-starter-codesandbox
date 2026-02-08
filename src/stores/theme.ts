import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

type Theme = 'light' | 'dark' | 'auto'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>('auto')
  const isDark = ref(false)

  // Initialize theme from localStorage or system preference
  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') as Theme | null

    if (savedTheme) {
      theme.value = savedTheme
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      theme.value = prefersDark ? 'auto' : 'light'
    }

    updateTheme()
  }

  // Update theme based on current theme value
  function updateTheme() {
    const root = document.documentElement

    if (theme.value === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = prefersDark
      root.classList.toggle('dark', prefersDark)
    } else {
      isDark.value = theme.value === 'dark'
      root.classList.toggle('dark', theme.value === 'dark')
    }
  }

  // Toggle between light and dark
  function toggleTheme() {
    if (theme.value === 'auto') {
      theme.value = isDark.value ? 'light' : 'dark'
    } else {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }
    localStorage.setItem('theme', theme.value)
  }

  // Set specific theme
  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    localStorage.setItem('theme', theme.value)
  }

  // Listen for system theme changes when in auto mode
  function watchSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      if (theme.value === 'auto') {
        updateTheme()
      }
    }

    mediaQuery.addEventListener('change', handleChange)

    // Cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }

  // Initialize on store creation
  initializeTheme()

  // Watch for theme changes
  watch(theme, updateTheme)

  // Return theme methods
  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
    initializeTheme,
    watchSystemTheme,
  }
})