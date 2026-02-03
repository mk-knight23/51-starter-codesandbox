import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { STORAGE_KEYS } from '../utils/constants';

const isBrowser = typeof window !== 'undefined';

export type ThemeMode = 'light' | 'dark' | 'system';

interface EditorSettings {
  fontSize: number;
  tabSize: number;
  autoSave: boolean;
  autoSaveDelay: number;
  lineNumbers: boolean;
  wordWrap: boolean;
  codeTheme: 'light' | 'dark' | 'monokai' | 'dracula';
  minimap: boolean;
  autoComplete: boolean;
}

interface SettingsState {
  theme: ThemeMode;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  reducedMotion: boolean;
  showHelp: boolean;
  editor: EditorSettings;
}

const DEFAULT_EDITOR_SETTINGS: EditorSettings = {
  fontSize: 14,
  tabSize: 2,
  autoSave: true,
  autoSaveDelay: 2000,
  lineNumbers: true,
  wordWrap: true,
  codeTheme: 'dark',
  minimap: true,
  autoComplete: true
};

const DEFAULT_SETTINGS: SettingsState = {
  theme: 'system',
  soundEnabled: true,
  animationsEnabled: true,
  reducedMotion: false,
  showHelp: false,
  editor: DEFAULT_EDITOR_SETTINGS
};

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref<ThemeMode>(DEFAULT_SETTINGS.theme);
  const soundEnabled = ref(DEFAULT_SETTINGS.soundEnabled);
  const animationsEnabled = ref(DEFAULT_SETTINGS.animationsEnabled);
  const reducedMotion = ref(DEFAULT_SETTINGS.reducedMotion);
  const showHelp = ref(DEFAULT_SETTINGS.showHelp);

  // Editor settings
  const editorFontSize = ref(DEFAULT_EDITOR_SETTINGS.fontSize);
  const editorTabSize = ref(DEFAULT_EDITOR_SETTINGS.tabSize);
  const editorAutoSave = ref(DEFAULT_EDITOR_SETTINGS.autoSave);
  const editorAutoSaveDelay = ref(DEFAULT_EDITOR_SETTINGS.autoSaveDelay);
  const editorLineNumbers = ref(DEFAULT_EDITOR_SETTINGS.lineNumbers);
  const editorWordWrap = ref(DEFAULT_EDITOR_SETTINGS.wordWrap);
  const editorCodeTheme = ref<'light' | 'dark' | 'monokai' | 'dracula'>(DEFAULT_EDITOR_SETTINGS.codeTheme);
  const editorMinimap = ref(DEFAULT_EDITOR_SETTINGS.minimap);
  const editorAutoComplete = ref(DEFAULT_EDITOR_SETTINGS.autoComplete);

  const isDarkMode = computed(() => {
    if (theme.value === 'system' && isBrowser) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return theme.value === 'dark';
  });

  const themeLabel = computed(() => {
    return theme.value.charAt(0).toUpperCase() + theme.value.slice(1);
  });

  function loadSettings(): void {
    if (!isBrowser) return;
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        theme.value = parsed.theme ?? DEFAULT_SETTINGS.theme;
        soundEnabled.value = parsed.soundEnabled ?? DEFAULT_SETTINGS.soundEnabled;
        animationsEnabled.value = parsed.animationsEnabled ?? DEFAULT_SETTINGS.animationsEnabled;
        reducedMotion.value = parsed.reducedMotion ?? DEFAULT_SETTINGS.reducedMotion;
        showHelp.value = parsed.showHelp ?? DEFAULT_SETTINGS.showHelp;

        // Load editor settings
        if (parsed.editor) {
          editorFontSize.value = parsed.editor.fontSize ?? DEFAULT_EDITOR_SETTINGS.fontSize;
          editorTabSize.value = parsed.editor.tabSize ?? DEFAULT_EDITOR_SETTINGS.tabSize;
          editorAutoSave.value = parsed.editor.autoSave ?? DEFAULT_EDITOR_SETTINGS.autoSave;
          editorAutoSaveDelay.value = parsed.editor.autoSaveDelay ?? DEFAULT_EDITOR_SETTINGS.autoSaveDelay;
          editorLineNumbers.value = parsed.editor.lineNumbers ?? DEFAULT_EDITOR_SETTINGS.lineNumbers;
          editorWordWrap.value = parsed.editor.wordWrap ?? DEFAULT_EDITOR_SETTINGS.wordWrap;
          editorCodeTheme.value = parsed.editor.codeTheme ?? DEFAULT_EDITOR_SETTINGS.codeTheme;
          editorMinimap.value = parsed.editor.minimap ?? DEFAULT_EDITOR_SETTINGS.minimap;
          editorAutoComplete.value = parsed.editor.autoComplete ?? DEFAULT_EDITOR_SETTINGS.autoComplete;
        }
      } catch {
        resetSettings();
      }
    }
    updateColorScheme();
  }

  function setTheme(newTheme: ThemeMode): void {
    theme.value = newTheme;
    updateColorScheme();
  }

  function toggleTheme(): void {
    const themeOrder: Record<ThemeMode, ThemeMode> = {
      light: 'dark',
      dark: 'system',
      system: 'light'
    };
    setTheme(themeOrder[theme.value]);
  }

  function setSoundEnabled(enabled: boolean): void {
    soundEnabled.value = enabled;
  }

  function toggleSound(): void {
    soundEnabled.value = !soundEnabled.value;
  }

  function setAnimationsEnabled(enabled: boolean): void {
    animationsEnabled.value = enabled;
    if (!enabled && isBrowser) {
      document.documentElement.classList.add('reduce-motion');
    } else if (isBrowser) {
      document.documentElement.classList.remove('reduce-motion');
    }
  }

  function toggleAnimations(): void {
    setAnimationsEnabled(!animationsEnabled.value);
  }

  function toggleHelp(): void {
    showHelp.value = !showHelp.value;
  }

  function hideHelp(): void {
    showHelp.value = false;
  }

  function updateColorScheme(): void {
    if (!isBrowser) return;
    document.documentElement.classList.toggle('dark', isDarkMode.value);
    document.documentElement.classList.toggle('light', !isDarkMode.value);
    if (reducedMotion.value) {
      document.documentElement.classList.add('reduce-motion');
    }
  }

  function exportSettings(): string {
    return JSON.stringify({
      theme: theme.value,
      soundEnabled: soundEnabled.value,
      animationsEnabled: animationsEnabled.value,
      reducedMotion: reducedMotion.value,
      showHelp: showHelp.value,
      editor: {
        fontSize: editorFontSize.value,
        tabSize: editorTabSize.value,
        autoSave: editorAutoSave.value,
        autoSaveDelay: editorAutoSaveDelay.value,
        lineNumbers: editorLineNumbers.value,
        wordWrap: editorWordWrap.value,
        codeTheme: editorCodeTheme.value,
        minimap: editorMinimap.value,
        autoComplete: editorAutoComplete.value
      }
    }, null, 2);
  }

  function resetSettings(): void {
    theme.value = DEFAULT_SETTINGS.theme;
    soundEnabled.value = DEFAULT_SETTINGS.soundEnabled;
    animationsEnabled.value = DEFAULT_SETTINGS.animationsEnabled;
    reducedMotion.value = DEFAULT_SETTINGS.reducedMotion;
    showHelp.value = DEFAULT_SETTINGS.showHelp;

    // Reset editor settings
    editorFontSize.value = DEFAULT_EDITOR_SETTINGS.fontSize;
    editorTabSize.value = DEFAULT_EDITOR_SETTINGS.tabSize;
    editorAutoSave.value = DEFAULT_EDITOR_SETTINGS.autoSave;
    editorAutoSaveDelay.value = DEFAULT_EDITOR_SETTINGS.autoSaveDelay;
    editorLineNumbers.value = DEFAULT_EDITOR_SETTINGS.lineNumbers;
    editorWordWrap.value = DEFAULT_EDITOR_SETTINGS.wordWrap;
    editorCodeTheme.value = DEFAULT_EDITOR_SETTINGS.codeTheme;
    editorMinimap.value = DEFAULT_EDITOR_SETTINGS.minimap;
    editorAutoComplete.value = DEFAULT_EDITOR_SETTINGS.autoComplete;

    updateColorScheme();
  }

  watch([theme, soundEnabled, animationsEnabled, reducedMotion, showHelp,
         editorFontSize, editorTabSize, editorAutoSave, editorAutoSaveDelay,
         editorLineNumbers, editorWordWrap, editorCodeTheme, editorMinimap, editorAutoComplete], () => {
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
      theme: theme.value,
      soundEnabled: soundEnabled.value,
      animationsEnabled: animationsEnabled.value,
      reducedMotion: reducedMotion.value,
      showHelp: showHelp.value,
      editor: {
        fontSize: editorFontSize.value,
        tabSize: editorTabSize.value,
        autoSave: editorAutoSave.value,
        autoSaveDelay: editorAutoSaveDelay.value,
        lineNumbers: editorLineNumbers.value,
        wordWrap: editorWordWrap.value,
        codeTheme: editorCodeTheme.value,
        minimap: editorMinimap.value,
        autoComplete: editorAutoComplete.value
      }
    }));
  });

  return {
    theme,
    soundEnabled,
    animationsEnabled,
    reducedMotion,
    showHelp,
    editorFontSize,
    editorTabSize,
    editorAutoSave,
    editorAutoSaveDelay,
    editorLineNumbers,
    editorWordWrap,
    editorCodeTheme,
    editorMinimap,
    editorAutoComplete,
    isDarkMode,
    themeLabel,
    loadSettings,
    setTheme,
    toggleTheme,
    setSoundEnabled,
    toggleSound,
    setAnimationsEnabled,
    toggleAnimations,
    toggleHelp,
    hideHelp,
    updateColorScheme,
    exportSettings,
    resetSettings
  };
});
