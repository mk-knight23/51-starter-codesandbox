<script setup lang="ts">
/**
 * STEP 3: State Management with Pinia
 *
 * This demo shows how to use Pinia stores for global state management.
 * Stores are perfect for:
 * - User preferences (theme, language)
 * - Authentication state
 * - Shopping cart
 * - Any state shared across components
 */
import { useSettingsStore } from '../../stores/settings'

// Access the Pinia store
const settingsStore = useSettingsStore()

function toggleTheme() {
  settingsStore.toggleTheme()
}

function setTheme(theme: 'light' | 'dark' | 'system') {
  settingsStore.setTheme(theme)
}

function reset() {
  settingsStore.resetSettings()
}
</script>

<template>
  <div class="demo-card">
    <div class="demo-header">
      <h3 class="demo-title">3. Theme Switcher (Pinia)</h3>
      <button @click="reset" class="reset-btn" title="Reset theme settings">
        🔄 Reset
      </button>
    </div>

    <div class="demo-content">
      <!-- Current Theme Display -->
      <div class="theme-display" :class="settingsStore.isDarkMode ? 'dark' : 'light'">
        <div class="theme-icon">
          {{ settingsStore.isDarkMode ? '🌙' : '☀️' }}
        </div>
        <p class="theme-text">
          Current mode: <strong>{{ settingsStore.themeLabel }}</strong>
        </p>
        <p class="theme-hint">
          {{ settingsStore.isDarkMode ? 'Dark mode active' : 'Light mode active' }}
        </p>
      </div>

      <!-- Theme Options -->
      <div class="theme-options">
        <button
          @click="setTheme('light')"
          class="theme-btn"
          :class="{ active: settingsStore.theme === 'light' }"
        >
          <span class="btn-icon">☀️</span>
          <span class="btn-text">Light</span>
        </button>

        <button
          @click="setTheme('dark')"
          class="theme-btn"
          :class="{ active: settingsStore.theme === 'dark' }"
        >
          <span class="btn-icon">🌙</span>
          <span class="btn-text">Dark</span>
        </button>

        <button
          @click="setTheme('system')"
          class="theme-btn"
          :class="{ active: settingsStore.theme === 'system' }"
        >
          <span class="btn-icon">💻</span>
          <span class="btn-text">System</span>
        </button>
      </div>

      <!-- Quick Toggle -->
      <button @click="toggleTheme" class="toggle-btn">
        🎨 Quick Toggle ({{ settingsStore.theme }})
      </button>

      <!-- Explanation -->
      <div class="explanation">
        <p><strong>How Pinia works here:</strong></p>
        <ol>
          <li><code>useSettingsStore()</code> - Access the store (can be used anywhere)</li>
          <li><code>settingsStore.theme</code> - Access state (reactive)</li>
          <li><code>settingsStore.setTheme()</code> - Call actions to modify state</li>
          <li>Changes automatically persist to localStorage</li>
          <li>State is shared across ALL components</li>
        </ol>
        <p class="tip">
          💡 Pro tip: Open browser DevTools → Application → Local Storage to see persisted data!
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 2px solid #e0e7ff;
  transition: all 0.3s ease;
}

.demo-card:hover {
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.2);
  border-color: #818cf8;
}

.demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.demo-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
}

.reset-btn {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.demo-content {
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}

.theme-display {
  padding: 32px 48px;
  border-radius: 16px;
  text-align: center;
  min-width: 280px;
  transition: all 0.3s ease;
}

.theme-display.light {
  background: linear-gradient(135deg, #fef9c3 0%, #fef08a 100%);
  border: 4px solid #facc15;
  color: #854d0e;
}

.theme-display.dark {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 4px solid #334155;
  color: #f1f5f9;
}

.theme-icon {
  font-size: 4rem;
  margin-bottom: 16px;
}

.theme-text {
  font-size: 1.25rem;
  margin: 0 0 8px 0;
}

.theme-hint {
  font-size: 0.875rem;
  margin: 0;
  opacity: 0.8;
}

.theme-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.theme-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 32px;
  background: #f8fafc;
  border: 3px solid #e2e8f0;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.theme-btn:hover {
  border-color: #818cf8;
  background: #eef2ff;
  transform: translateY(-4px);
}

.theme-btn.active {
  border-color: #6366f1;
  background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.btn-icon {
  font-size: 2rem;
}

.btn-text {
  font-weight: 700;
  font-size: 0.875rem;
  color: #1e293b;
  text-transform: uppercase;
}

.toggle-btn {
  padding: 14px 28px;
  background: linear-gradient(135deg, #ec4899 0%, #f97316 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
}

.explanation {
  background: #fce7f3;
  border-left: 4px solid #ec4899;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
}

.explanation p {
  margin: 0 0 12px 0;
  font-weight: 700;
  color: #9d174d;
}

.explanation ol {
  margin: 0 0 12px 0;
  padding-left: 20px;
  color: #831843;
}

.explanation li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.explanation code {
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.explanation .tip {
  background: rgba(255, 255, 255, 0.5);
  padding: 12px;
  border-radius: 8px;
  margin: 0;
  font-size: 0.9em;
}
</style>
