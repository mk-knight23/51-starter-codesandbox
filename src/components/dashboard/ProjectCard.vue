<script setup lang="ts">
import { computed } from 'vue';
import { useProjectsStore } from '../../stores/projects';
import { useAnalyticsStore } from '../../stores/analytics';

interface Props {
  project: {
    id: string;
    name: string;
    description: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    lastAccessed: string;
    status: string;
  };
}

const props = defineProps<Props>();
const emit = defineEmits(['share', 'edit', 'delete', 'archive']);

const projectsStore = useProjectsStore();
const analyticsStore = useAnalyticsStore();

const lastAccessed = computed(() => {
  const date = new Date(props.project.lastAccessed);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
});

function handleShare() {
  const link = projectsStore.generateShareLink(props.project.id);
  navigator.clipboard.writeText(link);
  analyticsStore.trackEvent('share', props.project.id);
  emit('share', props.project);
}

function handleEdit() {
  projectsStore.setCurrentProject(props.project);
  analyticsStore.startSession(props.project.id);
  emit('edit', props.project);
}

function handleDelete() {
  if (confirm(`Delete "${props.project.name}"?`)) {
    projectsStore.deleteProject(props.project.id);
    emit('delete', props.project);
  }
}

function handleArchive() {
  if (props.project.status === 'archived') {
    projectsStore.unarchiveProject(props.project.id);
  } else {
    projectsStore.archiveProject(props.project.id);
  }
  emit('archive', props.project);
}

function handleDuplicate() {
  projectsStore.duplicateProject(props.project.id);
  analyticsStore.trackEvent('save', props.project.id, { action: 'duplicate' });
}
</script>

<template>
  <div class="project-card">
    <div class="card-header">
      <div class="project-icon">📦</div>
      <div class="card-actions">
        <button @click="handleShare" class="icon-btn" title="Share">
          🔗
        </button>
        <button @click="handleDuplicate" class="icon-btn" title="Duplicate">
          📋
        </button>
        <button @click="handleArchive" class="icon-btn" :title="project.status === 'archived' ? 'Unarchive' : 'Archive'">
          {{ project.status === 'archived' ? '📤' : '📥' }}
        </button>
        <button @click="handleDelete" class="icon-btn danger" title="Delete">
          🗑️
        </button>
      </div>
    </div>

    <div class="card-body">
      <h3 class="project-name">{{ project.name }}</h3>
      <p class="project-description">{{ project.description || 'No description' }}</p>

      <div class="project-tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>

      <div class="project-meta">
        <span class="meta-item">🕒 {{ lastAccessed }}</span>
        <span class="meta-item">
          {{ project.status === 'archived' ? '📁 Archived' : '✅ Active' }}
        </span>
      </div>
    </div>

    <div class="card-footer">
      <button @click="handleEdit" class="btn-edit">
        Open Project
      </button>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.project-icon {
  font-size: 1.5rem;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.icon-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.icon-btn.danger:hover {
  background: rgba(239, 68, 68, 0.3);
}

.card-body {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
}

.project-description {
  margin: 0;
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 10px;
  background: #eef2ff;
  color: #6366f1;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.project-meta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: auto;
}

.meta-item {
  font-size: 0.75rem;
  color: #94a3b8;
}

.card-footer {
  padding: 12px 16px;
  border-top: 2px solid #f1f5f9;
}

.btn-edit {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-edit:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}
</style>
