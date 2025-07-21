# Custom Instructions

This guide provides instructions for all tasks. The primary focus is on frontend development, translating design ideas into high-quality, user-centric code. All functionality will be simulated using mock data, assuming no real backend.

---

## Part 1: User-Centered Design & Product Thinking

Apply these rules when analyzing designs, brainstorming features, or defining user experience.

### A. Core Principles

- **User First, Always:** Every decision must be justified by how it benefits the user. What problem does it solve for them? How does it make their task easier or more enjoyable?
- **Clarity Over Cleverness:** A simple, intuitive interface is superior to a complex one, even if the latter is technically novel. If a user needs a manual, the design has failed.
- **Define the "Why":** Before building **what**, clearly articulate **why** it's needed. Identify the core user goal and the single most important job-to-be-done for any given feature.

### B. Ideation & Execution

- **Prototype with Purpose:** When generating ideas or UI mockups, focus on testing a specific hypothesis about user behavior. What do we want to learn from this design?
- **Assume Nothing:** Identify and question all assumptions about the user. Use placeholder content and mock data that reflect real-world diversity and edge cases (e.g., long names, empty states, error conditions).
- **Iterate from a Baseline:** Start with the simplest possible version that solves the core user problem. Propose incremental additions based on potential user value, not just feature quantity.

---

## Part 2: Software Engineering & Coding

Apply these rules when planning architecture, writing code, and ensuring quality.

### ️A. Architecture & Planning

- **Component-First:** Deconstruct every UI design into a hierarchy of reusable, independent components. Define the props (API) for each component before writing implementation code.
- **State Where It's Needed:** Keep state as local as possible. Lift state up only when multiple components need to share it. Clearly define the structure of mock data and state management from the outset.
- **Future-Proof Structure:** While we're using mock data, structure the code as if a real backend will be integrated later. Isolate data-fetching logic (even if mocked) into specific services or hooks to make future replacement easy.

### B. Code Implementation

- **Semantic & Accessible HTML:** Write HTML that describes the content's meaning, not its appearance. Use landmarks (`<main>`, `<nav>`) and ARIA attributes where necessary to ensure the application is usable by everyone, including those with assistive technologies.
- **Predictable & Pure Functions:** Favor pure functions and components that produce the same output for the same input. Minimize side effects to make the code easier to understand, test, and debug.
- **Efficient Rendering:** Prevent unnecessary re-renders. Use memoization (`React.memo`, `useMemo`, `useCallback`) strategically where performance gains are clear and needed.
- **Security by Default:** Sanitize all inputs rendered as HTML to prevent XSS attacks, even with mock data. Treat all props and dynamic data as untrusted.

### C. Quality & Maintenance

- **Self-Documenting Code:** Choose clear, descriptive names for variables, functions, and components. The code should explain its own purpose. Add comments only to explain the _why_, not the _what_.
- **Strict Typing:** Use a type system (like TypeScript) to define clear contracts for functions and components. Types are the first line of defense against bugs.
- **Isolate Dependencies:** Keep third-party libraries to a minimum. For each one used, justify its necessity and understand its impact on bundle size and performance.
