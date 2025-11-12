We are going to add a role for instructors. The design remains similar to the admin with basically changes relating what is available to the instructor and what is not. Instructor can only see things for the courses and the batches in those courses that they are teaching. Details specs to change from admin role as follows:

General Instructor Changes

- Add an initial page that will become the role selector page. Have two simple choices and ask the user if they are admin or instructor. If they choose admin, show the things as they are for admin. If they choose instructor, then show the interface according to the instructions described below for each section
- In the header, show a tag stating if the user is admin or instructor on the top right just left to the logout icon button. Use info for text and info light for its background

Changes to each section when instructor role is selected

Roles and Permissions

- Roles and permissions are not available to the instructor. Hide this tab

Content Bank

- It will remain as it is. No changes

Course Studio

- Remove the "Create New Course" button
- Change the "Create, manage, and monitor your educational courses" to "Teach and manage your courses"
- The functionality remains same though only show courses that are assigned to the
- For design purposes, show the full stack web development bootcamp and python for data science course for instructor for now. If there are more courses, they would appear in the course studio page

Course Page

- Remove the publish course button. Instructor won't be doing it

Below are tab wise changes for the course

General Details tab

- Info here will become read-only as instructor need not change the details
- Show course image where it is. Remove the upload new image and remove image buttons
- Show course title in H6 and below the description
- Below it show the start date and course language. Appropriate icons can be used for these. They can shown side by side in the same row
- At the last show the collaborator logo and collaborator name
- Remove the save changes button as it is not needed

Settings tab

- This tab is not needed. Hide it

Curriculum tab

- Remove the "add module/project" button. Functionality not needed for it
- Instructor cannot edit or delete the modules and project. Remove icon buttons for them
- Remove drag icon as well as instructor will only see how the curriculum was created

Module content page

- The curriculum made by admin will be visible as read only. Any fields that are there should be disabled for instructors
- In the add content pop-up that comes below the add content button, remove the live class and assessments. Other items will remain. This is because we still want the instructors to be able to add video, articles, assignments, coding problems, quiz and feedback form which can serve as homework or pre or post class materials
- Any content item added by the instructor will be editable by instructor as well as admin
- Add functionality to reorder content items by dragging the content position up and down. This should work for both admin and instructor roles

Students tab

- Most instructors will have one batch they are assigned to. In that don't show the batches filter. If they are assigned to multiple batches then show the batches filter
- Batch column becomes simple text with the name of the batch that the student is in. Instructor cannot change the batch of students. If there is only batch however, then hide the batch column to avoid repeating same thing again and again for each student row. Instead, just show the batch name below the search bar
- Instructor can edit student details to make minor changes but not delete student. Make these adjustments in the dropdown on clicking vertical three dots icon
- Add students and bulk upload button are not needed

Batches tab

- Hide Batches tab for instructors

Submissions tab

- When selecting any submission and going into its details, show the batch filter if there are multiple batches for the instructor. In case of single batch, hide the filter and mention the batch name under batch and remove the batch column in the table
- Another change is to move the total submissions, submissions received and qualified students labels above the count rather than them being below the count. This change will show on both admin and instructor roles
- In the submissions card, the icon has grey background and black color for icon itself. Change the background to primary light and icon into primary color. This should also apply for both admin and instructor roles
