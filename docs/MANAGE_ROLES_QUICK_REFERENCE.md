# Admin Dashboard - Manage Roles UI - Quick Reference

## Screen Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Manage Role Functions                               │
│            Configure role permissions and manage system actions       │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐ ┌──────────────────────────────────────────────────────┐
│  SELECT ROLE    │ │  ACCESS LEVELS DEFINITION                            │
├─────────────────┤ │  • No access | • Viewer | • Editor | • Creator | • Manager
│  ✓ Ops          │ │
│    Operations   │ │
│                 │ │ ┌──────────────────────────────────────────────────────┐
│    Instructor   │ │ │ FEATURE MODULE          │ PERMISSION TIER            │
│    Instructors  │ │ ├──────────────────────────┼───────────────────────────┤
│    and teachers │ │ │ ▼ 🎓 Course Studio    │ NO ACCESS VIEWER EDITOR ... │
└─────────────────┘ │ ├──────────────────────────┼───────────────────────────┤
                    │ │   ℹ️  General Details    │ •         VIEWER  •    ... │
                    │ │   📑  Curriculum        │ •         VIEWER  •    ... │
                    │ │   👥  Students          │ NO ACCESS VIEWER EDITOR ... │
                    │ │   📅  Batches           │ •         VIEWER  •    ... │
                    │ │   📄  Submissions       │ •         VIEWER  •    ... │
                    │ │   ⚙️  Settings           │ •         VIEWER  •    ... │
                    │ │                         │                           │
                    │ │ ▼ 📚 Content Bank      │ NO ACCESS VIEWER EDITOR ... │
                    │ │   📋  MCQs              │ •         •      EDITOR ... │
                    │ │   </> Coding Questions  │ •         •      EDITOR ... │
                    │ │   💬  Open Ended        │ •         •      EDITOR ... │
                    │ │                         │                           │
                    │ │ ℹ️ Permissions cascade down.                        │
                    │ │                         │ [Save Configuration] ►   │
                    │ └──────────────────────────┴───────────────────────────┘
└─────────────────────────────────────────────────────────────────────────┘
```

## Interaction Patterns

### 1. Role Selection
- Click a role in the left sidebar to switch roles
- Selected role: Green background + checkmark + left green border
- Unsaved changes warning appears if switching with pending changes

### 2. Expanding/Collapsing Modules
- Click the chevron (▼/▶) next to parent module name
- ▼ = expanded, ▶ = collapsed
- All modules default to expanded on initial load

### 3. Permission Selection
- **Rest State**: Shows colored badge for active permission, dots (•) for inactive
- **Hover State**: Hovering over a row reveals all 5 permission options as clickable buttons
- Click a button to select that permission tier

### 4. Permission Tiers
```
NO ACCESS  → Gray (Slate) - No visibility
VIEWER     → Blue (Info) - Read Only
EDITOR     → Amber (Warning) - View + Edit
CREATOR    → Orange (Secondary) - View + Edit + Create
MANAGER    → Green (Success) - Full Access
```

### 5. Cascading Rules

#### Downstream Cascade (Parent to Children)
```
User clicks "EDITOR" on Course Studio
        ↓
ALL children (General Details, Curriculum, etc.) become "EDITOR"
```

#### Upstream Inference (Children to Parent)
```
Case 1: All children = "VIEWER"
        ↓
        Parent updates to "VIEWER"

Case 2: Children differ (some VIEWER, some EDITOR)
        ↓
        Parent shows mixed state (uses lowest common permission)

Case 3: All children = "NO ACCESS"
        ↓
        Parent updates to "NO ACCESS"
```

#### Ghost State (Disabled Children)
```
Parent = "NO ACCESS"
        ↓
ALL children become disabled (opacity 50%, not clickable)
Message: "Enable Parent Access to configure"
```

## State Management

### Unsaved Changes
- Indicator appears when any permission is changed: "You have unsaved changes"
- "Save Configuration" button becomes enabled (changes from disabled to enabled)
- Switching roles prompts confirmation dialog if changes exist

### Saving
- Click "Save Configuration" button
- Shows loading state: "Saving..."
- On success: Toast notification with role name and success message
- Button is disabled again until next change

## Color Reference (Zuvy Design System)

| Tier | Tailwind Classes | Hex | Usage |
|------|------------------|-----|-------|
| No Access | text-slate-500, bg-slate-50 | #6B7280 | Disabled state |
| Viewer | text-info, bg-info-light | #1ABECC | Read-only |
| Editor | text-warning, bg-warning-light | #F59E0B | Edit capability |
| Creator | text-secondary, bg-secondary-light | #EA7317 | Create capability |
| Manager | text-success, bg-success-light | #10B981 | Full access |

## Responsive Behavior

- **Mobile (< lg)**: Single column layout, sidebar stacks on top
- **Desktop (lg+)**: 4-column grid - sidebar (1) + content (3)
- Sidebar is sticky and stays visible while scrolling content
- Save button positioned bottom-right of content area

## Accessibility

- All buttons have proper keyboard navigation
- Color + text differentiation for permission tiers (not color alone)
- Proper heading hierarchy
- Icon + text labels for clarity
- Hover states provide visual feedback
