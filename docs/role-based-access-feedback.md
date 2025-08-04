**Feedback after first implementation**

# General Change

- Use the same container width as in other tabs like dashboard, course studio, content bank instead of full width container
- There are only 3 users - Admin, Ops, Instructor. Admin can full access to all functions. Remove the Super admin role in all places

# Secondary header

- Remove the Settings heading and "Manage users, roles, and permissions for your organization" description. Keep only the two tabs
- Change name of "Manage Roles" tab to "Manage Role Functions"

# Users tab

## Invite Users via Link

- Replace the current description line with "Generated invite links will be automatically copied to your clipboard. Share them with the intended users who will be automatically assigned the selected role upon signup" from the note and remove the note

## Users table

- Add actions columns which will have icon buttons for edit and delete
- Edit action would open the form to edit the user details
- Delete action would ask for a confirmation to delete a given user
- Add filters for role
- Remove the status column

## Add New User Modal

- Remove the super admin role. Description of admin will change to "Users who have full access to all functions of the platform"

# Manage Role Functions tab

- Remove the add role and add action buttons and functionality related to them. This are like full features that need to be implemented before adding them here. So, it will happen manually not here
- Remove the super admin card and update the description of admin card
- Remove the permission notes card
- Change the scoped access to just no that is the checkbox won't be selected
- There are some changes to the actions. Please refer to the role-functions.png image in the role-images folder and update the various categories accordingly
- Even though the actions are grouped in categories, align the columns for ops and instructor roles. Refer to image "role-functions-table.png" in role-images folder
