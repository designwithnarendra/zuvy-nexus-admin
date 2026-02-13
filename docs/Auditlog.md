

## I. Global Formatting Rules
- The "Actor" Line: [Full Name] (email@address.com). Use bold for the name and normal for email@address.com
- The Action: Verbs (published, created, updated) should be in regular font weight (not bold).
- The "Target" Object: Bold the name of the Course, Module, Batch, or Student being acted upon.
- Contextual Suffix: Always append the parent Course name to the end of the entry to ensure clarity across different programs.


## II. Master Entry Template List
1. Course Architecture (Course Studio)
 - Create Course: [Name] ([Email]) created course [Course Title].
 - Status Change: [Name] ([Email]) published [Course Title].
    - UI Component: Display "Draft $\rightarrow$ Published" in a sub-block
 - Update Detail: [Name] ([Email]) updated the cover image for [Course Title].
 - Settings: [Name] ([Email]) changed access to Private for [Course Title].

2. Curriculum & Content Management
 - Add Module: [Name] ([Email]) added module [Module Title] to [Course Title].
 - Schedule Class: [Name] ([Email]) scheduled live class [Class Title] in [Course Title].
 - Update Lesson: [Name] ([Email]) updated video source for [Video Title] in [Course Title].
 - Edit Article: [Name] ([Email]) updated reading content for [Article Title] in [Course Title].
 
3. Student & Batch Operations
- Create Batch: [Name] ([Email]) created batch [Batch Name] for [Course Title].
- Enrollment: [Name] ([Email]) enrolled [Student Name] into [Batch Name] ([Course Title]).
- Status Update: [Name] ([Email]) updated [Student Name] status to Graduated in [Batch Name].
- Batch Edit: [Name] ([Email]) updated instructor for [Batch Name] in [Course Title].

4. Assessment & Submissions
- Add Topic: [Name] ([Email]) added new topics to Content Bank: [Topic A, Topic B].
- Create Quiz: [Name] ([Email]) created a new MCQ in [Topic Name] for [Course Title].
- Approve Retry: [Name] ([Email]) approved a re-attempt for [Student Name] in [Assessment Title].
- Download Report: [Name] ([Email]) downloaded submission report for [Assessment Title].

5. Roles & Permissions
- Invite User: [Name] ([Email]) added [New User Name] as Instructor.
- Edit Permissions: [Name] ([Email]) updated permissions for [Role Name].
   - UI Component: Display "Viewer $\rightarrow$ Admin" in a sub-block.

## III. UI Implementation Instructions
Indentation: When a sub-block is used (like status changes or permission shifts), indent it slightly beneath the main sentence to show it is a detail of that action.

Breadcrumb Tags: Place the module badge (e.g., Course Studio, Submissions) at the far right of the entry as a visual anchor.

Visual Connectors: For transitions, use a simple chevron ($>$) or arrow ($\rightarrow$) between states.