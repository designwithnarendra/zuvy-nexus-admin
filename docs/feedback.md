Let's work on the following feedback for various parts of the platform

# General Change

- Hovering on elements changes the background to accent color. It should be in primary color with the color of the icon or text of the element to white
- Only exception being two actions. First, logout action in the header should show destructive red color background and white color for icon on hover. Second, the delete icon anywhere in the platform such as the curriculum and student tables will have destructive red color background and white color for icon on hover

# Dashboard

Hide the "dashboard" button in the header. The functionality and frontend for dashboard page will remain but not accessible to the user. Will revisit it later

# Course Studio

## Course - Use Full Stack Web Development Bootcamp for these feedback points

- Add a confirmation dialog box on clicking "Publish Course" button at the top right. The dialog box has title "Publish Course" and message "Publishing a course will make it available to the students" and CTA will be "Publish" and "Cancel"

- If the course has not been setup properly then the dialog box will show an appropriate message and sk the admin to complete those steps before publishing the course. These conditions are as follows:
  -- Course details should be filled up
  -- At least one module with at least one learning item should be added in the curriculum
  -- At least one student should be added in the student list and also assigned to a created batch
  If these conditions are not fulfilled, then show an appropriate error message when trying to publish the course and nudge the user to first complete these steps

**Below feedback points pertain to the tabs under the course**

### General Details

- For the course image, move the “Upload New Image” and “Remove Image” buttons below the image and place them one below the other

### Curriculum

- Currently the module and project edits do not work. It gives a alert dialog box. However, show a modal with the same details as we enter during the addition of a new module or project with the current modules or projects details. This can be done for the first module and one of the project in the curriculum
- Clicking the project should open the side panel with the title, deadline and rich text box description. At the bottom it should have "add project" or "Save Changes" CTA depending on if it is first time or editing the project details
- Check the sidepanel.png file images folder. It shows the sidepanel which is used for all creation and editing of various content types. The top bar still has two close buttons. Need to remove one which is misaligned with the title. The bottom separator and the CTA should be aligned to the bottom of the panel view in space apart setting vertically. If there is more content in the panel then it is scrollable while the separator and CTA are fixed to the bottom and above the content that scrolls below

### Students

- In the actions, remove the view student. Instead have edit, contact student and mark as dropout and delete actions. Edit action allows to edit the name and email of the student. The process can be made inline editing in the columns of the table itself

### Batches

- Allow the admin to edit details of the batch. Edit icon can be given on the top right
- Clicking "View Students" is taking to the students tab but the admin should see the students of only this batch. We can have the same table as in students tab but without the batch and enrolled date columns

### Submissions

- WHen clicking a submission of any type, the submission details table of the students open below the tabs. It does not get much space. Check the screenshot submissions.png in images folder. We can open it on a new page so that all the tabs form before do not show and going back takes back to the tabbed interface of course page under submissions

## Content Bank

- Remove the view action icon button. Clicking on the row itself should open a preview modal showing the question details depending on the type of question
- Edit action icon button should open the edit version of the modal for the particular question. Should work for all question types

## Settings

### Manage Role Functions

- Interface needs some changing. All action categories and actions are applicable to all roles. Use the top admin, ops and instructors cards as tab selection
- Consider a two panel interface. The left sidebar which is like 25% of the split of the container shows the actions for that particular selected role. We do not need to categorize the actions anymore
- For any selected action, the right side of the container shows the permissions in that action. Each action is broad and can have many different permissions. These appear as checkboxes which can be selected or not selected
- Make up some permissions for each action
- Also, there is a need to add, edit or delete the actions and also add, edit or delete the permissions in each action. Think of how to best showcase these functions in the same interface
