<script setup lang="ts">
/**
 * STEP 2: Building a Todo List
 *
 * This demo shows how to build a practical component with:
 * - List rendering with v-for
 * - Form input handling with v-model
 * - Event handling (submit, click)
 * - Conditional rendering with v-if
 * - Array manipulation (push, filter, splice)
 */
import { ref, computed } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

// State
const newTodoText = ref('')
const todos = ref<Todo[]>([
  { id: 1, text: 'Learn Vue 3 fundamentals', completed: true, createdAt: new Date() },
  { id: 2, text: 'Build your first component', completed: false, createdAt: new Date() },
  { id: 3, text: 'Master reactivity system', completed: false, createdAt: new Date() }
])

// Computed properties
const activeCount = computed(() => todos.value.filter(t => !t.completed).length)
const completedCount = computed(() => todos.value.filter(t => t.completed).length)
const allCompleted = computed(() => todos.value.length > 0 && completedCount.value === todos.value.length)

// Methods
function addTodo() {
  if (!newTodoText.value.trim()) return

  todos.value.push({
    id: Date.now(),
    text: newTodoText.value.trim(),
    completed: false,
    createdAt: new Date()
  })

  newTodoText.value = '' // Clear input
}

function toggleTodo(todo: Todo) {
  todo.completed = !todo.completed
}

function deleteTodo(id: number) {
  const index = todos.value.findIndex(t => t.id === id)
  if (index !== -1) {
    todos.value.splice(index, 1)
  }
}

function clearCompleted() {
  todos.value = todos.value.filter(t => !t.completed)
}

function reset() {
  todos.value = [
    { id: 1, text: 'Learn Vue 3 fundamentals', completed: true, createdAt: new Date() },
    { id: 2, text: 'Build your first component', completed: false, createdAt: new Date() },
    { id: 3, text: 'Master reactivity system', completed: false, createdAt: new Date() }
  ]
  newTodoText.value = ''
}

function toggleAll() {
  const targetState = !allCompleted.value
  todos.value.forEach(todo => {
    todo.completed = targetState
  })
}
</script>

<template>
  <div class="demo-card">
    <div class="demo-header">
      <h3 class="demo-title">2. Todo List</h3>
      <button @click="reset" class="reset-btn" title="Reset todos">
        🔄 Reset
      </button>
    </div>

    <div class="demo-content">
      <!-- Stats -->
      <div class="stats-bar">
        <div class="stat">
          <span class="stat-label">Total:</span>
          <span class="stat-value">{{ todos.length }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Active:</span>
          <span class="stat-value active">{{ activeCount }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Done:</span>
          <span class="stat-value completed">{{ completedCount }}</span>
        </div>
      </div>

      <!-- Add Todo Form -->
      <form @submit.prevent="addTodo" class="todo-form">
        <input
          v-model="newTodoText"
          type="text"
          placeholder="What needs to be done?"
          class="todo-input"
        />
        <button type="submit" class="add-btn" :disabled="!newTodoText.trim()">
          ➕ Add
        </button>
      </form>

      <!-- Todo List -->
      <div class="todo-list">
        <div
          v-for="todo in todos"
          :key="todo.id"
          class="todo-item"
          :class="{ completed: todo.completed }"
        >
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(todo)"
            class="todo-checkbox"
          />
          <span class="todo-text">{{ todo.text }}</span>
          <button @click="deleteTodo(todo.id)" class="delete-btn" title="Delete todo">
            🗑️
          </button>
        </div>

        <div v-if="todos.length === 0" class="empty-state">
          <p>No todos yet! Add one above. 📝</p>
        </div>
      </div>

      <!-- Bulk Actions -->
      <div v-if="todos.length > 0" class="bulk-actions">
        <button @click="toggleAll" class="action-btn">
          {{ allCompleted ? '☐ Uncheck All' : '☑ Check All' }}
        </button>
        <button
          v-if="completedCount > 0"
          @click="clearCompleted"
          class="action-btn danger"
        >
          🗑️ Clear Completed
        </button>
      </div>

      <!-- Explanation -->
      <div class="explanation">
        <p><strong>Key concepts demonstrated:</strong></p>
        <ul>
          <li><code>v-model</code> - Two-way binding on the input</li>
          <li><code>v-for</code> - Rendering lists with unique :key</li>
          <li><code>@submit</code> - Form submission handling</li>
          <li><code>v-if</code> - Conditional rendering</li>
          <li><code>computed</code> - Derived reactive state</li>
        </ul>
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
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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
}

.stats-bar {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
}

.stat-label {
  font-weight: 600;
  color: #64748b;
  font-size: 0.875rem;
}

.stat-value {
  font-weight: 800;
  font-size: 1.5rem;
  color: #6366f1;
}

.stat-value.active {
  color: #f59e0b;
}

.stat-value.completed {
  color: #10b981;
}

.todo-form {
  display: flex;
  gap: 12px;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
}

.todo-input {
  flex: 1;
  padding: 14px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.todo-input:focus {
  outline: none;
  border-color: #818cf8;
  box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.1);
}

.add-btn {
  padding: 14px 28px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.add-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.todo-list {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.todo-item:hover {
  border-color: #818cf8;
  background: #fef2f2;
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #94a3b8;
}

.todo-checkbox {
  width: 24px;
  height: 24px;
  cursor: pointer;
  accent-color: #818cf8;
}

.todo-text {
  flex: 1;
  font-size: 1rem;
  color: #1e293b;
}

.delete-btn {
  padding: 8px;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
}

.todo-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  transform: scale(1.2);
}

.empty-state {
  padding: 32px;
  text-align: center;
  color: #94a3b8;
  font-style: italic;
}

.bulk-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  padding: 10px 20px;
  background: #f1f5f9;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  border-color: #818cf8;
  background: #eef2ff;
}

.action-btn.danger:hover {
  border-color: #ef4444;
  background: #fef2f2;
  color: #ef4444;
}

.explanation {
  background: #dbeafe;
  border-left: 4px solid #3b82f6;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.explanation p {
  margin: 0 0 12px 0;
  font-weight: 700;
  color: #1e40af;
}

.explanation ul {
  margin: 0;
  padding-left: 20px;
  color: #1e3a8a;
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
</style>
