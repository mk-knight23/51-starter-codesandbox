import { useThemeStore } from '@/stores/theme'

export function useTheme() {
  const themeStore = useThemeStore()

  // Toggle between light and dark themes
  const toggleTheme = () => {
    themeStore.toggleTheme()
  }

  // Set a specific theme
  const setTheme = (theme: 'light' | 'dark' | 'auto') => {
    themeStore.setTheme(theme)
  }

  // Get current theme
  const theme = themeStore.theme
  const isDark = themeStore.isDark

  // Subscribe to system theme changes
  const watchSystemTheme = themeStore.watchSystemTheme

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
    watchSystemTheme,
  }
}