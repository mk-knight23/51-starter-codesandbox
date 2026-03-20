# Add New Playground Demo

This workflow adds a new interactive demo component to the playground.

## Steps

1. **Create the demo component**
   - Location: `src/components/playground/YourDemo.vue`
   - Follow the existing demo structure
   - Add detailed comments explaining concepts
   - Include a reset button

2. **Add to App.vue**
   - Import the component
   - Add to the `steps` array
   - Include step number, title, and gradient color

3. **Add step-specific tip**
   - Add a `<div v-if="currentStep === X">` in the tips section
   - Include key concept explanation

4. **Test thoroughly**
   - Verify reset functionality
   - Check all interactive elements
   - Ensure accessibility

## Component Template

```vue
<script setup lang="ts">
/**
 * STEP X: [Title]
 *
 * [Detailed description of what this demo teaches]
 */
import { ref } from 'vue'

// State here

function reset() {
  // Reset to initial state
}
</script>

<template>
  <div class="demo-card">
    <div class="demo-header">
      <h3 class="demo-title">X. [Title]</h3>
      <button @click="reset" class="reset-btn">🔄 Reset</button>
    </div>

    <div class="demo-content">
      <!-- Demo content here -->
    </div>
  </div>
</template>

<style scoped>
/* Demo styles here */
</style>
```

## Best Practices

- Keep demos focused on ONE concept
- Add plenty of code comments
- Include "Try this" explanations
- Make it interactive and fun
- Always provide reset functionality
- Use colorful, engaging styling
