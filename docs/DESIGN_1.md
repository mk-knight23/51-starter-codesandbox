# Design System | SYSTEM.HUD

## Theme Identity

**Theme Name:** Futuristic / Sci-Fi HUD
**Primary Color:** Cyan (`#00f0ff`)
**Background:** Deep Space (`#030814`)

## Design Principles

1. **Information Density** - HUD interfaces pack information efficiently
2. **Visual Hierarchy** - Primary metrics get glow effects, labels are subdued
3. **Feedback** - All interactions have visual feedback (hover, click states)
4. **Technical Aesthetic** - Monospace fonts, grid lines, status indicators

## Color System

### Primary Palette

```css
--color-hud-cyan: #00f0ff;
--color-hud-cyan-dim: #00a0b0;
--color-hud-blue: #0066ff;
--color-hud-purple: #a855f7;
--color-hud-green: #00ff88;
--color-hud-orange: #ff6b00;
--color-hud-red: #ff3366;
```

### Backgrounds

```css
--color-hud-bg: #030814;
--color-hud-panel: rgba(0, 20, 40, 0.7);
--color-hud-border: rgba(0, 240, 255, 0.2);
--color-hud-grid: rgba(0, 240, 255, 0.05);
```

## Typography

- **Display:** Space Grotesk (headings, large text)
- **Body:** Inter (readable UI text)
- **Data:** JetBrains Mono (metrics, labels, code)

## Effects

### Glassmorphism

All panels use backdrop blur with semi-transparent backgrounds:

```css
.hud-panel {
  backdrop-filter: blur(24px);
  background: rgba(0, 20, 40, 0.7);
  border: 1px solid rgba(0, 240, 255, 0.2);
}
```

### Glow Effects

Text and borders glow using `text-shadow` and `box-shadow`:

```css
.hud-text-glow {
  text-shadow: 0 0 10px currentColor;
}

.hud-border-glow {
  box-shadow: 0 0 15px var(--color-hud-cyan);
}
```

### Scanlines

Animated scanline overlay for retro-futuristic feel:

```css
.hud-scanline::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 240, 255, 0.1) 50%, transparent 100%);
  animation: hud-scan 3s linear infinite;
}
```

## Component Patterns

### Metric Cards

```html
<div class="hud-card">
  <div class="flex items-center justify-between mb-2">
    <Icon class="hud-icon" />
    <span class="hud-label">METRIC NAME</span>
  </div>
  <div class="hud-metric">99.9%</div>
  <div class="hud-progress">
    <div class="hud-progress-bar" style="width: 60%"></div>
  </div>
</div>
```

### Buttons

```html
<button class="hud-button">
  <Icon :size="16" /> ACTION
</button>
```

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Reduced motion preference respected
- Color contrast WCAG AA compliant

## Animations

| Animation | Duration | Usage |
|-----------|----------|-------|
| hud-pulse | 2s | Status indicators |
| hud-scan | 3s | Scanline overlay |
| hud-glitch | 0.3s | Hover interactions |
| hud-blink | 1s | Terminal cursor |
