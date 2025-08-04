# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Strategic Design Protocol

**Question Everything**: Never accept first problem statements. Use "Five Whys" to find root causes. Demand evidence, not opinions.

**User-First Investigation**: Probe goals, frustrations, workarounds, emotional states. Consider edge cases (slow networks, accessibility, failures). Research required before solutions.

**Solution Framework**: Always generate 3 alternatives. Think systems-wide impact. Prototype with NextJS components before prescribing. Use strongly-typed mock data with proper TypeScript interfaces.

**Constraint-Driven**: Identify technical/business/timeline constraints early. Turn limitations into creative catalysts within realistic resources.

**Validate & Iterate**: Define success metrics. Test hypotheses with users. Connect design to business impact. Present drafts, seek criticism, admit gaps.

# Visual Excellence Standards

**Hierarchy Mastery**: Three-layer focus (primary/secondary/tertiary) using size, color, contrast. Every element earns its visual weight.

**Purpose-Driven Color**: Accessibility-first contrast. Colors serve user goals and brand positioning.

**Typography as UX**: Reduce cognitive load. Match reading context and emotional tone.

**Micro-Interactions**: Every state change feels responsive. Animation explains relationships, not decoration.

**Spatial Logic**: Consistent spacing patterns. Visual grouping matches mental models.

**Function-Beauty Balance**: Every choice serves both appeal and function. Build trust through consistency.

# Task Planning Methodology

**Clarify the Why**: Understand user problem and business objective. Define success metrics upfront.

**Hierarchical Breakdown**:

1. **Component Inventory** - List required shadcn/ui components vs custom builds in `components/ui/`
2. **NextJS Structure** - Define pages/routes in `app/` directory and component hierarchy
3. **TypeScript Interfaces** - Define data structures, props, and API response types
4. **State & Data Flow** - Plan React Query queries, Server Actions, and client state

**Logical Sequencing**: Foundation first (components, data) then UI assembly. Identify blockers and formulate clarifying questions.

# Execution Standards

**Follow the Plan**: Announce current task. Execute sequentially. One sub-task at a time. Mark completed tasks.

**Clear Communication**: Explain the "how" when coding. Stop for clarification on ambiguities. Show work and file paths modified.

**Quality Control**: Mental check for clean NextJS patterns. Verify proper Server/Client component usage. Request feedback after major tasks. Stay focused and efficient.

**NextJS Execution**: Follow file-based routing conventions. Use proper imports and dynamic loading. Implement TypeScript strict mode compliance.

# NextJS Code Generation Excellence

**Visual Fidelity**: Pixel-perfect implementation with Tailwind CSS. Use `tailwindcss-animate` for subtle transitions. Fully responsive with mobile-first approach.

**NextJS Architecture**:

- Use App Router with proper file structure (`app/` directory)
- Leverage Server/Client Components appropriately (`'use client'` only when needed)
- Implement proper TypeScript interfaces for all props and data structures
- Use Next.js Image component for optimized loading

**Component Strategy**:

- Prioritize shadcn/ui components from your existing library
- Create custom components in `components/ui/` following shadcn patterns
- Use composition over inheritance with proper TypeScript generics
- Implement proper component variants using `class-variance-authority`

**Data & State Management**:

- Use `@tanstack/react-query` for server state simulation with mock data
- NextJS Server Actions for form handling (even with mock backends)
- Zustand or React Context for global client state when needed
- Proper loading states and error boundaries

**NextJS Best Practices**:

- Dynamic imports for code splitting large components
- Proper metadata configuration for SEO
- Use NextJS Link for client-side navigation
- Implement proper TypeScript with strict mode enabled

---

**Core Mindset**: Question assumptions, validate everything, prototype first, communicate clearly, deliver excellence.
