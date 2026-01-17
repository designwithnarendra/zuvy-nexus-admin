RBAC Dashboard: Functional Specifications

Document Type: Functional Logic & Behavior
Component: Role-Based Access Control (Matrix)
Version: 1.0

1. Role Context Switching

The sidebar acts as the primary filter for the dashboard.

Selection Action: Clicking a role item (e.g., "Instructor") in the sidebar immediately loads that role's permission set into the main view.

State Persistence:

Scenario: User modifies permissions for "Ops" but clicks "Instructor" before saving.

Behavior: System must trigger a "Unsaved Changes" modal prompt: "You have unsaved changes for Ops. Do you want to save or discard them?"

Default State: On page load, the first available role (usually "Ops") is selected by default.

2. The Permission Matrix Logic

The core interaction revolves around a hierarchical Parent-Child relationship with strict cascading rules.

A. Parent-Level Logic ("Course Studio")

Parent rows act as "Master Switches" for their entire section.

Interaction: Users click one of the 5 visible text labels (None, Viewer, Editor, Creator, Manager).

Downstream Cascade (The "Override" Rule):

Input: User sets Parent to "Editor".

Output: ALL child items (General Details, Curriculum, etc.) are immediately forced to "Editor".

Reasoning: Ensures quick bulk configuration.

Mixed State Handling:

Definition: A parent is in "Mixed State" if its children have different values (e.g., one Viewer, one Manager).

Visual: The Parent row displays a dashed border around the lowest common permission (usually Viewer) or a special "Mixed" label.

Action: Clicking any specific permission on a Mixed Parent (e.g., clicking "Creator") resolves the conflict by forcing all children to that new value ("Creator").

B. Child-Level Logic ("General Details")

Child rows allow granular exception handling.

Hover Reveal Mechanism:

Rest State: Shows a colored badge for the active permission; other slots are represented by dots to reduce noise.

Hover State: Hovering anywhere over the grid area instantly hides dots and reveals clickable text labels for all 5 tiers.

Click: Selecting a tier updates only that specific child row.

Upstream Inference (The "Consensus" Rule):

Trigger: User changes a Child row.

Logic: The system re-evaluates the Parent's state.

If ALL children now match (e.g., all are "Viewer") $\rightarrow$ Parent updates to "Viewer".

If children differ $\rightarrow$ Parent enters "Mixed State".

If ALL children are "No Access" $\rightarrow$ Parent updates to "No Access".

C. The "Ghost State" (Dependency Lock)

A child cannot exist without its parent container.

Condition: Parent is set to "No Access" (Tier 0).

Behavior:

All child rows become Disabled (Opacity 50%, non-interactive).

The matrix in child rows is replaced/overlaid by a message: "Enable Parent Access to configure".

Recovery: Setting the Parent to any active tier (Viewer+) automatically re-enables the child rows.

3. Data Structure & State Management

Permission Tiers (Linear)

Permissions are stored as integers to allow simple comparison logic (if level >= 2).

0: No Access

1: Viewer (Read Only)

2: Editor (View + Edit)

3: Creator (View + Edit + Create)

4: Manager (Full Access)

4. Visual Feedback & Safety

Hover Stability: The grid uses fixed widths (20% per column) to ensure that revealing text labels on hover does not cause the layout to "jump" or "wobble."