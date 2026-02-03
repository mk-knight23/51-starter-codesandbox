<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProjectsStore } from '../../stores/projects';
import { useAnalyticsStore } from '../../stores/analytics';
import ProjectCard from './ProjectCard.vue';
import TemplateGallery from './TemplateGallery.vue';
import RecentFiles from './RecentFiles.vue';
import AnalyticsPanel from './AnalyticsPanel.vue';
import SearchBar from './SearchBar.vue';
import CollaborationPanel from './CollaborationPanel.vue';

const projectsStore = useProjectsStore();
const analyticsStore = useAnalyticsStore();

const activeTab = ref<'projects' | 'templates' | 'recent' | 'analytics'>('projects');
const showNewProjectModal = ref(false);
const showShareModal = ref(false);
const selectedProject = ref(null);

const tabs = [
  { id: 'projects' as const, label: 'Projects', icon: 'folder' },
  { id: 'templates' as const, label: 'Templates', icon: 'layout' },
  { id: 'recent' as const, label: 'Recent', icon: 'clock' },
  { id: 'analytics' as const, label: 'Analytics', icon: 'bar-chart' }
];

onMounted(() => {
  projectsStore.loadProjects();
  analyticsStore.loadAnalytics();
  analyticsStore.startSession();
});

function openNewProjectModal() {
  showNewProjectModal.value = true;
}

function openShareModal(project: any) {
  selectedProject.value = project;
  showShareModal.value = true;
}

function createNewProject(name: string, templateId: string) {
  projectsStore.createProjectFromTemplate(templateId, name);
  showNewProjectModal.value = false;
  analyticsStore.trackEvent('template_use', undefined, { templateId });
}

function exportProjects() {
  const data = projectsStore.exportProjects();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sandbox-projects-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  analyticsStore.trackEvent('export');
}

function importProjects(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target?.result as string;
    if (projectsStore.importProjects(content)) {
      analyticsStore.trackEvent('import');
    }
  };
  reader.readAsText(file);
}

function exportAnalytics() {
  const data = analyticsStore.exportAnalytics();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sandbox-analytics-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <div class="dashboard">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="header-content">
        <div class="logo-section">
          <span class="logo-emoji">🧪</span>
          <div class="logo-text">
            <h1>CodeSandbox Manager</h1>
            <p class="tagline">Manage your sandbox projects</p>
          </div>
        </div>

        <div class="header-actions">
          <SearchBar />

          <button @click="openNewProjectModal" class="btn btn-primary">
            <span>+</span>
            New Project
          </button>

          <div class="dropdown">
            <button class="btn btn-secondary">⋮</button>
            <div class="dropdown-menu">
              <button @click="exportProjects">Export All</button>
              <label class="dropdown-item">
                Import
                <input type="file" accept=".json" @change="importProjects" hidden />
              </label>
              <button @click="exportAnalytics">Export Analytics</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <nav class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="tab"
          :class="{ active: activeTab === tab.id }"
        >
          <span>{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="dashboard-content">
      <!-- Projects Tab -->
      <div v-if="activeTab === 'projects'" class="tab-content">
        <div class="content-header">
          <h2>My Projects</h2>
          <div class="filters">
            <select v-model="projectsStore.filterStatus">
              <option value="all">All Projects</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div v-if="projectsStore.filteredProjects.length === 0" class="empty-state">
          <span class="empty-icon">📁</span>
          <h3>No projects yet</h3>
          <p>Create your first sandbox project from a template</p>
          <button @click="openNewProjectModal" class="btn btn-primary">
            Create Project
          </button>
        </div>

        <div v-else class="projects-grid">
          <ProjectCard
            v-for="project in projectsStore.filteredProjects"
            :key="project.id"
            :project="project"
            @share="openShareModal"
          />
        </div>
      </div>

      <!-- Templates Tab -->
      <div v-if="activeTab === 'templates'" class="tab-content">
        <div class="content-header">
          <h2>Template Gallery</h2>
        </div>
        <TemplateGallery @select="createNewProject" />
      </div>

      <!-- Recent Tab -->
      <div v-if="activeTab === 'recent'" class="tab-content">
        <div class="content-header">
          <h2>Recent Projects</h2>
        </div>
        <RecentFiles />
      </div>

      <!-- Analytics Tab -->
      <div v-if="activeTab === 'analytics'" class="tab-content">
        <div class="content-header">
          <h2>Analytics</h2>
        </div>
        <AnalyticsPanel />
      </div>
    </main>

    <!-- Modals -->
    <div v-if="showNewProjectModal" class="modal-overlay" @click.self="showNewProjectModal = false">
      <div class="modal">
        <div class="modal-header">
          <h2>Create New Project</h2>
          <button @click="showNewProjectModal = false" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="(e) => {
            const form = e.target as HTMLFormElement;
            const name = (form.elements.namedItem('projectName') as HTMLInputElement).value;
            const template = (form.elements.namedItem('template') as HTMLSelectElement).value;
            createNewProject(name, template);
          }">
            <div class="form-group">
              <label for="projectName">Project Name</label>
              <input
                id="projectName"
                type="text"
                name="projectName"
                placeholder="My Awesome Project"
                required
              />
            </div>

            <div class="form-group">
              <label for="template">Choose Template</label>
              <select id="template" name="template">
                <option
                  v-for="template in projectsStore.templates"
                  :key="template.id"
                  :value="template.id"
                >
                  {{ template.name }} - {{ template.description }}
                </option>
              </select>
            </div>

            <div class="modal-actions">
              <button type="button" @click="showNewProjectModal = false" class="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="showShareModal" class="modal-overlay" @click.self="showShareModal = false">
      <div class="modal">
        <div class="modal-header">
          <h2>Share Project</h2>
          <button @click="showShareModal = false" class="close-btn">×</button>
        </div>
        <CollaborationPanel :project="selectedProject" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Header */
.dashboard-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 3px solid rgba(99, 102, 241, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-emoji {
  font-size: 3rem;
}

.logo-text h1 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tagline {
  margin: 4px 0 0 0;
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 600;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Buttons */
.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.btn-secondary {
  background: #f8fafc;
  color: #64748b;
  border: 2px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #eef2ff;
  border-color: #818cf8;
}

/* Dropdown */
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  display: none;
  flex-direction: column;
  padding: 8px;
}

.dropdown:hover .dropdown-menu {
  display: flex;
}

.dropdown-menu button,
.dropdown-item {
  padding: 12px 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #1e293b;
  transition: background 0.2s;
}

.dropdown-menu button:hover,
.dropdown-item:hover {
  background: #f8fafc;
}

/* Tabs */
.tabs {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  gap: 8px;
  overflow-x: auto;
}

.tab {
  padding: 12px 20px;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  color: #64748b;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.tab:hover {
  color: #6366f1;
}

.tab.active {
  color: #6366f1;
  border-bottom-color: #6366f1;
}

/* Main Content */
.dashboard-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 24px;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.content-header h2 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
}

.filters select {
  padding: 10px 16px;
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.95);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  color: #1e293b;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* Empty State */
.empty-state {
  background: white;
  border-radius: 16px;
  padding: 60px 40px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 20px;
}

.empty-state h3 {
  margin: 0 0 12px 0;
  font-size: 1.5rem;
  color: #1e293b;
}

.empty-state p {
  margin: 0 0 24px 0;
  color: #64748b;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
}

.modal {
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 2px solid #e2e8f0;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #64748b;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background 0.2s;
}

.close-btn:hover {
  background: #f1f5f9;
}

.modal-body {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #1e293b;
  font-size: 0.875rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #6366f1;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: stretch;
  }

  .header-actions {
    flex-wrap: wrap;
  }

  .content-header {
    flex-direction: column;
    align-items: stretch;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
