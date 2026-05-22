# AEGIS Treasury Intelligence — Design System

## Design Philosophy

AEGIS follows a terminal-density financial interface philosophy inspired by Bloomberg Terminal, Stripe Treasury, and Ramp. The design prioritizes:

- **Data Density**: Maximum information per pixel without clutter
- **Clarity**: Monospace numerals, consistent alignment, clear hierarchy
- **Dark First**: Graphite black foundation with emerald green accents
- **Speed**: Skeleton-first loading, instant transitions
- **Precision**: Every pixel serves a purpose

---

## Color Palette

### Core Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0a0a0f` | Main background |
| `--bg-secondary` | `#0d0d14` | Sidebar, header, card backgrounds |
| `--bg-tertiary` | `#111118` | Elevated surfaces, hover states |
| `--border` | `#1a1a24` | Borders, dividers, subtle separators |
| `--border-hover` | `#222233` | Hover border states |

### Accent Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--accent-primary` | `#10b981` | Primary actions, active states, positive indicators |
| `--accent-secondary` | `#059669` | Hover states, secondary accents |
| `--accent-muted` | `rgba(16,185,129,0.1)` | Background fills, subtle highlights |
| `--accent-glow` | `rgba(16,185,129,0.08)` | Chart area fills, glow effects |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--success` | `#10b981` | Completed, approved, positive |
| `--warning` | `#f59e0b` | Pending, review needed, caution |
| `--danger` | `#ef4444` | Failed, rejected, critical alerts |
| `--info` | `#3b82f6` | Informational, neutral updates |

### Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#e4e4e7` | Primary content, headings |
| `--text-secondary` | `#a1a1aa` | Secondary content, metadata |
| `--text-tertiary` | `#555` | Placeholder, disabled, hints |
| `--text-accent` | `#10b981` | Accent text, positive values |

---

## Typography

### Font Stack

| Usage | Font | Fallback |
|-------|------|----------|
| **UI Text** | `Geist` | `system-ui, sans-serif` |
| **Monospace** | `Geist Mono` | `monospace` |
| **Numerals** | `Geist Mono` | `monospace` |

### Type Scale

```css
--text-xs:   0.75rem  (12px)  —  labels, metadata
--text-sm:   0.875rem (14px)  —  body, descriptions
--text-base: 1rem     (16px)  —  default body text
--text-lg:   1.125rem (18px)  —  section headings
--text-xl:   1.25rem  (20px)  —  card titles
--text-2xl:  1.5rem   (24px)  —  page headings
--text-3xl:  1.875rem (30px)  —  hero values
```

### Font Weights

| Weight | Usage |
|--------|-------|
| `400` | Body text, descriptions |
| `500` | Medium emphasis, nav items |
| `600` | Semi-bold headings |
| `700` | Bold KPIs, primary values |

---

## Component Patterns

### Cards
- Background: `--bg-tertiary` (`#111118`)
- Border: `--border` (`#1a1a24`), 1px
- Border radius: 12px
- Padding: 24px
- Shadow: none (flat design)
- Hover: border to `--border-hover`

### KPIs (Key Performance Indicators)
- Label: Text tertiary, 10px, uppercase, Geist Mono
- Value: Text primary, 28px, bold, Geist Mono
- Delta: 10px, colored by direction (green = up, yellow = flat, red = down)
- Skeleton: Pulse animation with `--bg-tertiary` base

### Buttons
- Primary: `--accent-primary` background, white text
- Ghost: Transparent, text-primary, hover bg-tertiary
- Sizes: sm (32px), default (40px), lg (48px)
- Border radius: 8px
- Transitions: 150ms ease

### Navigation
- Sidebar: Fixed left, 220px width
- Active item: `--accent-muted` background, `--accent-primary` text
- Inactive: `--text-tertiary`, 12px
- Icon: 16px, left-aligned

### Forms
- Input background: `--bg-primary`
- Border: `--border`, focus: `--accent-primary`
- Border radius: 8px
- Label: 12px, text-secondary

---

## Spacing & Layout

### Grid
- 12-column grid
- Max content width: 1440px
- Sidebar: 220px fixed
- Content padding: 24px

### Spacing Scale
```css
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
```

### Layout Structure
```
┌──────────┬──────────────────────────────────┐
│          │  Header (56px)                    │
│  Sidebar ├──────────────────────────────────┤
│  (220px) │                                   │
│          │  Main Content Area                 │
│  Fixed   │  ┌──────┬──────┬──────┐           │
│          │  │ KPI  │ KPI  │ KPI  │           │
│          │  ├──────┴──────┴──────┤           │
│          │  │ Chart              │  Table    │
│          │  ├────────────────────┴────────── │
│          │  │ Activity Feed                  │
│          └──────────────────────────────────┘
└──────────┴──────────────────────────────────┘
```

---

## Animation Principles

### Motion Tokens
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### Animation Patterns

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Page transitions | Fade + slide up | 300ms | ease-out |
| Card hover | Border color | 150ms | ease-out |
| Skeleton | Pulse opacity | 1500ms | ease-in-out |
| KPI counter | Count up | 800ms | ease-out |
| Chart enter | Path draw | 1000ms | ease-out |
| Sidebar | Slide in | 200ms | ease-out |
| Modal | Scale + fade | 200ms | ease-out |
| Toast | Slide in right | 300ms | ease-out |

### Motion Preferences
- All animations respect `prefers-reduced-motion`
- Framer Motion `useReducedMotion` hook applied globally
- Skeleton animations are CSS-only (no JS motion)

---

## Accessibility

### Standards
- WCAG 2.1 AA minimum
- All interactive elements focusable and operable via keyboard
- ARIA labels on all icon-only buttons
- Color contrast ratios ≥ 4.5:1 for text

### Implementation
- Radix UI primitives provide built-in accessibility
- Focus visible ring: `--accent-primary` 2px offset
- Skip-to-content link for keyboard navigation
- Screen reader announcements for dynamic updates
- All charts include descriptive `aria-label`

### Color
- Never rely solely on color for conveying information
- Semantic indicators always include text labels or icons
- Chart colors are discernible in grayscale

---

## Dark Theme Specifics

AEGIS is dark-only by design. The theme is optimized for:
- Reduced eye strain during extended use
- High contrast ratios for financial data readability
- OLED-friendly true black (`#0a0a0f`) backgrounds
- Consistent luminance across all surfaces

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|-----------|-------|----------------|
| `sm` | 640px | Single column KPIs |
| `md` | 768px | Sidebar collapses to icons |
| `lg` | 1024px | Two-column charts |
| `xl` | 1280px | Full layout |
| `2xl` | 1536px | Max width container |
