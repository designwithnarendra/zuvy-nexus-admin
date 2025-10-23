# Zuvy Nexus Admin - Style Guide

## Design Philosophy

Zuvy Nexus Admin employs a **clean, professional, and accessible design system** that prioritizes clarity, hierarchy, and usability. The design balances visual appeal with functional efficiency, creating an interface that educators can use confidently for hours without fatigue.

---

## Typography

### Font Families

```css
--font-heading: 'Rajdhani', sans-serif;    /* Bold, modern, geometric */
--font-body: 'Sentient', sans-serif;       /* Readable, friendly, approachable */
--font-mono: 'JetBrains Mono', monospace;  /* Code and technical content */
```

**Usage:**
- **Rajdhani** - All headings (h1-h6), emphasizes hierarchy and structure
- **Sentient** - Body text, labels, descriptions - optimized for readability
- **JetBrains Mono** - Code snippets, technical content, monospace needs

### Type Scale

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| **h1** | 5.5rem (88px) | 700 | 1.3 | Page titles, hero sections |
| **h2** | 4rem (64px) | 700 | 1.3 | Section headers |
| **h3** | 3rem (48px) | 700 | 1.3 | Subsection headers |
| **h4** | 2.25rem (36px) | 700 | 1.3 | Card titles |
| **h5** | 1.75rem (28px) | 700 | 1.3 | Component headers |
| **h6** | 1.3125rem (21px) | 700 | 1.3 | Small headers |
| **body1** | 1rem (16px) | 400 | 1.5 | Default body text |
| **body2** | 0.875rem (14px) | 400 | 1.5 | Secondary text, labels |
| **caption** | 0.75rem (12px) | 400 | 1.5 | Captions, helper text |

### Mobile Typography
Responsive variants scale down slightly on smaller screens:
- h1-mobile through h6-mobile classes
- Maintains hierarchy while improving mobile readability

---

## Color System

### Light Mode (Default)

#### Primary Palette
```css
/* Forest Green - Main brand color */
--primary: hsl(122, 36%, 27%);          /* Dark forest green */
--primary-light: hsl(130, 38%, 94%);    /* Very light green background */
--primary-dark: hsl(122, 42%, 19%);     /* Darker green for contrast */
--primary-foreground: hsl(0, 0%, 100%); /* White text on primary */
```

**Usage:** Active states, primary CTAs, navigation highlights, success indicators

#### Secondary Palette
```css
/* Bright Teal - Complementary accent */
--secondary: hsl(146, 88%, 50%);        /* Vibrant cyan/teal */
--secondary-light: hsl(150, 100%, 94%); /* Light teal background */
--secondary-dark: hsl(146, 84%, 39%);   /* Darker teal */
```

**Usage:** Secondary actions, informational highlights, interactive elements

#### Accent Palette
```css
/* Amber Gold - Warning and emphasis */
--accent: hsl(38, 92%, 50%);            /* Warm gold/amber */
--accent-light: hsl(45, 93%, 89%);      /* Light amber background */
--accent-dark: hsl(32, 95%, 44%);       /* Dark amber */
```

**Usage:** Warnings, pending states, important notifications

#### Semantic Colors
```css
--success: hsl(88, 45%, 48%);           /* Green - Completed, published */
--warning: hsl(38, 92%, 50%);           /* Amber - Caution, pending */
--destructive: hsl(0, 63%, 51%);        /* Red - Delete, error states */
--info: hsl(207, 79%, 46%);             /* Blue - Information, help */
```

#### Surface Colors
```css
--background: hsl(48, 30%, 95%);        /* Off-white, warm base */
--foreground: hsl(0, 0%, 17%);          /* Dark gray, primary text */
--card: hsl(0, 0%, 100%);               /* Pure white for cards */
--card-elevated: hsl(0, 0%, 99%);       /* Slightly tinted white */
--border: hsl(48, 23%, 90%);            /* Light gray borders */
--muted: hsl(0, 0%, 54%);               /* Gray for disabled/secondary */
--muted-foreground: hsl(0, 0%, 54%);    /* Secondary text */
```

### Dark Mode

```css
--background: hsl(222.2, 84%, 4.9%);    /* Deep navy */
--card: hsl(224, 15%, 7%);              /* Dark blue-gray */
--primary: hsl(224, 75%, 65%);          /* Bright blue */
--secondary: hsl(25, 90%, 63%);         /* Orange */
--accent: hsl(198, 85%, 58%);           /* Cyan */
--success: hsl(160, 84.1%, 45%);        /* Green */
```

**Note:** Dark mode colors use higher saturation and reversed contrast ratios for accessibility.

### Color Usage Guidelines

✅ **Do:**
- Use primary green for main actions and active navigation
- Apply semantic colors consistently (green = success, red = destructive)
- Maintain WCAG AA contrast ratios (4.5:1 for text)
- Use muted colors for disabled states

❌ **Don't:**
- Mix semantic meanings (e.g., red for success)
- Use low-contrast color combinations
- Overuse bright accent colors

---

## Spacing System

Consistent spacing scale based on 4px base unit:

```css
--spacing-1: 0.25rem;   /* 4px  - Tight spacing */
--spacing-2: 0.5rem;    /* 8px  - Small gaps */
--spacing-4: 1rem;      /* 16px - Default spacing */
--spacing-6: 1.5rem;    /* 24px - Medium spacing */
--spacing-8: 2rem;      /* 32px - Large spacing */
--spacing-10: 2.5rem;   /* 40px - Extra large */
--spacing-12: 3rem;     /* 48px - Section spacing */
--spacing-16: 4rem;     /* 64px - Major sections */
--spacing-20: 5rem;     /* 80px - Hero spacing */
--spacing-24: 6rem;     /* 96px - Maximum spacing */
```

**Usage Patterns:**
- **Micro spacing (1-2):** Icon-text gaps, badge padding
- **Component spacing (4-6):** Card padding, form field gaps
- **Section spacing (8-12):** Between major UI sections
- **Layout spacing (16-24):** Page margins, hero sections

---

## Border Radius

Rounded corners for modern, friendly feel:

```css
--radius: 0.5rem;                       /* 8px - Default (lg) */
--radius-md: calc(var(--radius) - 2px); /* 6px - Medium */
--radius-sm: calc(var(--radius) - 4px); /* 4px - Small */
```

**Component Usage:**
- **lg (8px):** Cards, buttons, modals, major containers
- **md (6px):** Input fields, select dropdowns, badges
- **sm (4px):** Small badges, tags, inline elements

---

## Shadow System

Custom blue-tinted shadows for subtle depth and material elevation:

```css
/* Base shadow color: rgba(79, 109, 207, ...) */

--shadow-2dp: 0 1px 3px 0 rgba(79,109,207,0.1), 0 1px 2px 0 rgba(79,109,207,0.06);
--shadow-4dp: 0 2px 4px -1px rgba(79,109,207,0.1), 0 1px 2px -1px rgba(79,109,207,0.06);
--shadow-8dp: 0 4px 6px -1px rgba(79,109,207,0.1), 0 2px 4px -2px rgba(79,109,207,0.1);
--shadow-16dp: 0 10px 15px -3px rgba(79,109,207,0.1), 0 4px 6px -4px rgba(79,109,207,0.1);
--shadow-24dp: 0 20px 25px -5px rgba(79,109,207,0.1), 0 8px 10px -6px rgba(79,109,207,0.1);
--shadow-32dp: 0 25px 50px -12px rgba(79,109,207,0.25);

/* Interactive States */
--shadow-hover: 0 8px 25px -8px rgba(79,109,207,0.15);   /* Elevation on hover */
--shadow-focus: 0 0 0 2px rgba(79,109,207,0.2);          /* Focus ring */
--shadow-pressed: 0 1px 3px 0 rgba(79,109,207,0.2);      /* Pressed/active */
```

**Usage:**
- **2dp-4dp:** Subtle elevation (input fields, flat buttons)
- **8dp-16dp:** Standard elevation (cards, dropdowns)
- **24dp-32dp:** High elevation (modals, popovers)
- **hover:** Interactive hover states
- **focus:** Keyboard focus indicators
- **pressed:** Active/pressed button states

---

## Component Patterns

### Cards

**Visual Style:**
- White background (`--card`)
- Default shadow: `shadow-8dp`
- Border radius: `lg (8px)`
- Padding: `2rem (32px)`

**Interactive States:**
```css
/* Default */
background: white;
box-shadow: var(--shadow-8dp);
transition: all 0.2s ease;

/* Hover */
box-shadow: var(--shadow-hover);
transform: translateY(-2px);

/* Pressed */
box-shadow: var(--shadow-pressed);
transform: translateY(0);
```

**Variants:**
- **Elevated Card:** Higher shadow (16dp) for emphasis
- **Flat Card:** No shadow, subtle border
- **Interactive Card:** Hover effects enabled

---

### Buttons

**Primary Button:**
```css
background: var(--primary);          /* Forest green */
color: var(--primary-foreground);    /* White text */
padding: 0.5rem 1rem;                /* 8px 16px */
border-radius: var(--radius-md);     /* 6px */
font-weight: 500;
box-shadow: var(--shadow-4dp);

/* Hover */
background: var(--primary-dark);
box-shadow: var(--shadow-hover);
```

**Variants:**
- **Outline:** Border with transparent background
- **Ghost:** No background, text only, hover shows background
- **Destructive:** Red background for delete actions
- **Secondary:** Teal background for secondary actions

**Sizes:**
- **icon:** Square button for icons only
- **sm:** Compact button (smaller padding)
- **default:** Standard button
- **lg:** Large button (more padding)

---

### Status Badges

Color-coded semantic badges:

```css
/* Published / Success */
background: var(--success-light);    /* Light green */
color: var(--success-dark);          /* Dark green text */

/* Draft / Warning */
background: var(--accent-light);     /* Light amber */
color: var(--accent-dark);           /* Dark amber text */

/* Ongoing */
background: hsl(25, 95%, 90%);       /* Light orange */
color: hsl(25, 90%, 30%);            /* Dark orange text */

/* Completed / Info */
background: hsl(207, 85%, 90%);      /* Light blue */
color: hsl(207, 79%, 30%);           /* Dark blue text */

/* Archived / Destructive */
background: hsl(0, 85%, 90%);        /* Light red */
color: var(--destructive-dark);      /* Dark red text */
```

**Structure:**
- Small padding: `0.25rem 0.75rem`
- Border radius: `md (6px)`
- Font size: `body2 (14px)`
- Font weight: `500`

---

### Modals & Dialogs

**Overlay:**
```css
background: rgba(0, 0, 0, 0.5);      /* Semi-transparent black */
backdrop-filter: blur(4px);          /* Subtle blur effect */
```

**Dialog Content:**
```css
background: white;
border-radius: var(--radius);        /* 8px */
box-shadow: var(--shadow-32dp);      /* High elevation */
max-width: 600px;                    /* Content width */
padding: 2rem;                       /* 32px */
```

**Animation:**
- Fade in: 0.2s ease-out
- Scale in: From 95% to 100%

---

### Tables (DataTable)

**Structure:**
```css
/* Header */
background: var(--muted-light);
font-weight: 600;
color: var(--foreground);
border-bottom: 2px solid var(--border);

/* Rows */
border-bottom: 1px solid var(--border);
transition: background 0.15s ease;

/* Hover */
background: var(--primary-light);    /* Light green tint */
```

**Features:**
- Sortable columns with icons
- Pagination controls
- Row selection with checkboxes
- Responsive overflow with horizontal scroll

---

### Forms & Input Fields

**Text Input:**
```css
border: 1px solid var(--border);
border-radius: var(--radius-md);     /* 6px */
padding: 0.5rem 0.75rem;             /* 8px 12px */
background: white;
transition: all 0.2s ease;

/* Focus */
border-color: var(--primary);
box-shadow: var(--shadow-focus);     /* Blue focus ring */
outline: none;
```

**Select Dropdown:**
- Same styling as text input
- Chevron icon on right
- Popover with shadow-16dp

**Textarea:**
- Same as text input
- Min height: 100px
- Resize vertical only

**Checkbox/Radio:**
- Primary color when checked
- Border: 2px solid muted
- Border radius: sm (4px) for checkbox, full (50%) for radio

---

### Navigation & Sidebar

**Sidebar:**
```css
background: white;
border-right: 1px solid var(--border);
width: 16rem;                        /* 256px */
```

**Navigation Items:**
```css
/* Default */
color: var(--foreground);
padding: 0.75rem 1rem;
border-radius: var(--radius-md);
transition: all 0.15s ease;

/* Hover */
background: var(--primary-light);
color: var(--primary);

/* Active */
background: var(--primary);
color: white;
font-weight: 500;
```

---

## Animations & Transitions

### Standard Transitions

```css
/* Default for most interactions */
transition: all 0.2s ease-out;

/* Hover effects */
transition: transform 0.2s ease, box-shadow 0.2s ease;

/* Color changes */
transition: background-color 0.15s ease, color 0.15s ease;
```

### Keyframe Animations

**Fade In:**
```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
animation: fade-in 0.3s ease-out;
```

**Scale In:**
```css
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
animation: scale-in 0.2s ease-out;
```

**Accordion:**
```css
/* Expand */
animation: accordion-down 0.2s ease-out;

/* Collapse */
animation: accordion-up 0.2s ease-out;
```

### Interactive State Guidelines

**Hover:**
- Elevation increase (shadow-hover)
- Slight upward movement (-2px)
- Color shift to darker variant
- 200ms transition

**Focus:**
- Blue focus ring (shadow-focus)
- No layout shift
- Visible keyboard indicator

**Pressed/Active:**
- Shadow reduction
- Slight downward movement or no transform
- Darker color variant

**Disabled:**
- 50% opacity or muted colors
- No hover/focus states
- Cursor: not-allowed

---

## Responsive Design

### Breakpoints

```css
--screen-sm: 640px;   /* Mobile */
--screen-md: 768px;   /* Tablet */
--screen-lg: 1024px;  /* Desktop */
--screen-xl: 1280px;  /* Large desktop */
--screen-2xl: 1536px; /* Extra large */
```

### Mobile Considerations
- Touch targets: Minimum 44x44px
- Reduced typography scale (h1-mobile classes)
- Stackable layouts (column on mobile, row on desktop)
- Hamburger navigation on small screens
- Bottom navigation for mobile apps

---

## Accessibility

### Contrast Ratios
- **Text:** 4.5:1 minimum (WCAG AA)
- **Large text:** 3:1 minimum
- **UI components:** 3:1 minimum

### Focus Management
- Visible focus indicators on all interactive elements
- Focus ring: 2px blue shadow
- Logical tab order
- Skip links for keyboard navigation

### Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels for icon buttons
- Role attributes for custom components
- Alt text for images

---

## Design Tokens Summary

```css
/* Quick Reference */
--font-heading: 'Rajdhani', sans-serif;
--font-body: 'Sentient', sans-serif;
--font-mono: 'JetBrains Mono', monospace;

--primary: hsl(122, 36%, 27%);        /* Forest green */
--secondary: hsl(146, 88%, 50%);      /* Bright teal */
--accent: hsl(38, 92%, 50%);          /* Amber gold */

--spacing-base: 1rem;                 /* 16px */
--radius: 0.5rem;                     /* 8px */
--shadow-default: var(--shadow-8dp);

--transition-fast: 0.15s ease;
--transition-default: 0.2s ease-out;
--transition-slow: 0.3s ease-out;
```

---

*Last Updated: January 2025*
