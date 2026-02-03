import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { STORAGE_KEYS } from '../utils/constants';

const isBrowser = typeof window !== 'undefined';

export interface AnalyticsEvent {
  id: string;
  type: 'run' | 'error' | 'save' | 'export' | 'import' | 'share' | 'template_use';
  projectId?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface ProjectAnalytics {
  projectId: string;
  projectName: string;
  totalTimeMs: number;
  runs: number;
  errors: number;
  saves: number;
  exports: number;
  imports: number;
  shares: number;
  lastAccessed: string;
  firstAccessed: string;
}

export interface DailyStats {
  date: string;
  totalTimeMs: number;
  runs: number;
  errors: number;
  projectsAccessed: number;
}

// Initial analytics state template (for reference)
// const INITIAL_ANALYTICS = {
//   events: [],
//   projectAnalytics: {},
//   dailyStats: {}
// };

export const useAnalyticsStore = defineStore('analytics', () => {
  const events = ref<AnalyticsEvent[]>([]);
  const projectAnalytics = ref<Record<string, ProjectAnalytics>>({});
  const dailyStats = ref<Record<string, DailyStats>>({});
  const currentSessionStart = ref<string>(new Date().toISOString());
  const currentProjectId = ref<string | null>(null);

  // Computed properties
  const totalEvents = computed(() => events.value.length);

  const totalRuns = computed(() =>
    events.value.filter(e => e.type === 'run').length
  );

  const totalErrors = computed(() =>
    events.value.filter(e => e.type === 'error').length
  );

  const totalTimeMs = computed(() => {
    const now = new Date();
    const sessionStart = new Date(currentSessionStart.value);
    return now.getTime() - sessionStart.getTime();
  });

  const todaysStats = computed(() => {
    const today = new Date().toISOString().split('T')[0];
    return dailyStats.value[today] || {
      date: today,
      totalTimeMs: 0,
      runs: 0,
      errors: 0,
      projectsAccessed: 0
    };
  });

  const weeklyStats = computed(() => {
    const stats: DailyStats[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      stats.push(
        dailyStats.value[dateStr] || {
          date: dateStr,
          totalTimeMs: 0,
          runs: 0,
          errors: 0,
          projectsAccessed: 0
        }
      );
    }

    return stats;
  });

  const topProjects = computed(() => {
    return Object.values(projectAnalytics.value)
      .sort((a, b) => b.totalTimeMs - a.totalTimeMs)
      .slice(0, 10);
  });

  const recentEvents = computed(() => {
    return [...events.value]
      .sort((a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 50);
  });

  const errorRate = computed(() => {
    const runs = totalRuns.value;
    const errors = totalErrors.value;
    return runs > 0 ? (errors / runs) * 100 : 0;
  });

  // Actions
  function loadAnalytics(): void {
    if (!isBrowser) return;
    const stored = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        events.value = parsed.events || [];
        projectAnalytics.value = parsed.projectAnalytics || {};
        dailyStats.value = parsed.dailyStats || {};
      } catch {
        resetAnalytics();
      }
    }
    currentSessionStart.value = new Date().toISOString();
  }

  function trackEvent(
    type: AnalyticsEvent['type'],
    projectId?: string,
    metadata?: Record<string, unknown>
  ): void {
    const event: AnalyticsEvent = {
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      projectId,
      timestamp: new Date().toISOString(),
      metadata
    };

    events.value.push(event);

    // Update project analytics
    if (projectId) {
      updateProjectAnalytics(projectId, type);
    }

    // Update daily stats
    updateDailyStats(type);
  }

  function updateProjectAnalytics(projectId: string, eventType: AnalyticsEvent['type']): void {
    if (!projectAnalytics.value[projectId]) {
      projectAnalytics.value[projectId] = {
        projectId,
        projectName: 'Unknown Project',
        totalTimeMs: 0,
        runs: 0,
        errors: 0,
        saves: 0,
        exports: 0,
        imports: 0,
        shares: 0,
        lastAccessed: new Date().toISOString(),
        firstAccessed: new Date().toISOString()
      };
    }

    const analytics = projectAnalytics.value[projectId];
    analytics.lastAccessed = new Date().toISOString();

    switch (eventType) {
      case 'run':
        analytics.runs++;
        break;
      case 'error':
        analytics.errors++;
        break;
      case 'save':
        analytics.saves++;
        break;
      case 'export':
        analytics.exports++;
        break;
      case 'import':
        analytics.imports++;
        break;
      case 'share':
        analytics.shares++;
        break;
    }
  }

  function updateDailyStats(eventType: AnalyticsEvent['type']): void {
    const today = new Date().toISOString().split('T')[0];

    if (!dailyStats.value[today]) {
      dailyStats.value[today] = {
        date: today,
        totalTimeMs: 0,
        runs: 0,
        errors: 0,
        projectsAccessed: 0
      };
    }

    const stats = dailyStats.value[today];

    switch (eventType) {
      case 'run':
        stats.runs++;
        break;
      case 'error':
        stats.errors++;
        break;
    }
  }

  function startSession(projectId?: string): void {
    currentSessionStart.value = new Date().toISOString();
    currentProjectId.value = projectId || null;

    if (projectId) {
      if (!projectAnalytics.value[projectId]) {
        projectAnalytics.value[projectId] = {
          projectId,
          projectName: 'Unknown Project',
          totalTimeMs: 0,
          runs: 0,
          errors: 0,
          saves: 0,
          exports: 0,
          imports: 0,
          shares: 0,
          lastAccessed: new Date().toISOString(),
          firstAccessed: new Date().toISOString()
        };
      }

      if (currentProjectId.value) {
        const today = new Date().toISOString().split('T')[0];
        if (!dailyStats.value[today]) {
          dailyStats.value[today] = {
            date: today,
            totalTimeMs: 0,
            runs: 0,
            errors: 0,
            projectsAccessed: 0
          };
        }
        dailyStats.value[today].projectsAccessed++;
      }
    }
  }

  function endSession(): void {
    if (currentProjectId.value) {
      const sessionTime = totalTimeMs.value;
      projectAnalytics.value[currentProjectId.value].totalTimeMs += sessionTime;

      const today = new Date().toISOString().split('T')[0];
      if (dailyStats.value[today]) {
        dailyStats.value[today].totalTimeMs += sessionTime;
      }
    }

    currentSessionStart.value = new Date().toISOString();
    currentProjectId.value = null;
  }

  function updateProjectName(projectId: string, name: string): void {
    if (projectAnalytics.value[projectId]) {
      projectAnalytics.value[projectId].projectName = name;
    }
  }

  function getProjectAnalytics(projectId: string): ProjectAnalytics | null {
    return projectAnalytics.value[projectId] || null;
  }

  function getEventsByProject(projectId: string): AnalyticsEvent[] {
    return events.value.filter(e => e.projectId === projectId);
  }

  function getEventsByType(type: AnalyticsEvent['type']): AnalyticsEvent[] {
    return events.value.filter(e => e.type === type);
  }

  function getEventsInRange(startDate: Date, endDate: Date): AnalyticsEvent[] {
    const start = startDate.getTime();
    const end = endDate.getTime();

    return events.value.filter(e => {
      const timestamp = new Date(e.timestamp).getTime();
      return timestamp >= start && timestamp <= end;
    });
  }

  function exportAnalytics(): string {
    return JSON.stringify({
      events: events.value,
      projectAnalytics: projectAnalytics.value,
      dailyStats: dailyStats.value,
      exportedAt: new Date().toISOString()
    }, null, 2);
  }

  function importAnalytics(data: string): boolean {
    try {
      const parsed = JSON.parse(data);
      if (parsed.events && Array.isArray(parsed.events)) {
        events.value = parsed.events;
      }
      if (parsed.projectAnalytics) {
        projectAnalytics.value = parsed.projectAnalytics;
      }
      if (parsed.dailyStats) {
        dailyStats.value = parsed.dailyStats;
      }
      return true;
    } catch {
      return false;
    }
  }

  function clearEvents(olderThanDays?: number): void {
    if (!olderThanDays) {
      events.value = [];
      return;
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

    events.value = events.value.filter(e => {
      const eventDate = new Date(e.timestamp);
      return eventDate >= cutoffDate;
    });
  }

  function resetAnalytics(): void {
    events.value = [];
    projectAnalytics.value = {};
    dailyStats.value = {};
    currentSessionStart.value = new Date().toISOString();
    currentProjectId.value = null;
  }

  // Persist to localStorage
  watch([events, projectAnalytics, dailyStats], () => {
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify({
      events: events.value.slice(-1000), // Keep last 1000 events
      projectAnalytics: projectAnalytics.value,
      dailyStats: dailyStats.value
    }));
  }, { deep: true });

  return {
    events,
    projectAnalytics,
    dailyStats,
    currentSessionStart,
    currentProjectId,
    totalEvents,
    totalRuns,
    totalErrors,
    totalTimeMs,
    todaysStats,
    weeklyStats,
    topProjects,
    recentEvents,
    errorRate,
    loadAnalytics,
    trackEvent,
    startSession,
    endSession,
    updateProjectName,
    getProjectAnalytics,
    getEventsByProject,
    getEventsByType,
    getEventsInRange,
    exportAnalytics,
    importAnalytics,
    clearEvents,
    resetAnalytics
  };
});
