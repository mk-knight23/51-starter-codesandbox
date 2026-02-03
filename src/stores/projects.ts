import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { STORAGE_KEYS } from '../utils/constants';

const isBrowser = typeof window !== 'undefined';

export interface SandboxProject {
  id: string;
  name: string;
  description: string;
  tags: string[];
  code: string;
  template: string;
  createdAt: string;
  updatedAt: string;
  lastAccessed: string;
  status: 'active' | 'archived' | 'deleted';
  thumbnail?: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  code: string;
  tags: string[];
  thumbnail?: string;
}

const DEFAULT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'vue3-basic',
    name: 'Vue 3 Basic',
    description: 'Simple Vue 3 setup with reactive state',
    category: 'Vue',
    tags: ['vue', 'basic', 'beginner'],
    code: `<script setup>
import { ref } from 'vue'

const count = ref(0)
function increment() {
  count.value++
}
</script>

<template>
  <div>
    <h1>Vue 3 Counter</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>`
  },
  {
    id: 'vue3-todo',
    name: 'Vue 3 Todo List',
    description: 'Todo list with v-for and v-model',
    category: 'Vue',
    tags: ['vue', 'todo', 'intermediate'],
    code: `<script setup>
import { ref } from 'vue'

const todos = ref([])
const newTodo = ref('')

function addTodo() {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value,
      completed: false
    })
    newTodo.value = ''
  }
}

function removeTodo(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}

function toggleTodo(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.completed = !todo.completed
}
</script>

<template>
  <div>
    <h1>Todo List</h1>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Add a todo..." />
      <button type="submit">Add</button>
    </form>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
        />
        <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
          {{ todo.text }}
        </span>
        <button @click="removeTodo(todo.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>`
  },
  {
    id: 'react-basic',
    name: 'React Basic',
    description: 'Simple React counter with hooks',
    category: 'React',
    tags: ['react', 'hooks', 'beginner'],
    code: `import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>React Counter</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

export default App`
  },
  {
    id: 'vanilla-js',
    name: 'Vanilla JavaScript',
    description: 'Pure JavaScript counter',
    category: 'JavaScript',
    tags: ['javascript', 'vanilla', 'beginner'],
    code: `<!DOCTYPE html>
<html>
<head>
  <title>Vanilla JS Counter</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 400px;
      margin: 50px auto;
      text-align: center;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Vanilla JS Counter</h1>
  <p>Count: <span id="count">0</span></p>
  <button id="increment">Increment</button>

  <script>
    let count = 0
    const countElement = document.getElementById('count')
    const button = document.getElementById('increment')

    button.addEventListener('click', () => {
      count++
      countElement.textContent = count
    })
  </script>
</body>
</html>`
  }
];

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<SandboxProject[]>([]);
  const templates = ref<ProjectTemplate[]>(DEFAULT_TEMPLATES);
  const currentProject = ref<SandboxProject | null>(null);
  const searchQuery = ref('');
  const selectedTags = ref<string[]>([]);
  const filterStatus = ref<'all' | 'active' | 'archived'>('all');

  // Computed properties
  const activeProjects = computed(() =>
    projects.value.filter(p => p.status === 'active')
  );

  const archivedProjects = computed(() =>
    projects.value.filter(p => p.status === 'archived')
  );

  const filteredProjects = computed(() => {
    let filtered = projects.value;

    // Status filter
    if (filterStatus.value !== 'all') {
      filtered = filtered.filter(p => p.status === filterStatus.value);
    }

    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Tags filter
    if (selectedTags.value.length > 0) {
      filtered = filtered.filter(p =>
        selectedTags.value.every(tag => p.tags.includes(tag))
      );
    }

    // Sort by last accessed
    return filtered.sort((a, b) =>
      new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
    );
  });

  const recentProjects = computed(() =>
    [...filteredProjects.value]
      .sort((a, b) =>
        new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
      )
      .slice(0, 10)
  );

  const allTags = computed(() => {
    const tagSet = new Set<string>();
    projects.value.forEach(p => p.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  });

  // Actions
  function loadProjects(): void {
    if (!isBrowser) return;
    const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (stored) {
      try {
        projects.value = JSON.parse(stored);
      } catch {
        projects.value = [];
      }
    }
  }

  function createProject(data: Partial<SandboxProject>): SandboxProject {
    const now = new Date().toISOString();
    const project: SandboxProject = {
      id: `project-${Date.now()}`,
      name: data.name || 'Untitled Project',
      description: data.description || '',
      tags: data.tags || [],
      code: data.code || '',
      template: data.template || 'vue3-basic',
      createdAt: now,
      updatedAt: now,
      lastAccessed: now,
      status: 'active'
    };
    projects.value.push(project);
    return project;
  }

  function updateProject(id: string, data: Partial<SandboxProject>): boolean {
    const index = projects.value.findIndex(p => p.id === id);
    if (index === -1) return false;

    projects.value[index] = {
      ...projects.value[index],
      ...data,
      updatedAt: new Date().toISOString(),
      lastAccessed: new Date().toISOString()
    };
    return true;
  }

  function deleteProject(id: string): boolean {
    const index = projects.value.findIndex(p => p.id === id);
    if (index === -1) return false;

    projects.value.splice(index, 1);
    if (currentProject.value?.id === id) {
      currentProject.value = null;
    }
    return true;
  }

  function archiveProject(id: string): boolean {
    return updateProject(id, { status: 'archived' });
  }

  function unarchiveProject(id: string): boolean {
    return updateProject(id, { status: 'active' });
  }

  function duplicateProject(id: string): SandboxProject | null {
    const project = projects.value.find(p => p.id === id);
    if (!project) return null;

    const now = new Date().toISOString();
    const duplicate: SandboxProject = {
      ...project,
      id: `project-${Date.now()}`,
      name: `${project.name} (Copy)`,
      createdAt: now,
      updatedAt: now,
      lastAccessed: now
    };
    projects.value.push(duplicate);
    return duplicate;
  }

  function setCurrentProject(project: SandboxProject | null): void {
    currentProject.value = project;
    if (project) {
      updateProject(project.id, { lastAccessed: new Date().toISOString() });
    }
  }

  function saveTemplate(template: ProjectTemplate): void {
    const index = templates.value.findIndex(t => t.id === template.id);
    if (index >= 0) {
      templates.value[index] = template;
    } else {
      templates.value.push(template);
    }
  }

  function deleteTemplate(id: string): boolean {
    const index = templates.value.findIndex(t => t.id === id);
    if (index === -1) return false;
    templates.value.splice(index, 1);
    return true;
  }

  function createProjectFromTemplate(templateId: string, name: string): SandboxProject | null {
    const template = templates.value.find(t => t.id === templateId);
    if (!template) return null;

    return createProject({
      name,
      description: template.description,
      tags: [...template.tags],
      code: template.code,
      template: template.id
    });
  }

  function setSearchQuery(query: string): void {
    searchQuery.value = query;
  }

  function setSelectedTags(tags: string[]): void {
    selectedTags.value = tags;
  }

  function toggleTag(tag: string): void {
    const index = selectedTags.value.indexOf(tag);
    if (index >= 0) {
      selectedTags.value.splice(index, 1);
    } else {
      selectedTags.value.push(tag);
    }
  }

  function setFilterStatus(status: 'all' | 'active' | 'archived'): void {
    filterStatus.value = status;
  }

  function exportProjects(): string {
    return JSON.stringify({
      projects: projects.value,
      templates: templates.value,
      exportedAt: new Date().toISOString()
    }, null, 2);
  }

  function importProjects(data: string): boolean {
    try {
      const parsed = JSON.parse(data);
      if (parsed.projects && Array.isArray(parsed.projects)) {
        projects.value = parsed.projects;
      }
      if (parsed.templates && Array.isArray(parsed.templates)) {
        templates.value = [...DEFAULT_TEMPLATES, ...parsed.templates];
      }
      return true;
    } catch {
      return false;
    }
  }

  function generateShareLink(projectId: string): string {
    if (!isBrowser) return '';
    const url = new URL(window.location.href);
    url.searchParams.set('project', projectId);
    return url.toString();
  }

  function loadProjectFromShare(): SandboxProject | null {
    if (!isBrowser) return null;
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('project');
    if (!projectId) return null;

    return projects.value.find(p => p.id === projectId) || null;
  }

  // Persist to localStorage
  watch(projects, () => {
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects.value));
  }, { deep: true });

  watch(templates, () => {
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates.value));
  }, { deep: true });

  return {
    projects,
    templates,
    currentProject,
    searchQuery,
    selectedTags,
    filterStatus,
    activeProjects,
    archivedProjects,
    filteredProjects,
    recentProjects,
    allTags,
    loadProjects,
    createProject,
    updateProject,
    deleteProject,
    archiveProject,
    unarchiveProject,
    duplicateProject,
    setCurrentProject,
    saveTemplate,
    deleteTemplate,
    createProjectFromTemplate,
    setSearchQuery,
    setSelectedTags,
    toggleTag,
    setFilterStatus,
    exportProjects,
    importProjects,
    generateShareLink,
    loadProjectFromShare
  };
});
