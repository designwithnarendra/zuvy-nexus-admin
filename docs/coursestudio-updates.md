# General Change

Labels of all form fields should be in bold weight everywhere in the platform

# Course Library (refer images/course-library-dropdown.png)

- A status for “Ongoing” should be added. These are courses which are in progress. Published is one which is published but not started yet. But “Ongoing” has started. This status should show on some course cards and in the status filter dropdown

# Course Page

## Top level info

- Remove the description below the course title

## General Details

- For the image provide both “Upload New Image” and “Remove Image” option
- Move the “Course Language” below the row having “duration” and “course start date”

## Curriculum

### Curriculum page (refer images/curriculum.png)

- Allow user to drag any of the module or project card up or down to change their position. Other cards should reposition accordingly
- Remove the difficulty tag in the project tag as we are taking input for difficulty
- When clicking “+ Add Module/Project” the add module/project form opens but user is not automatically scrolled to the form below. This could cause user to think that nothing happened
- Allow editing of module and project card. For simulation, allow editing for “Module 1: Introduction to Web Development” and “Project 1: Portfolio Website”
- Delete icon in project card should be in destructive color

### Module (refer images/module.png)

- Allow users to drag the learning item cards in a module up or down to reposition them. Other card will reposition accordingly
- When clicking “+ Add Content” the learning items options are shownbut user is not automatically scrolled to the items if the button was towards the bottom of the screen. This could cause user to think that nothing happened
- Remove the outer card boundary in “Add Learning Content” section
- Pick icons with appropriate coloring for all learning content items (ones that are black and white) similar to quiz, coding problem etc.

### Learning Item Side Panels (refer images/learningitemsidepanel.png)

- The header has two close buttons. Check the reason two of them are appearing and remove one that is on top of the close button aligned with the title
- The separator and the row with cancel and main CTA button should be aligned to the bottom of the panel even if it means there is space between end of the form and them. If there is more form fields then they will be scrollable
- The above two points also need to applied to fix same UI errors in the edit version of the side panels when any learning item is edited

## Students (refer images/students.png)

- The batch column items will be a dropdown such that admin can assign any student to an available batch. By default a new student will be unassigned. If a student is already assigned and admin wants to change the batch, show a warning to confirm the batch change

### Add New Student Modal (refer images/addstudentmodal.png)

- Remove the bluish tint card boundary for the form which is already inside a modal card
- Remove the duplicate “Add Student” and “Add a new student to the course” description

## Batches

- Clicking on “View Students” should take to the page with a table showing students in the batch. I think this table was already there but needs to be connected to the “View Students” button

## Submissions (refer images/submissions.png and images/submissions-insideasubmission.png)

- Apply same style of selection to the tabs with assessments, assignments etc. similar to top level tab for various course sections
- Remove the wrapping card around the tabs and the cards
- Clicking on a card should take to a new page without the top course level tabs etc. so we have more space. There will back button “Back to Assessment Submissions” to return to submissions
- Remove the wrapping card around the table that comes after clicking any card of any submission type
- In assessments submission table, rename “Re-attempt” to “Approve Re-Attempt” and make it first action and then view and download. Clicking on “Approve Re-Attempt” should show a confirmation modal asking admin if they are sure and want to allow re-attempt to the student
- Add a mock submission in all submissions types of assignments, projects, quizzes, practice problems, feedback forms. In the tables for all these other types, there will be view and download actions but no approve re-attempt action as it is only for assessments
