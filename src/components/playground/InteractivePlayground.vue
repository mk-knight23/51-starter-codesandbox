<script setup lang="ts">
/**
 * STEP 4: Interactive Playground
 *
 * This is a free-form experimental area where you can:
 * - Test Vue reactivity in real-time
 * - Experiment with different values
 * - See immediate results
 * - Learn by doing!
 */
import { ref, computed, watch } from 'vue'

// Reactive playground values
const text = ref('Hello Vue!')
const number = ref(42)
const slider = ref(50)
const checked = ref(false)
const selectedColor = ref('#6366f1')
const fontSize = ref(16)

// Computed showcase
const reversedText = computed(() => text.value.split('').reverse().join(''))
const wordCount = computed(() => text.value.split(/\s+/).filter(w => w.length > 0).length)
const isSpecialNumber = computed(() => number.value % 7 === 0)

// Watch example
watch(number, (newVal, oldVal) => {
  console.log(`Number changed from ${oldVal} to ${newVal}`)
})

const phrases = ['Vue is fun!', 'Reactivity rocks!', 'Try me out!', 'Playground time!'] as const
const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'] as const

function randomize() {
  text.value = phrases[Math.floor(Math.random() * phrases.length)] || 'Hello Vue!'
  number.value = Math.floor(Math.random() * 100)
  slider.value = Math.floor(Math.random() * 100)
  checked.value = Math.random() > 0.5
  selectedColor.value = colors[Math.floor(Math.random() * colors.length)] || '#6366f1'
  fontSize.value = Math.floor(Math.random() * 24 + 12)
}

function reset() {
  text.value = 'Hello Vue!'
  number.value = 42
  slider.value = 50
  checked.value = false
  selectedColor.value = '#6366f1'
  fontSize.value = 16
}
</script>

<template>
  <div class="demo-card">
    <div class="demo-header">
      <h3 class="demo-title">4. Interactive Playground</h3>
      <button @click="reset" class="reset-btn" title="Reset playground">
        🔄 Reset
      </button>
    </div>

    <div class="demo-content">
      <!-- Live Preview Box -->
      <div class="preview-box" :style="{ backgroundColor: selectedColor, fontSize: `${fontSize}px` }">
        <p class="preview-text">{{ text }}</p>
        <p class="preview-meta">Number: {{ number }} {{ isSpecialNumber ? '✨ Special!' : '' }}</p>
        <p class="preview-meta">Slider: {{ slider }}%</p>
        <p class="preview-meta">Checked: {{ checked ? '☑️' : '☐' }}</p>
      </div>

      <!-- Controls Grid -->
      <div class="controls-grid">
        <!-- Text Input -->
        <div class="control-group">
          <label>Text Input</label>
          <input v-model="text" type="text" class="control-input" placeholder="Type something..." />
          <p class="computed-result">Reversed: {{ reversedText }}</p>
          <p class="computed-result">Words: {{ wordCount }}</p>
        </div>

        <!-- Number Input -->
        <div class="control-group">
          <label>Number Input</label>
          <input v-model.number="number" type="number" class="control-input" />
          <p class="computed-result" :class="{ special: isSpecialNumber }">
            {{ isSpecialNumber ? '✨ Divisible by 7!' : `${number} mod 7 = ${number % 7}` }}
          </p>
        </div>

        <!-- Slider -->
        <div class="control-group">
          <label>Slider: {{ slider }}%</label>
          <input v-model.number="slider" type="range" min="0" max="100" class="control-slider" />
          <div class="slider-bar" :style="{ width: `${slider}%`, backgroundColor: selectedColor }"></div>
        </div>

        <!-- Checkbox -->
        <div class="control-group">
          <label>Checkbox Toggle</label>
          <label class="checkbox-label">
            <input v-model="checked" type="checkbox" class="control-checkbox" />
            <span>{{ checked ? '☑️ Checked!' : '☐ Unchecked' }}</span>
          </label>
        </div>

        <!-- Color Picker -->
        <div class="control-group">
          <label>Color Picker</label>
          <input v-model="selectedColor" type="color" class="control-color" />
          <p class="computed-result">{{ selectedColor }}</p>
        </div>

        <!-- Font Size -->
        <div class="control-group">
          <label>Font Size: {{ fontSize }}px</label>
          <input v-model.number="fontSize" type="range" min="12" max="36" class="control-slider" />
        </div>
      </div>

      <!-- Randomize Button -->
      <button @click="randomize" class="random-btn">
        🎲 Randomize All
      </button>

      <!-- Explanation -->
      <div class="explanation">
        <p><strong>Experiment freely!</strong></p>
        <ul>
          <li>Change any input - the preview updates instantly</li>
          <li><code>v-model</code> creates two-way binding</li>
          <li><code>computed</code> values update automatically</li>
          <li><code>watch</code> lets you react to changes (check console!)</li>
          <li>Everything is reactive - no manual DOM updates needed</li>
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
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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

.preview-box {
  padding: 32px;
  border-radius: 16px;
  text-align: center;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.preview-text {
  font-size: 2em;
  font-weight: 800;
  margin: 0;
}

.preview-meta {
  font-size: 1em;
  margin: 0;
  opacity: 0.9;
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
}

.control-group label {
  font-weight: 700;
  font-size: 0.875rem;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.control-input {
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.control-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.computed-result {
  font-size: 0.875rem;
  color: #64748b;
  font-family: 'Courier New', monospace;
  background: white;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.computed-result.special {
  background: #fef3c7;
  color: #92400e;
  border-color: #f59e0b;
  font-weight: 700;
}

.control-slider {
  width: 100%;
  cursor: pointer;
  accent-color: #6366f1;
}

.slider-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 12px;
  background: white;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  transition: all 0.2s ease;
}

.checkbox-label:hover {
  border-color: #6366f1;
}

.control-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #6366f1;
}

.control-color {
  width: 100%;
  height: 50px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  padding: 4px;
}

.random-btn {
  padding: 16px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: center;
}

.random-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.explanation {
  background: #cffafe;
  border-left: 4px solid #06b6d4;
  padding: 20px;
  border-radius: 8px;
}

.explanation p {
  margin: 0 0 12px 0;
  font-weight: 700;
  color: #0e7490;
}

.explanation ul {
  margin: 0;
  padding-left: 20px;
  color: #155e75;
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
