# Design System Documentation

## 🎨 Design Philosophy

### Core Principles

#### 1. **Consistency**
Every element follows predictable patterns and behaviors, creating a cohesive experience across all interfaces. Users can learn once and apply that knowledge throughout the platform.

#### 2. **Accessibility**
Built with WCAG 2.1 AA compliance from the ground up. Colors, typography, and interactions are designed to be inclusive and usable by everyone, including users with disabilities.

#### 3. **Scalability** 
The system grows gracefully as new features are added. Components are modular and composable, allowing for rapid development without sacrificing consistency.

#### 4. **Performance**
Every design decision considers performance impact. Optimized for fast loading, smooth animations, and efficient rendering across all devices.

### Design Values

- **Clarity over cleverness**: Clear, straightforward interfaces that communicate purpose immediately
- **Function over form**: Beautiful design that serves the user's goals, not just aesthetic appeal
- **Inclusive by default**: Accessible design that works for all users, not as an afterthought
- **Mobile-first**: Responsive design that works perfectly on any device size

## 🎯 Color System

### Brand Colors

#### Primary Palette
```css
/* Primary Blue - Main brand color */
--primary: 224 71% 56%;           /* #5B8DEF */
--primary-light: 224 71% 95%;     /* #F0F4FF */
--primary-dark: 224 71% 36%;      /* #2E5BCC */
--primary-foreground: 210 20% 98%; /* #FAFBFC */
```

#### Secondary Palette
```css
/* Secondary Orange - Accent color */
--secondary: 25 85% 55%;          /* #F97316 */
--secondary-light: 25 85% 95%;    /* #FFF4ED */
--secondary-dark: 25 85% 35%;     /* #C2410C */
--secondary-foreground: 210 20% 98%; /* #FAFBFC */
```

#### Accent Colors
```css
/* Accent Cyan - Supporting brand color */
--accent: 198 80% 50%;            /* #0891B2 */
--accent-light: 198 80% 95%;      /* #ECFEFF */
--accent-dark: 198 80% 30%;       /* #0E7490 */
--accent-foreground: 210 20% 98%; /* #FAFBFC */
```

### Semantic Colors

#### Success (Green)
```css
--success: 160 84.1% 39.4%;       /* #10B981 */
--success-light: 160 84.1% 95%;   /* #ECFDF5 */
--success-dark: 160 84.1% 19.4%;  /* #047857 */
--success-foreground: 210 20% 98%; /* #FAFBFC */
```

#### Warning (Yellow)
```css
--warning: 45.4 93.4% 47.5%;      /* #F59E0B */
--warning-light: 45.4 93.4% 95%;  /* #FFFBEB */
--warning-dark: 45.4 93.4% 27.5%; /* #D97706 */
--warning-foreground: 222.2 84% 4.9%; /* #111827 */
```

#### Destructive (Red)
```css
--destructive: 0 84.2% 60.2%;     /* #EF4444 */
--destructive-light: 0 84.2% 95%; /* #FEF2F2 */
--destructive-dark: 0 84.2% 40.2%; /* #DC2626 */
--destructive-foreground: 210 20% 98%; /* #FAFBFC */
```

#### Info (Blue)
```css
--info: 198 80% 50%;              /* #0891B2 */
--info-light: 198 80% 95%;        /* #ECFEFF */
--info-dark: 198 80% 30%;         /* #0E7490 */
--info-foreground: 210 20% 98%;   /* #FAFBFC */
```

### Neutral Palette

#### Light Mode
```css
--background: 0 0% 100%;          /* #FFFFFF */
--foreground: 222.2 84% 4.9%;     /* #111827 */
--card: 224 30% 97%;              /* #F8FAFC */
--card-light: 224 25% 98.5%;      /* #FBFCFD */
--card-elevated: 224 40% 95.5%;   /* #F1F5F9 */
--muted: 210 40% 96%;             /* #F8FAFC */
--muted-foreground: 215.4 16.3% 46.9%; /* #64748B */
--border: 214.3 31.8% 91.4%;      /* #E2E8F0 */
```

#### Dark Mode
```css
--background: 222.2 84% 4.9%;     /* #111827 */
--foreground: 210 20% 98%;        /* #FAFBFC */
--card: 224 15% 7%;               /* #1E293B */
--card-light: 224 15% 6%;         /* #1A2332 */
--card-elevated: 224 15% 8%;      /* #22334A */
--muted: 217.2 32.6% 17.5%;       /* #334155 */
--muted-foreground: 215 20.2% 65.1%; /* #94A3B8 */
--border: 217.2 32.6% 17.5%;      /* #334155 */
```

### Color Usage Guidelines

#### Primary Colors
- **Primary**: Main actions, navigation active states, important CTAs
- **Secondary**: Secondary actions, highlights, accent elements  
- **Accent**: Supporting elements, badges, special highlights

#### Semantic Colors
- **Success**: Completion states, positive feedback, success messages
- **Warning**: Caution states, important notices, pending actions
- **Destructive**: Error states, delete actions, critical alerts
- **Info**: Informational content, tips, neutral notifications

#### Accessibility Standards
- **Contrast Ratios**: All color combinations meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- **Color Independence**: Information is never conveyed through color alone
- **Focus Indicators**: High contrast focus states for keyboard navigation

## 📝 Typography

### Font Families

#### Outfit - Heading Font
```css
font-family: 'Outfit', sans-serif;
```
- **Usage**: Headings (H1-H6), important labels, brand elements
- **Weights**: 100, 200, 300, 400, 500, 600, 700, 800, 900
- **Character**: Modern, friendly, professional
- **Reason**: Excellent readability at all sizes, distinctive character for branding

#### Manrope - Body Font
```css
font-family: 'Manrope', sans-serif;
```
- **Usage**: Body text, UI labels, descriptions, form inputs
- **Weights**: 200, 300, 400, 500, 600, 700, 800
- **Character**: Clean, neutral, highly legible
- **Reason**: Optimized for screen reading, excellent letter spacing

#### Fira Code - Monospace Font
```css
font-family: 'Fira Code', monospace;
```
- **Usage**: Code snippets, data tables, technical content
- **Weights**: 300, 400, 500, 600, 700
- **Character**: Code-focused, ligature support
- **Reason**: Enhanced readability for code with programming ligatures

### Typography Scale

#### Headings
```css
/* H1 - Page titles */
h1 { font-size: 3.75rem; line-height: 1.1; }    /* 60px */

/* H2 - Section headers */
h2 { font-size: 2.25rem; line-height: 1.2; }    /* 36px */

/* H3 - Subsection headers */
h3 { font-size: 1.875rem; line-height: 1.3; }   /* 30px */

/* H4 - Component titles */
h4 { font-size: 1.5rem; line-height: 1.4; }     /* 24px */

/* H5 - Card titles */
h5 { font-size: 1.25rem; line-height: 1.5; }    /* 20px */

/* H6 - Small headings */
h6 { font-size: 1.125rem; line-height: 1.5; }   /* 18px */
```

#### Body Text
```css
/* Large body text */
.text-lg { font-size: 1.125rem; line-height: 1.75; }  /* 18px */

/* Default body text */
.text-base { font-size: 1rem; line-height: 1.75; }    /* 16px */

/* Small body text */
.text-sm { font-size: 0.875rem; line-height: 1.5; }   /* 14px */

/* Extra small text */
.text-xs { font-size: 0.75rem; line-height: 1.5; }    /* 12px */
```

### Typography Usage

#### Hierarchy Guidelines
1. **Page Title (H1)**: One per page, establishes primary context
2. **Section Headers (H2)**: Major content sections, clear content breaks
3. **Subsection Headers (H3)**: Content subsections, grouped information
4. **Component Titles (H4)**: Card headers, widget titles, dialog titles
5. **Small Headers (H5, H6)**: List headers, form sections, secondary labels

#### Readability Optimization
- **Line Height**: Generous line spacing for improved readability
- **Letter Spacing**: Subtle tracking adjustments for optimal legibility
- **Text Length**: Maximum 75 characters per line for comfortable reading
- **Font Weights**: Strategic weight variation to create visual hierarchy

### Mobile Typography
```css
@media (max-width: 768px) {
  h1 { font-size: 2.5rem; }     /* 40px */
  h2 { font-size: 2rem; }       /* 32px */
  h3 { font-size: 1.75rem; }    /* 28px */
  h4 { font-size: 1.5rem; }     /* 24px */
  h5 { font-size: 1.25rem; }    /* 20px */
  h6 { font-size: 1.125rem; }   /* 18px */
  
  body { font-size: 0.9rem; }   /* 14.4px */
}
```

## 📏 Spacing System

### Base Spacing Units
Built on a 4px base unit (0.25rem) for mathematical consistency:

```css
/* Spacing scale */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-4: 1rem;       /* 16px */
--space-6: 1.5rem;     /* 24px - Default */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
```

### Spacing Guidelines

#### Component Spacing
- **Inner Padding**: space-4 to space-6 for component internal spacing
- **Stacked Elements**: space-4 for related items, space-6 for sections
- **Page Margins**: space-6 to space-8 for page-level spacing
- **Section Breaks**: space-8 to space-12 for major section separation

#### Layout Spacing
- **Grid Gaps**: space-4 to space-6 for card grids and content layouts
- **Navigation**: space-2 to space-4 for navigation item spacing
- **Form Elements**: space-4 for form field spacing and label margins
- **Modal Content**: space-6 for modal padding and content spacing

## 🌗 Elevation & Shadows

### Shadow System
Inspired by Material Design with customized values for depth perception:

```css
/* Elevation levels */
.shadow-2dp {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.shadow-4dp {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.shadow-8dp {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.shadow-16dp {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.shadow-24dp {
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
}
```

### Interactive Shadows
```css
/* Hover states */
.shadow-hover {
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.18), 0 5px 5px rgba(0, 0, 0, 0.20);
}

/* Focus states */
.shadow-focus {
  box-shadow: 0 0 0 3px rgba(91, 141, 239, 0.3);
}

/* Pressed states */
.shadow-pressed {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.18);
}
```

### Usage Guidelines
- **2dp**: Subtle elevation for cards and form elements
- **4dp**: Standard elevation for interactive components
- **8dp**: Modal dialogs and important floating elements
- **16dp**: Navigation drawers and elevated panels
- **24dp**: Tooltips and temporary surfaces

## 🧩 Component Patterns

### Base Components

#### Button Variants
```tsx
// Primary action button
<Button className="bg-primary hover:bg-primary-dark">
  Primary Action
</Button>

// Secondary action button
<Button variant="outline">
  Secondary Action
</Button>

// Destructive action button
<Button variant="destructive">
  Delete Item
</Button>

// Ghost button for subtle actions
<Button variant="ghost">
  Cancel
</Button>
```

#### Card Layouts
```tsx
// Standard card with shadow
<Card className="shadow-4dp">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>

// Elevated card for important content
<Card className="shadow-8dp border-primary">
  <CardHeader className="bg-primary-light">
    <CardTitle>Featured Content</CardTitle>
  </CardHeader>
  <CardContent>
    Important information
  </CardContent>
</Card>
```

#### Input Elements
```tsx
// Standard form input
<Input 
  placeholder="Enter text here"
  className="focus:ring-primary focus:border-primary"
/>

// Select dropdown
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Composite Components

#### Data Tables
```tsx
<DataTable
  data={data}
  columns={columns}
  searchable
  filterable
  itemsPerPage={15}
  className="shadow-4dp"
/>
```

#### Modal Dialogs
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Modal</Button>
  </DialogTrigger>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Modal Title</DialogTitle>
    </DialogHeader>
    <div className="py-4">
      Modal content
    </div>
  </DialogContent>
</Dialog>
```

### Layout Patterns

#### Page Structure
```tsx
<div className="container mx-auto px-6 py-8 max-w-7xl">
  {/* Page Header */}
  <div className="mb-8">
    <h1 className="font-heading font-bold text-3xl mb-2">Page Title</h1>
    <p className="text-muted-foreground">Page description</p>
  </div>
  
  {/* Main Content */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Content areas */}
  </div>
</div>
```

#### Grid Layouts
```tsx
// Responsive card grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id} className="shadow-4dp hover:shadow-hover">
      {/* Card content */}
    </Card>
  ))}
</div>
```

## 📱 Responsive Design

### Breakpoint System
```css
/* Mobile first approach */
/* Default: < 640px (mobile) */

/* Small tablets and large phones */
@media (min-width: 640px) { /* sm */ }

/* Tablets */
@media (min-width: 768px) { /* md */ }

/* Small laptops */
@media (min-width: 1024px) { /* lg */ }

/* Desktops */
@media (min-width: 1280px) { /* xl */ }

/* Large desktops */
@media (min-width: 1536px) { /* 2xl */ }
```

### Responsive Patterns

#### Navigation
- **Mobile**: Collapsible hamburger menu
- **Tablet**: Horizontal navigation with dropdown menus
- **Desktop**: Full horizontal navigation with hover states

#### Content Layout
- **Mobile**: Single column layout, stacked cards
- **Tablet**: Two-column grid, larger touch targets
- **Desktop**: Multi-column layout, hover interactions

#### Typography
- **Mobile**: Reduced font sizes, tighter line spacing
- **Tablet**: Standard sizing with touch-friendly spacing
- **Desktop**: Full typography scale with optimal reading widths

## 🎨 Animation System

### Animation Principles
- **Purposeful**: Every animation serves a functional purpose
- **Fast**: Animations complete quickly (200-400ms)
- **Natural**: Easing curves feel organic and pleasant
- **Respectful**: Respects user preferences for reduced motion

### Standard Animations
```css
/* Fade in animation */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Scale in animation */
@keyframes scale-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Usage */
.animate-fade-in { animation: fade-in 0.3s ease-out; }
.animate-scale-in { animation: scale-in 0.2s ease-out; }
```

### Transition Standards
```css
/* Standard transitions */
.transition-smooth {
  transition: all 200ms ease-in-out;
}

.transition-colors {
  transition: color 150ms ease-in-out, background-color 150ms ease-in-out;
}

.transition-shadow {
  transition: box-shadow 200ms ease-in-out;
}
```

## ♿ Accessibility Features

### Color Accessibility
- **Sufficient Contrast**: All text meets WCAG AA contrast requirements
- **Color Independence**: No information conveyed through color alone
- **Focus Indicators**: High-contrast focus rings for keyboard navigation

### Typography Accessibility
- **Readable Fonts**: Highly legible typefaces optimized for screen reading
- **Scalable Text**: Text scales properly with browser zoom up to 200%
- **Generous Spacing**: Adequate line height and letter spacing for readability

### Interaction Accessibility
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: Semantic HTML and ARIA labels throughout
- **Touch Targets**: Minimum 44px touch targets for mobile interactions
- **Reduced Motion**: Respects `prefers-reduced-motion` user settings

## 🛠️ Implementation Guidelines

### CSS Custom Properties
```css
/* Use CSS custom properties for consistency */
:root {
  --color-primary: 224 71% 56%;
  --font-heading: 'Outfit', sans-serif;
  --space-default: 1.5rem;
  --shadow-card: 0 3px 6px rgba(0, 0, 0, 0.16);
}
```

### Utility Classes
```css
/* Common utility patterns */
.font-heading { font-family: var(--font-heading); }
.text-primary { color: hsl(var(--primary)); }
.bg-card { background-color: hsl(var(--card)); }
.shadow-card { box-shadow: var(--shadow-card); }
```

### Component Styling
- **Tailwind First**: Use Tailwind classes for most styling needs
- **Custom CSS**: Create custom CSS only when Tailwind is insufficient
- **Component Variants**: Use CVA (Class Variance Authority) for component variants
- **Responsive**: Always consider mobile-first responsive design

## 📋 Maintenance & Evolution

### Design System Updates
- **Version Control**: All design system changes are versioned and documented
- **Impact Assessment**: Changes evaluated for breaking existing implementations
- **Migration Guides**: Clear documentation for updating to new design system versions
- **Testing**: Visual regression testing for design system changes

### Quality Assurance
- **Design Reviews**: Regular reviews of new components and patterns
- **Accessibility Audits**: Continuous accessibility testing and improvements
- **Performance Monitoring**: Regular performance impact assessment of design changes
- **User Feedback**: Incorporation of user feedback into design system evolution

---

*This design system documentation is a living document that evolves with the platform. Updates are made regularly to reflect new patterns, improved accessibility, and enhanced user experience.* 