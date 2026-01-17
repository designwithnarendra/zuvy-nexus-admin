# Neural Nexus Design System - Style Guide

> Comprehensive styling guidelines and design tokens for the Zuvy Nexus Admin application

## Table of Contents

1. [Design System Overview](#design-system-overview)
2. [Color Palette](#color-palette)
3. [Typography System](#typography-system)
4. [Spacing & Layout](#spacing--layout)
5. [Shadows & Elevation](#shadows--elevation)
6. [Border Radius](#border-radius)
7. [Component Patterns](#component-patterns)
8. [Animation Guidelines](#animation-guidelines)
9. [Responsive Design](#responsive-design)
10. [Best Practices](#best-practices)

---

## Design System Overview

The Neural Nexus Design System is built on modern design principles with a focus on:

- **Accessibility First**: WCAG compliant color contrast ratios and semantic design tokens
- **Dark/Light Mode**: Complete dual-theme support with automatic switching
- **Semantic Color System**: HSL-based color tokens that adapt to context
- **Component-Driven Architecture**: Built with shadcn/ui and Radix UI primitives
- **Mobile-First Responsive**: Breakpoint-based design system
- **Micro-Interactions**: Smooth animations that enhance user experience

### Technology Stack
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality accessible components
- **Radix UI**: Unstyled, accessible components
- **Class Variance Authority**: Type-safe component variants
- **next-themes**: Theme switching capabilities

---

## Color Palette

### Base Colors

#### Light Mode
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--background` | `0 0% 100%` | `#FFFFFF` | Primary background color |
| `--foreground` | `222.2 84% 4.9%` | `#0A0E1A` | Primary text color |

#### Dark Mode
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--background` | `222.2 84% 4.9%` | `#0A0E1A` | Primary background color |
| `--foreground` | `210 20% 98%` | `#FAFBFC` | Primary text color |

### Card and Surface Colors

#### Light Mode
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--card` | `224 30% 97%` | `#F4F6F8` | Default card background |
| `--card-light` | `224 25% 98.5%` | `#F8F9FA` | Light card variant |
| `--card-elevated` | `224 40% 95.5%` | `#EEF2F6` | Elevated card background |
| `--card-foreground` | `222.2 84% 4.9%` | `#0A0E1A` | Card text color |

#### Dark Mode
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--card` | `224 15% 7%` | `#0F1419` | Default card background |
| `--card-light` | `224 15% 6%` | `#0D1117` | Light card variant |
| `--card-elevated` | `224 15% 8%` | `#11171C` | Elevated card background |
| `--card-foreground` | `210 20% 98%` | `#FAFBFC` | Card text color |

### Primary Brand Colors

#### Light Mode
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--primary` | `224 71% 56%` | `#4F6DCF` | Primary brand color |
| `--primary-light` | `224 71% 95%` | `#F0F4FE` | Light primary variant |
| `--primary-dark` | `224 71% 36%` | `#2A4494` | Dark primary variant |
| `--primary-foreground` | `210 20% 98%` | `#FAFBFC` | Text on primary background |

#### Dark Mode
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--primary` | `224 75% 65%` | `#6B85E8` | Primary brand color |
| `--primary-light` | `224 71% 20%` | `#1A2759` | Light primary variant |
| `--primary-dark` | `224 71% 48%` | `#3C5BC7` | Dark primary variant |
| `--primary-foreground` | `210 20% 98%` | `#FAFBFC` | Text on primary background |

### Secondary Brand Colors

#### Light Mode
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--secondary` | `25 85% 55%` | `#EA7317` | Secondary brand color |
| `--secondary-light` | `25 85% 95%` | `#FEF7F0` | Light secondary variant |
| `--secondary-dark` | `25 85% 35%` | `#B8530E` | Dark secondary variant |
| `--secondary-foreground` | `210 20% 98%` | `#FAFBFC` | Text on secondary background |

#### Dark Mode
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--secondary` | `25 90% 63%` | `#FF8C3A` | Secondary brand color |
| `--secondary-light` | `25 85% 20%` | `#5C2E0F` | Light secondary variant |
| `--secondary-dark` | `25 85% 47%` | `#D9641C` | Dark secondary variant |
| `--secondary-foreground` | `222.2 84% 4.9%` | `#0A0E1A` | Text on secondary background |

### Accent Colors

#### Light Mode
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--accent` | `198 80% 50%` | `#1ABECC` | Accent color |
| `--accent-light` | `198 80% 95%` | `#F0FCFE` | Light accent variant |
| `--accent-dark` | `198 80% 30%` | `#0F717A` | Dark accent variant |
| `--accent-foreground` | `210 20% 98%` | `#FAFBFC` | Text on accent background |

#### Dark Mode
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--accent` | `198 85% 58%` | `#26D0E0` | Accent color |
| `--accent-light` | `198 80% 20%` | `#0A3D42` | Light accent variant |
| `--accent-dark` | `198 80% 42%` | `#16A0B0` | Dark accent variant |
| `--accent-foreground` | `222.2 84% 4.9%` | `#0A0E1A` | Text on accent background |

### Muted Colors

#### Light Mode
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--muted` | `210 40% 96%` | `#F1F3F5` | Muted background |
| `--muted-light` | `210 40% 98%` | `#F8F9FA` | Light muted variant |
| `--muted-dark` | `210 40% 90%` | `#DEE2E6` | Dark muted variant |
| `--muted-foreground` | `215.4 16.3% 46.9%` | `#6C757D` | Muted text color |

#### Dark Mode
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--muted` | `217.2 32.6% 17.5%` | `#1E2329` | Muted background |
| `--muted-light` | `217.2 32.6% 22.5%` | `#262D35` | Light muted variant |
| `--muted-dark` | `217.2 32.6% 12.5%` | `#151A1E` | Dark muted variant |
| `--muted-foreground` | `215 20.2% 65.1%` | `#8B949E` | Muted text color |

### Semantic Colors

#### Success Colors
**Light Mode**
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--success` | `160 84.1% 39.4%` | `#10B981` | Success state |
| `--success-light` | `160 84.1% 95%` | `#ECFDF5` | Light success variant |
| `--success-dark` | `160 84.1% 19.4%` | `#065F46` | Dark success variant |
| `--success-foreground` | `210 20% 98%` | `#FAFBFC` | Text on success background |

**Dark Mode**
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--success` | `160 84.1% 45%` | `#34D399` | Success state |
| `--success-light` | `160 84.1% 20%` | `#064E3B` | Light success variant |
| `--success-dark` | `160 84.1% 30%` | `#059669` | Dark success variant |
| `--success-foreground` | `222.2 84% 4.9%` | `#0A0E1A` | Text on success background |

#### Warning Colors
**Light Mode**
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--warning` | `45.4 93.4% 47.5%` | `#F59E0B` | Warning state |
| `--warning-light` | `45.4 93.4% 95%` | `#FFFBEB` | Light warning variant |
| `--warning-dark` | `45.4 93.4% 27.5%` | `#92400E` | Dark warning variant |
| `--warning-foreground` | `222.2 84% 4.9%` | `#0A0E1A` | Text on warning background |

**Dark Mode**
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--warning` | `45.4 93.4% 55%` | `#FBBF24` | Warning state |
| `--warning-light` | `45.4 93.4% 20%` | `#451A03` | Light warning variant |
| `--warning-dark` | `45.4 93.4% 40%` | `#D97706` | Dark warning variant |
| `--warning-foreground` | `222.2 84% 4.9%` | `#0A0E1A` | Text on warning background |

#### Destructive Colors
**Light Mode**
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--destructive` | `0 84.2% 60.2%` | `#EF4444` | Destructive/error state |
| `--destructive-light` | `0 84.2% 95%` | `#FEF2F2` | Light destructive variant |
| `--destructive-dark` | `0 84.2% 40.2%` | `#B91C1C` | Dark destructive variant |
| `--destructive-foreground` | `210 20% 98%` | `#FAFBFC` | Text on destructive background |

**Dark Mode**
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--destructive` | `0 62.8% 50%` | `#DC2626` | Destructive/error state |
| `--destructive-light` | `0 62.8% 20%` | `#450A0A` | Light destructive variant |
| `--destructive-dark` | `0 62.8% 35%` | `#991B1B` | Dark destructive variant |
| `--destructive-foreground` | `210 20% 98%` | `#FAFBFC` | Text on destructive background |

#### Info Colors
**Light Mode**
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--info` | `198 80% 50%` | `#1ABECC` | Info state |
| `--info-light` | `198 80% 95%` | `#F0FCFE` | Light info variant |
| `--info-dark` | `198 80% 30%` | `#0F717A` | Dark info variant |
| `--info-foreground` | `210 20% 98%` | `#FAFBFC` | Text on info background |

**Dark Mode**
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--info` | `198 85% 58%` | `#26D0E0` | Info state |
| `--info-light` | `198 80% 20%` | `#0A3D42` | Light info variant |
| `--info-dark` | `198 80% 42%` | `#16A0B0` | Dark info variant |
| `--info-foreground` | `222.2 84% 4.9%` | `#0A0E1A` | Text on info background |

### Border and Input Colors

#### Light Mode
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--border` | `214.3 31.8% 91.4%` | `#E2E8F0` | Default border color |
| `--input` | `214.3 31.8% 91.4%` | `#E2E8F0` | Input border color |
| `--ring` | `224 71% 56%` | `#4F6DCF` | Focus ring color |

#### Dark Mode
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--border` | `217.2 32.6% 17.5%` | `#1E2329` | Default border color |
| `--input` | `217.2 32.6% 17.5%` | `#1E2329` | Input border color |
| `--ring` | `224 75% 65%` | `#6B85E8` | Focus ring color |

### Popover Colors

#### Light Mode
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--popover` | `0 0% 100%` | `#FFFFFF` | Popover background |
| `--popover-foreground` | `222.2 84% 4.9%` | `#0A0E1A` | Popover text color |

#### Dark Mode
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--popover` | `224 15% 7%` | `#0F1419` | Popover background |
| `--popover-foreground` | `210 20% 98%` | `#FAFBFC` | Popover text color |

### Sidebar Colors

#### Light Mode
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--sidebar-background` | `224 30% 97%` | `#F4F6F8` | Sidebar background |
| `--sidebar-foreground` | `222.2 84% 4.9%` | `#0A0E1A` | Sidebar text |
| `--sidebar-primary` | `224 71% 56%` | `#4F6DCF` | Sidebar primary color |
| `--sidebar-primary-foreground` | `210 20% 98%` | `#FAFBFC` | Sidebar primary text |
| `--sidebar-accent` | `224 25% 98.5%` | `#F8F9FA` | Sidebar accent |
| `--sidebar-accent-foreground` | `222.2 84% 4.9%` | `#0A0E1A` | Sidebar accent text |
| `--sidebar-border` | `214.3 31.8% 91.4%` | `#E2E8F0` | Sidebar border |
| `--sidebar-ring` | `224 71% 56%` | `#4F6DCF` | Sidebar focus ring |

#### Dark Mode
| Token | HSL | HEX | Usage |
|-------|-----|-----|-------|
| `--sidebar-background` | `224 15% 7%` | `#0F1419` | Sidebar background |
| `--sidebar-foreground` | `210 20% 98%` | `#FAFBFC` | Sidebar text |
| `--sidebar-primary` | `224 75% 65%` | `#6B85E8` | Sidebar primary color |
| `--sidebar-primary-foreground` | `210 20% 98%` | `#FAFBFC` | Sidebar primary text |
| `--sidebar-accent` | `224 15% 8%` | `#11171C` | Sidebar accent |
| `--sidebar-accent-foreground` | `210 20% 98%` | `#FAFBFC` | Sidebar accent text |
| `--sidebar-border` | `217.2 32.6% 17.5%` | `#1E2329` | Sidebar border |
| `--sidebar-ring` | `224 75% 65%` | `#6B85E8` | Sidebar focus ring |

---

## Typography System

### Font Families

```css
font-family: {
  'heading': ['Outfit', 'sans-serif'],
  'body': ['Manrope', 'sans-serif'], 
  'mono': ['Fira Code', 'monospace'],
}
```

### Font Loading
Fonts are loaded via Google Fonts with optimized display settings:
```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&family=Manrope:wght@200;300;400;500;600;700;800&family=Fira+Code:wght@300;400;500;600;700&display=swap');
```

### Typography Hierarchy

| Element | Font Family | Font Size | Line Height | Font Weight | Usage |
|---------|-------------|-----------|-------------|-------------|-------|
| `h1` | Outfit | `text-6xl` (3.75rem) | `leading-tight` | `font-heading` | Page titles |
| `h2` | Outfit | `text-4xl` (2.25rem) | `leading-tight` | `font-heading` | Section headers |
| `h3` | Outfit | `text-3xl` (1.875rem) | `leading-tight` | `font-heading` | Subsection headers |
| `h4` | Outfit | `text-2xl` (1.5rem) | `leading-tight` | `font-heading` | Component titles |
| `h5` | Outfit | `text-xl` (1.25rem) | `leading-tight` | `font-heading` | Small headers |
| `h6` | Outfit | `text-lg` (1.125rem) | `leading-tight` | `font-heading` | Minor headers |
| `body` | Manrope | `text-base` (1rem) | `leading-relaxed` | `font-body` | Body text |
| `code` | Fira Code | `inherit` | `inherit` | `font-mono` | Code snippets |

### Responsive Typography

On mobile devices (max-width: 768px):
- `h1`: `text-5xl` (3rem)
- `h2`: `text-4xl` (2.25rem) 
- Body font size: 16px

### Typography Classes

```css
.text-display-1 { @apply text-6xl font-heading leading-tight; }
.text-display-2 { @apply text-5xl font-heading leading-tight; }
.text-headline-1 { @apply text-4xl font-heading leading-tight; }
.text-headline-2 { @apply text-3xl font-heading leading-tight; }
.text-title-1 { @apply text-2xl font-heading leading-tight; }
.text-title-2 { @apply text-xl font-heading leading-tight; }
.text-body-1 { @apply text-base font-body leading-relaxed; }
.text-body-2 { @apply text-sm font-body leading-relaxed; }
.text-caption { @apply text-xs font-body leading-normal; }
.text-code { @apply font-mono text-sm; }
```

---

## Spacing & Layout

### Spacing Scale

The spacing system uses a consistent scale based on `rem` units:

| Token | Value | Pixels (16px base) |
|-------|-------|--------------------|
| `spacing-1` | `0.25rem` | 4px |
| `spacing-2` | `0.5rem` | 8px |
| `spacing-4` | `1rem` | 16px |
| `spacing-6` | `1.5rem` | 24px (default) |
| `spacing-8` | `2rem` | 32px |
| `spacing-10` | `2.5rem` | 40px |
| `spacing-12` | `3rem` | 48px |
| `spacing-16` | `4rem` | 64px |
| `spacing-20` | `5rem` | 80px |
| `spacing-24` | `6rem` | 96px |

### Container System

```css
.container {
  center: true,
  padding: '2rem',
  screens: {
    '2xl': '1400px'
  }
}
```

### Grid Patterns

Common responsive grid patterns found in the codebase:

```css
/* 1-2-3 Column Grid */
.grid-responsive-1-2-3 {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4;
}

/* 1-2 Column Grid */
.grid-responsive-1-2 {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6;
}

/* 4-8 Column Tabs Grid */
.grid-tabs {
  @apply grid grid-cols-4 md:grid-cols-8;
}
```

### Layout Utilities

```css
/* Common spacing patterns */
.section-spacing { @apply py-12 px-6; }
.card-padding { @apply p-6; }
.card-content-spacing { @apply p-6 pt-0; }
.header-spacing { @apply space-y-1.5 p-6; }
```

---

## Shadows & Elevation

The Neural Nexus Design System uses a custom shadow system with brand-colored shadows for depth perception:

### Shadow Utilities

| Class | Box Shadow | Usage |
|-------|------------|-------|
| `.shadow-2dp` | `0 1px 3px 0 rgba(79, 109, 207, 0.1), 0 1px 2px 0 rgba(79, 109, 207, 0.06)` | Subtle elevation |
| `.shadow-4dp` | `0 2px 4px -1px rgba(79, 109, 207, 0.1), 0 1px 2px -1px rgba(79, 109, 207, 0.06)` | Light cards |
| `.shadow-8dp` | `0 4px 6px -1px rgba(79, 109, 207, 0.1), 0 2px 4px -2px rgba(79, 109, 207, 0.1)` | Elevated cards |
| `.shadow-16dp` | `0 10px 15px -3px rgba(79, 109, 207, 0.1), 0 4px 6px -4px rgba(79, 109, 207, 0.1)` | Modal/dropdown |
| `.shadow-24dp` | `0 20px 25px -5px rgba(79, 109, 207, 0.1), 0 8px 10px -6px rgba(79, 109, 207, 0.1)` | High elevation |
| `.shadow-32dp` | `0 25px 50px -12px rgba(79, 109, 207, 0.25)` | Maximum elevation |

### Interactive Shadows

| Class | Box Shadow | Usage |
|-------|------------|-------|
| `.shadow-hover` | `0 8px 25px -8px rgba(79, 109, 207, 0.15)` | Hover states |
| `.shadow-focus` | `0 0 0 2px rgba(79, 109, 207, 0.2)` | Focus states |
| `.shadow-pressed` | `0 1px 3px 0 rgba(79, 109, 207, 0.2)` | Active/pressed states |

### Default Component Shadows

- **Cards**: `shadow-sm` (Tailwind default) or `shadow-2dp` (custom)
- **Buttons**: No shadow by default, `shadow-hover` on hover
- **Modals/Dialogs**: `shadow-24dp`
- **Dropdowns/Popovers**: `shadow-16dp`
- **Tooltips**: `shadow-8dp`

---

## Border Radius

### Radius Scale

```css
--radius: 0.5rem; /* 8px */

borderRadius: {
  lg: 'var(--radius)',     /* 8px */
  md: 'calc(var(--radius) - 2px)', /* 6px */
  sm: 'calc(var(--radius) - 4px)', /* 4px */
}
```

### Usage Guidelines

- **Cards**: `rounded-lg` (8px)
- **Buttons**: `rounded-md` (6px)
- **Inputs**: `rounded-md` (6px)
- **Badges**: `rounded-full`
- **Small UI elements**: `rounded-sm` (4px)

---

## Component Patterns

### Button Variants

```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    }
  }
)
```

### Badge Variants

```typescript
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      }
    }
  }
)
```

### Card Structure

```css
.card {
  @apply rounded-lg border bg-card text-card-foreground shadow-sm;
}

.card-header {
  @apply flex flex-col space-y-1.5 p-6;
}

.card-title {
  @apply text-2xl font-semibold leading-none tracking-tight;
}

.card-description {
  @apply text-sm text-muted-foreground;
}

.card-content {
  @apply p-6 pt-0;
}

.card-footer {
  @apply flex items-center p-6 pt-0;
}
```

### Input Styling

```css
.input {
  @apply flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm;
}
```

### Table Styling

```css
.table {
  @apply w-full caption-bottom text-sm;
}

.table-header {
  @apply [&_tr]:border-b;
}

.table-body {
  @apply [&_tr:last-child]:border-0;
}

.table-row {
  @apply border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted;
}

.table-head {
  @apply h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0;
}

.table-cell {
  @apply p-4 align-middle [&:has([role=checkbox])]:pr-0;
}
```

---

## Animation Guidelines

### Keyframes

```css
@keyframes accordion-down {
  from { height: 0 }
  to { height: var(--radix-accordion-content-height) }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height) }
  to { height: 0 }
}

@keyframes fade-in {
  0% { opacity: 0; transform: translateY(10px) }
  100% { opacity: 1; transform: translateY(0) }
}

@keyframes scale-in {
  0% { transform: scale(0.95); opacity: 0 }
  100% { transform: scale(1); opacity: 1 }
}
```

### Animations

```css
animation: {
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out', 
  'fade-in': 'fade-in 0.3s ease-out',
  'scale-in': 'scale-in 0.2s ease-out'
}
```

### Transition Guidelines

- **Duration**: 0.2s for micro-interactions, 0.3s for larger movements
- **Easing**: `ease-out` for most interactions
- **Properties**: Focus on `opacity`, `transform`, `background-color`, and `border-color`
- **Performance**: Use `transform` and `opacity` for smooth 60fps animations

### Common Transition Classes

```css
.transition-smooth { @apply transition-all duration-200 ease-out; }
.transition-colors { @apply transition-colors duration-200 ease-out; }
.transition-transform { @apply transition-transform duration-200 ease-out; }
.transition-fade { @apply transition-opacity duration-300 ease-out; }
```

---

## Responsive Design

### Breakpoint System

The system uses Tailwind's default breakpoints with mobile-first approach:

| Prefix | Min Width | Target |
|--------|-----------|---------|
| `sm:` | `640px` | Small tablets |
| `md:` | `768px` | Tablets |
| `lg:` | `1024px` | Laptops |
| `xl:` | `1280px` | Desktops |
| `2xl:` | `1536px` | Large screens |

### Container Responsive Behavior

```css
.container {
  max-width: 100%;
  padding: 2rem;
  margin: 0 auto;
}

@media (min-width: 1536px) {
  .container {
    max-width: 1400px;
  }
}
```

### Common Responsive Patterns

#### Grid Layouts
```css
/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */
.responsive-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4;
}

/* Mobile: 1 column, Desktop: 2 columns */
.responsive-grid-2 {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6;
}
```

#### Flex Layouts
```css
/* Stack on mobile, row on desktop */
.responsive-flex {
  @apply flex flex-col md:flex-row gap-6;
}
```

#### Typography Scaling
```css
/* Responsive heading sizes */
.responsive-heading {
  @apply text-3xl md:text-4xl lg:text-5xl;
}
```

#### Hide/Show Elements
```css
/* Hide on mobile */
.desktop-only {
  @apply hidden md:block;
}

/* Show only on mobile */
.mobile-only {
  @apply block md:hidden;
}

/* Responsive text */
.responsive-text {
  @apply hidden sm:inline; /* Hide text on mobile, show on sm+ */
}
```

---

## Best Practices

### Color Usage

1. **Semantic Colors**: Always use semantic color tokens (`primary`, `secondary`, `success`, etc.) instead of direct color values
2. **Contrast Ratios**: Ensure WCAG AA compliance with 4.5:1 contrast ratio for normal text, 3:1 for large text
3. **Dark Mode**: Test all color combinations in both light and dark themes
4. **Opacity Variants**: Use `/90`, `/80`, `/50` opacity variants for hover and disabled states

### Typography

1. **Heading Hierarchy**: Use proper heading hierarchy (h1 → h6) for accessibility
2. **Font Loading**: Use `font-display: swap` for better performance
3. **Line Length**: Keep line length between 45-75 characters for optimal readability
4. **Font Weights**: Stick to defined font weights in the design system

### Spacing

1. **Consistent Scale**: Always use spacing tokens from the defined scale
2. **Optical Alignment**: Consider optical alignment for visual elements
3. **Touch Targets**: Ensure minimum 44px touch targets on mobile
4. **Whitespace**: Use generous whitespace to create visual hierarchy

### Components

1. **Composition**: Use composition over inheritance for component patterns
2. **Variants**: Use `class-variance-authority` for type-safe component variants
3. **Accessibility**: Include proper ARIA labels and keyboard navigation
4. **Performance**: Use `React.forwardRef` for proper ref forwarding

### Responsive Design

1. **Mobile First**: Design for mobile first, then enhance for larger screens
2. **Touch Interactions**: Consider touch-friendly interactions and gestures
3. **Content Strategy**: Prioritize content for smaller screens
4. **Performance**: Optimize for mobile network conditions

### Development

1. **CSS Utilities**: Prefer Tailwind utilities over custom CSS when possible
2. **Component Reuse**: Extract reusable patterns into shared components
3. **Type Safety**: Use TypeScript for component props and variants
4. **Testing**: Test components across different screen sizes and themes

### Accessibility

1. **Color Independence**: Don't rely solely on color to convey information
2. **Focus Management**: Ensure proper focus management in interactive elements
3. **Screen Readers**: Test with screen readers and provide appropriate labels
4. **Motion**: Respect `prefers-reduced-motion` user preferences

---

## Implementation Examples

### Using Color Tokens

```tsx
// ✅ Good - Using semantic color tokens
<div className="bg-primary text-primary-foreground">
<div className="bg-card border border-border">
<span className="text-muted-foreground">

// ❌ Bad - Using arbitrary colors
<div className="bg-blue-500 text-white">
<div className="bg-gray-100 border border-gray-200">
```

### Responsive Components

```tsx
// ✅ Good - Mobile-first responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<h1 className="text-3xl md:text-4xl lg:text-5xl font-heading">
<div className="flex flex-col md:flex-row gap-4">
```

### Component Variants

```tsx
// ✅ Good - Using defined variants
<Button variant="primary" size="lg">
<Badge variant="destructive">
<Card className="shadow-2dp">

// ❌ Bad - Custom styling
<button className="bg-blue-500 hover:bg-blue-600 px-8 py-3">
```

### Animation Usage

```tsx
// ✅ Good - Using defined animations
<div className="animate-fade-in">
<div className="transition-smooth hover:shadow-hover">

// ❌ Bad - Custom animations without consideration
<div className="transition-all duration-1000">
```

---

*This style guide is a living document that should be updated as the design system evolves. For questions or contributions, please refer to the team's design system documentation or create an issue in the project repository.*