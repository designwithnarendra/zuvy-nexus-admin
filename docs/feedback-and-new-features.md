Below are the changes for Course Studio Library

# Course Studio Library

## Filters

- Remove the tag filter. Tags will not be implemented as of now. We are not taking input for tags tags during creation of a course

## Course Cards

- Remove the tag such as “Web Development” , “Data Science” in the course cards as it appears bible the description
- Remove the description in the course cards. Course card to have only the course image, course name, status and the number of learns and duration at the bottom

## Create New Course Modal

Remove the course image URL field from here. Course image can be added from the general details tab in the course page. Only keep Course name (change from Course Title), Course Description and Duration (weeks)

# Individual Course Page (Full Stack Web Development Bootcamp)

## Top information above the tabs

- Have the link button for “Back to Course Library” on the left
- Add a button for “Publish Course” in primary color and solid button style on the right in the same row as the back button
- Move the “View Student Experience” button in the top row just before the “Publish Course” button on the right. Change the label to “Preview as Student” and make it border style button for less emphasis
- Remove the row with topic, duration and learners info

## Tabs

- Fix the style of tabs such that the tab labels are vertically center aligned with the tab container. They are slightly off-aligned towards the Botton which also affects the selection highlight in primary color

## General Details Tab

- Change the title to General Details from “Course Information” and in the same font size as the titles in other tabs
- For course image, no need for the text “Course Image” above it.
- Course Start Date field need to be fixed to have only calendar icon on the right of the field. Whole field should be clickable and open the calendar widget to select the date
- Remove the tags field. Tags will not be used and stored

## Curriculum Tab

Don’t add scrolling of the modules and projects separately. The tabs will stick at the top after the name etc. gets scrolled up and rest of the scroll happens normally

### Module/Project inline form

- Increase the gap between the module or projects cards to 24px
- On clicking “Add New Module/Project” make the in modal appear after gap of 24px. Currently, it touches the last card
- Align the buttons to the right

### Module Card

- Increase the gap between the learning items to 16px
- Delete icon for module and learning items should be in destructive color. Highlight color should be destructive light color
- Show a warning modal to confirm deletion when admin tries to delete a module or learning item. Do not delete it directly
- For the learning item cards, increase the font size for the name to body text size of 18px. Move the additional info like read time, video duration or deadline to the right of the name

### First Module - Introduction to Web Development

- Include one learning item of each type with mock data. They should all be viewable via the edit button

### Side Panel for learning item editors

- Increase the width of the side panel to cover at least 50% and make it flexible such that user drag the left border to increase or decrease with width with minimum width to 40%
- Remove the wrapper container around the form fields
- There is a redundant close icon button in the top row. Remove the misaligned close icon button

#### Live Class Side panel editor

- Remove the redundant “Create New Live Class” heading. Heading in top row will be “Add Live Class”
- Remove host email field. It is not needed
- CTA label will be “Add live Class”
- Align the Add live class and Cancel CTA to the very bottom of the side panel even if there space left between them and the form fields

#### Video Side Panel Editor

- Remove the redundant “Create New Video” heading. Heading in header will be “Add Video”
- Only keep Youtube and Upload options in Vide Source. Remove direct URL and Vimeo
- No need for preview button separately. Show a thumbnail of the video below the URL field automatically as the URL is pasted in the field
- Allow to enter copy paste the transcript or upload a transcript file
- Remove the video duration field. It should taken from the video duration directly
- CTA label will be “Add Video”
- Align the Add video and Cancel CTA to the very bottom of the side panel even if there space left between them and the form fields

#### Article Side Panel Editor

- Remove the redundant “Create New Article” heading. Heading in header will be “Add Article”
- Add rich text formatting controls for the article content text box
- Estimated read time should be calculated according to the length of the article
- CTA label will be “Add Article”
- Align the Add article and Cancel CTA to the very bottom of the side panel even if there space left between them and the form fields

#### Assignment Side Panel Editor

- Remove the redundant “Create Assignment” heading. Heading in header will be “Add Assignment”
- There will always be a due date so remove the “Leave empty is there is no due date” text
- CTA label will be “Add Assignment”
- Align the Add assignment and Cancel CTA to the very bottom of the side panel even if there space left between them and the form fields

#### Coding Problem Side Panel Editor

- Remove the redundant “Create coding problem” heading. Heading in header will be “Add coding problem”
- In test case tab, show first test case by default
- Move the test case button below the last test case container and align it centered
- CTA label will be “Add Coding Problem”
- Align the Add coding problem and Cancel CTA to the very bottom of the side panel even if there space left between them and the form fields

#### Quiz Side Panel Editor

- Remove the redundant “Create Quiz” heading. Heading in header will be “Add Quiz”
- In questions tab, when MCQ is added, also show fields to write the options and add more options. Maximum 4 options can be added. Also, allow admin to mark the correct answer. There will be no open ended questions here
- CTA label will be “Add Quiz”
- Align the Add quiz and Cancel CTA to the very bottom of the side panel even if there space left between them and the form fields

#### Feedback Form Side Panel Editor

- Remove the redundant “Create Feedback Form” heading. Heading in header will be “Add Feedback Form”
- On adding question, mark them as required by default
- For rating question type, also allow to choose the scale type like 1 to 5 1 to 7 or 1 to 10 and give label for 1, middle number and highest number in the scale
- Delete icon should be in destructive color
- CTA label will be “Add Feedback Form”
- Align the Add Feedback form and Cancel CTA to the very bottom of the side panel even if there space left between them and the form fields

#### Assessment Side Panel Editor

- Remove the redundant “Create Assessment” heading. Heading in header will be “Add Assessment”
- Just as an exception, open the assessment editor panel to 60% of the screen width
- In questions tab, use different colors for the MCQ, coding and difficulty tags. Easy should be in success light background with text in success dark color. Medium in warning light background and text in warning dark color. Hard will been destructive light background color and text in destructive dark text color
- MCQ will be in primary light background color and text in primary dark color. Coding tag will be in info light background color and text in info dark color
- CTA label will be “Add Assessment”
- Align the Add assessment and Cancel CTA to the very bottom of the side panel even if there space left between them and the form fields

### Project

- For both projects in “Full Stack Web Development Bootcamp” course, add mock data and make it viewable when clicking edit button

## Batches tab (New addition)

- Move the “Batch Management” section from the student tab to batches tab
- Remove the card wrapper
- For the batch card, align the view students CTA at the very bottom of the card even if some gap remains in the card
- Create new batch button will be in primary color
- Open a New Batch Creation form on clicking “Create New Batch” button. Make it a two step batch creation process. The first step has fields for Batch Name, Instructor Email, Cap Enrollment (maximum number of students that can be added). After this step, second step is to add students in bulk via css
- Upon batch creation, clicking on the batch “View Students” button takes to the batch page
- Remove the card wrapper from the table
- Have 2 batches as part of mock data. Put 25 students each from the student list in students tab in the two batches
- Add attendance column in the table which will be in X (Z%) where X is number of classes students has attended and Z is the percentage calculated for attendance. Attendance column would be as “Attendance (Out of Y Classes) where Y is the total number of classes
- Student status can be active, dropout, graduated. Remove the “At Risk” status for now. Active is the student in an ongoing course. Dropout are ones who have left the course without completing it. Graduated are students who completed the course

## Students Tab

- Remove the tabs of student management and performance insights. Performance insights section is not needed and should not appear
- Top row will be the “Students” title (changed from Student Management) and description
- Batch Management section will not be in students tab. Batch functionality is moved to curriculum tab
- Remove the wrapping background around the table for student management
- Add mock data for students for 50 students
- In second row, have the search bar on the left and the add single student and bulk upload buttons on the right
- Add student form should appear in a modal instead of a form above the table
- Add filters for batch and status
- Add attendance column in the table which will be in X (Z%) where X is number of classes students has attended and Z is the percentage calculated for attendance. Attendance column would be as “Attendance (Out of Y Classes) where Y is the total number of classes
- Student status can be active, dropout, graduated. Remove the “At Risk” status for now. Active is the student in an ongoing course. Dropout are ones who have left the course without completing it. Graduated are students who completed the course
- Batch column in the table should be editable as a dropdown and admin should be able to assign batch to a student from the table itself. If an already assigned student’s batch is being changed then show a warning modal to the admin and ask for confirmation
- Need multi-select functionality for the student rows for certain functions. On multi-select, admin should be able to assign batch to these students in bulk, mark as dropout in bulk or delete them in bulk

## Submissions tab

- Add mock data such that submissions for up to 10 students are visible for possible learning items. Functionality for it should already be coded but I think it needs to be shown here

## Settings

- Change the title “Danger Zone” to “Delete Course”
- Remove the extra delete course heading
- Remove the wrapper container for the text and button
- Align the delete course button to the right
- In the warning modal of delete course, add the text field asking the admin to type “Delete Course” to be able to actually go forward with deleting course. Idea is to make deleting a course a bit difficult

Changes for Content bank

# Question bank page

- Remove the redundant “All questions” heading
- Move the question count to “Question Bank” heading
- Remove bulk upload button from the page
- Increase the number of questions of various types to about 30 in the mock data and implement pagination while allowing user to see either 10, 20, 50 or 100 items in the one go
- Clicking the row should open the modal to edit the question
- Add an “actions” column which as preview, edit and delete options. Preview is for seeing the question as how it will appear to the student

# Create Question Modals

## Multiple Choice Question

- Fix the alignment to be centered of the close icon button with the modal heading
- Remove the card wrapper for all the fields
- Remove the points and time limit fields
- Remove the “+” icon for topic. Allow user to type to search from available list in dropdown and show text to add the topic if the topic is not in the list
- Move the add option button to the bottom left after the last option
- In bulk upload tab, show upload box that supports css file upload and also allow to download a sample css

## Coding Problem

- Fix the alignment to be centered of the close icon button with the modal heading
- Remove the card wrapper for all the fields
- Remove the points, time limit fields and memory limit fields
- Remove the “+” icon for topic. Allow user to type to search from available list in dropdown and show text to add the topic if the topic is not in the list
- Move the add option button to the bottom left after the last test case
- Keep the start code and solution code expanded by default and remove the accordion function in them and test cases section
- CTA will be “Create Coding Problem”

## Open Ended Question

- Fix the alignment to be centered of the close icon button with the modal heading
- Remove the card wrapper for all the fields
- Remove the points and time limit fields
- Remove the “+” icon for topic. Allow user to type to search from available list in dropdown and show text to add the topic if the topic is not in the list
- Remove the answer guidelines section
