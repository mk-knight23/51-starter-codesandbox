<script setup lang="ts">
import { X, Moon, Sun, Monitor, Volume2, Zap, RotateCcw, Download } from 'lucide-vue-next';
import { useSettingsStore, type ThemeMode } from '../../stores/settings';
import { useStatsStore } from '../../stores/stats';
import { audioService } from '../../composables/useAudio';

const settingsStore = useSettingsStore();
const statsStore = useStatsStore();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const themes: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor }
];

function selectTheme(theme: ThemeMode): void {
  audioService.playToggle();
  settingsStore.setTheme(theme);
  statsStore.recordThemeSwitch();
}

function toggleSound(): void {
  audioService.playClick();
  settingsStore.toggleSound();
}

function toggleAnimations(): void {
  audioService.playClick();
  settingsStore.toggleAnimations();
}

function close(): void {
  audioService.playClick();
  emit('close');
}

function exportData(): void {
  const data = {
    settings: settingsStore.exportSettings(),
    stats: statsStore.exportStats(),
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sandbox-export.json';
  a.click();
  URL.revokeObjectURL(url);
  audioService.playToggle();
}

function resetAll(): void {
  if (confirm('Reset all settings and statistics?')) {
    settingsStore.resetSettings();
    statsStore.resetStats();
    audioService.playToggle();
  }
}
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close"></div>

    <div
      class="relative w-full max-w-lg bg-dev-bg border border-dev-border rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
      :class="settingsStore.isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'"
    >
      <div class="flex items-center justify-between px-8 py-6 border-b border-dev-border" :class="settingsStore.isDarkMode ? 'border-slate-800' : 'border-slate-200'">
        <h2 class="text-xl font-display font-black uppercase tracking-tight" :class="settingsStore.isDarkMode ? 'text-white' : 'text-slate-900'">
          Settings
        </h2>
        <button
          @click="close"
          class="p-2 rounded-xl transition-colors"
          :class="settingsStore.isDarkMode ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-100 text-slate-500'"
          aria-label="Close settings"
        >
          <X :size="20" />
        </button>
      </div>

      <div class="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
        <div class="space-y-4">
          <label class="text-xs font-black uppercase tracking-widest transition-colors" :class="settingsStore.isDarkMode ? 'text-slate-500' : 'text-slate-400'">
            Theme
          </label>
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="theme in themes"
              :key="theme.value"
              @click="selectTheme(theme.value)"
              class="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all"
               :class="[
                 settingsStore.theme === theme.value
                   ? 'border-dev-primary bg-dev-primary/10'
                   : 'border-dev-border hover:border-dev-primary/50',
                 settingsStore.isDarkMode ? '' : 'bg-white'
               ]"
             >
              <component :is="theme.icon" :size="24" class="transition-colors" :class="settingsStore.theme === theme.value ? 'text-dev-primary' : 'text-slate-400'" />
              <span class="text-xs font-bold uppercase tracking-wide transition-colors" :class="settingsStore.theme === theme.value ? 'text-dev-primary' : 'text-slate-500'">
                {{ theme.label }}
              </span>
            </button>
          </div>
        </div>

        <div class="space-y-4">
          <label class="text-xs font-black uppercase tracking-widest transition-colors" :class="settingsStore.isDarkMode ? 'text-slate-500' : 'text-slate-400'">
            Preferences
          </label>
          <div class="space-y-3">
            <div class="flex items-center justify-between p-4 rounded-2xl border border-dev-border" :class="settingsStore.isDarkMode ? 'bg-white/5' : 'bg-slate-50'">
              <div class="flex items-center gap-4">
                <div class="p-2 rounded-xl" :class="settingsStore.isDarkMode ? 'bg-white/10' : 'bg-slate-200'">
                  <Volume2 :size="20" class="transition-colors" :class="settingsStore.isDarkMode ? 'text-slate-400' : 'text-slate-500'" />
                </div>
                <div>
                  <p class="font-bold text-sm uppercase tracking-wide transition-colors" :class="settingsStore.isDarkMode ? 'text-white' : 'text-slate-900'">Sound Effects</p>
                  <p class="text-xs transition-colors" :class="settingsStore.isDarkMode ? 'text-slate-500' : 'text-slate-400'">Enable audio feedback</p>
                </div>
              </div>
              <button
                @click="toggleSound"
                class="relative w-14 h-7 rounded-full transition-colors"
                :class="settingsStore.soundEnabled ? 'bg-dev-primary' : 'bg-slate-600'"
              >
                <span
                  class="absolute top-1 w-5 h-5 rounded-full bg-white transition-transform"
                  :class="settingsStore.soundEnabled ? 'translate-x-7' : 'translate-x-1'"
                ></span>
              </button>
            </div>

            <div class="flex items-center justify-between p-4 rounded-2xl border border-dev-border" :class="settingsStore.isDarkMode ? 'bg-white/5' : 'bg-slate-50'">
              <div class="flex items-center gap-4">
                <div class="p-2 rounded-xl" :class="settingsStore.isDarkMode ? 'bg-white/10' : 'bg-slate-200'">
                  <Zap :size="20" class="transition-colors" :class="settingsStore.isDarkMode ? 'text-slate-400' : 'text-slate-500'" />
                </div>
                <div>
                  <p class="font-bold text-sm uppercase tracking-wide transition-colors" :class="settingsStore.isDarkMode ? 'text-white' : 'text-slate-900'">Animations</p>
                  <p class="text-xs transition-colors" :class="settingsStore.isDarkMode ? 'text-slate-500' : 'text-slate-400'">Enable transitions</p>
                </div>
              </div>
              <button
                @click="toggleAnimations"
                class="relative w-14 h-7 rounded-full transition-colors"
                :class="settingsStore.animationsEnabled ? 'bg-dev-primary' : 'bg-slate-600'"
              >
                <span
                  class="absolute top-1 w-5 h-5 rounded-full bg-white transition-transform"
                  :class="settingsStore.animationsEnabled ? 'translate-x-7' : 'translate-x-1'"
                ></span>
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <label class="text-xs font-black uppercase tracking-widest transition-colors" :class="settingsStore.isDarkMode ? 'text-slate-500' : 'text-slate-400'">
            Statistics
          </label>
          <div class="grid grid-cols-2 gap-3">
            <div class="p-4 rounded-2xl border border-dev-border" :class="settingsStore.isDarkMode ? 'bg-white/5' : 'bg-slate-50'">
              <p class="text-2xl font-black uppercase tracking-tight" :class="settingsStore.isDarkMode ? 'text-white' : 'text-slate-900'">{{ statsStore.statsSummary.totalVisits }}</p>
              <p class="text-[10px] font-black uppercase tracking-widest transition-colors" :class="settingsStore.isDarkMode ? 'text-slate-500' : 'text-slate-400'">Visits</p>
            </div>
            <div class="p-4 rounded-2xl border border-dev-border" :class="settingsStore.isDarkMode ? 'bg-white/5' : 'bg-slate-50'">
              <p class="text-2xl font-black uppercase tracking-tight" :class="settingsStore.isDarkMode ? 'text-white' : 'text-slate-900'">{{ statsStore.statsSummary.totalClicks }}</p>
              <p class="text-[10px] font-black uppercase tracking-widest transition-colors" :class="settingsStore.isDarkMode ? 'text-slate-500' : 'text-slate-400'">Clicks</p>
            </div>
            <div class="p-4 rounded-2xl border border-dev-border" :class="settingsStore.isDarkMode ? 'bg-white/5' : 'bg-slate-50'">
              <p class="text-2xl font-black uppercase tracking-tight" :class="settingsStore.isDarkMode ? 'text-white' : 'text-slate-900'">{{ statsStore.statsSummary.themeSwitches }}</p>
              <p class="text-[10px] font-black uppercase tracking-widest transition-colors" :class="settingsStore.isDarkMode ? 'text-slate-500' : 'text-slate-400'">Theme Switches</p>
            </div>
            <div class="p-4 rounded-2xl border border-dev-border" :class="settingsStore.isDarkMode ? 'bg-white/5' : 'bg-slate-50'">
              <p class="text-2xl font-black uppercase tracking-tight" :class="settingsStore.isDarkMode ? 'text-white' : 'text-slate-900'">{{ statsStore.statsSummary.shortcutsUsed }}</p>
              <p class="text-[10px] font-black uppercase tracking-widest transition-colors" :class="settingsStore.isDarkMode ? 'text-slate-500' : 'text-slate-400'">Shortcuts</p>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button
            @click="exportData"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border border-dev-border hover:border-dev-primary"
            :class="settingsStore.isDarkMode ? 'bg-white/5 hover:bg-dev-primary/10 text-white' : 'bg-slate-50 hover:bg-dev-primary/5 text-slate-900'"
          >
            <Download :size="16" />
            Export
          </button>
          <button
            @click="resetAll"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border border-dev-border hover:border-red-500 hover:text-red-500"
            :class="settingsStore.isDarkMode ? 'bg-white/5 hover:bg-red-500/10' : 'bg-slate-50 hover:bg-red-50'"
          >
            <RotateCcw :size="16" />
            Reset
          </button>
        </div>
      </div>

      <div class="px-8 py-4 border-t border-dev-border text-center" :class="settingsStore.isDarkMode ? 'border-slate-800' : 'border-slate-200'">
        <p class="text-[10px] font-black uppercase tracking-widest transition-colors" :class="settingsStore.isDarkMode ? 'text-slate-600' : 'text-slate-400'">
          Keyboard Shortcuts: <kbd class="mx-1 px-2 py-0.5 text-xs font-mono bg-slate-200 dark:bg-slate-700 rounded">Ctrl+K</kbd> Theme <kbd class="mx-1 px-2 py-0.5 text-xs font-mono bg-slate-200 dark:bg-slate-700 rounded">Ctrl+S</kbd> Settings <kbd class="mx-1 px-2 py-0.5 text-xs font-mono bg-slate-200 dark:bg-slate-700 rounded">Esc</kbd> Close
        </p>
      </div>
    </div>
  </div>
</template>
