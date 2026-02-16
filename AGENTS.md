# Zuvy Nexus Admin — Project Guidelines

> Single source of truth for all AI coding assistants on this project.
> Referenced by `CLAUDE.md` (Claude Code) and read natively by GitHub Copilot, Cursor, and others.

## Project Overview

Design-focused admin dashboard using mock data to demonstrate functionality. Priority: **Beautiful, functional UI** over backend implementation.

## Core Principles

### 1. Design Philosophy

- **Visual Hierarchy**: Use Zuvy's design system (Plein headings, Switzer body, Forest Green primary etc.)
- **Consistency**: Match existing patterns in CourseCard, DataTable, and modal components
- **Purposeful Animation**: Subtle transitions (200-300ms) for state changes
- **Responsive by Default**: Mobile-first approach, test at 768px breakpoint

### 2. Component Architecture

```typescript
// Favor composition over complexity
- Split large components into focused sub-components
- Use compound components for related functionality (e.g., Card + CardHeader + CardContent)
- Extract reusable logic into custom hooks
- Keep page components thin - delegate to feature components
```

### 3. Code Quality Standards

- **TypeScript First**: Strict types, no `any`, leverage existing type definitions
- **Descriptive Names**: `handleStudentEnrollment` not `handleClick`
- **Early Returns**: Reduce nesting, handle edge cases first
- **Mock Data Awareness**: Use `mockStudents`, `mockBatches` from `src/types/mock-data.ts`

## Problem-Solving Approach

### When Adding Features

1. **Check Existing Patterns**: Search codebase for similar implementations
2. **Design System First**: Review `globals.css` for available utilities (shadows, colors)
3. **Mobile Considerations**: Will this work at 768px width?
4. **Accessibility**: Keyboard navigation, ARIA labels, focus states

### When Troubleshooting

1. **Check Mock Data**: Is the data structure correct?
2. **Console Warnings**: Fix React keys, missing dependencies
3. **Type Errors**: Don't bypass - fix the root cause
4. **Visual Bugs**: Inspect with browser DevTools, check Tailwind class conflicts

## UI Implementation Best Practices

### Styling

```typescript
// Use design tokens
className="bg-primary text-primary-foreground hover:bg-primary-dark"

// Combine utilities with cn()
className={cn(
  "base-classes",
  isActive && "active-classes",
  isDisabled && "disabled-classes"
)}

// Leverage existing shadows
className="shadow-4dp hover:shadow-hover"
```

### Forms & Inputs

- Use existing shadcn components (`Input`, `Select`, `Textarea`)
- Show validation errors inline
- Disable submit during loading
- Provide clear success/error feedback

### Tables & Lists

- Use `DataTable` for tabular data with sorting/filtering
- Implement pagination for >20 items
- Show loading skeletons during fetch
- Empty states with actionable CTAs

### Modals & Dialogs

- Use `Dialog` component from shadcn
- Keep modal content focused (one purpose)
- Provide clear close action
- Handle escape key

## Role-Based Access Patterns

```typescript
// Check user permissions
const { currentUser, isInstructor } = useUser()

// Conditional rendering
{!isInstructor() && <Button>Admin Only Action</Button>}

// Content ownership
const canEdit = !isInstructor() || content.createdBy === currentUser?.email
```

## File Organization

- **Page Components**: `/src/page-components/` - Route-specific containers
- **Feature Components**: `/src/components/` - Reusable feature modules
- **Hooks**: `/src/hooks/` - Custom React hooks
- **Utils**: `/src/utils/` - Pure helper functions
- **Types**: `/src/types/` - TypeScript definitions + mock data

## Common Patterns to Follow

### Loading States

```typescript
if (isLoading) {
  return <div className='animate-pulse'>{/* skeleton */}</div>
}
```

### Empty States

```typescript
{items.length === 0 && (
  <div className='text-center py-12'>
    <Icon className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
    <h3>No items yet</h3>
    <Button onClick={handleCreate}>Create First Item</Button>
  </div>
)}
```

### Navigation

```typescript
const router = useRouter()
router.push(`/courses/${courseId}`)
// Use URL params: /courses/[courseId]/students/[studentId]
```

## Performance Considerations

- Use `useMemo` for expensive computations
- Implement `useCallback` for handlers passed to children
- Lazy load images with `loading="lazy"`
- Debounce search inputs (300ms)

## Quality Checklist

Before considering any implementation complete:

- [ ] Works at mobile width (768px)
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Follows existing design patterns
- [ ] Uses design system colors/shadows
- [ ] Handles loading/error/empty states
- [ ] Respects role permissions
- [ ] Keyboard accessible

## When in Doubt

1. **Look at existing components** - Chances are there's a pattern to follow
2. **Keep it simple** - This is a design showcase, not production backend
3. **Prioritize aesthetics** - It should look professional and polished
4. **Ask clarifying questions** - Better to understand requirements than assume

---

_Remember: This project demonstrates UI/UX excellence. Every component should feel intentional, responsive, and aligned with the Zuvy design system._
