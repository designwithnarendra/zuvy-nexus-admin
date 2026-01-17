# General Change

- Add a new tab in the header “Settings” next to “Content Bank”
- Create a secondary header just below the main header with two link buttons - “Users” and “Manage Roles”

# Users tab

## Users page

- Have a invite users via Link heading with a description of Invite users using the link based on role
- Have two button in primary and secondary color for “Invite Ops” and “Invite Instructors”
- Any invited users who accept the link get added to users table
- After this show a heading for Users (XX) where XX is the count of users in the platform. The heading will be on the left and show a button in primary “Add User” on the right
- A table of users will list all the members of the platform. Columns are Name, email, role. Role is the the role that user is assigned to while adding. It can be changed by any admin (use table style like in Question bank)
- Role column will be a dropdown for each row. The dropdown has the following options:— Super Admin: Users who have full access to all functions of the platform— Admin: Users who have all functions of the platform accept the ability to modify user roles— Ops: Users who see day to day operations of the courses for Zuvy— Instructors: Users who teach the live classes in the courses and check submissions

## Add User Modal

- A form with the fields for name, email and picking a role. Role can be rectangular selection where each card has role title and the short description of what it is
- Only one role can be selected

# Manage Roles (refer roles-images/role-functions.png for the actions and the default functions allowed for ops and instructor roles)

- In this tab, admin can manage what functions are allowed for the two roles ops and instructor
- Super admin and admin roles have set functions all the time so, precise control is not needed for them
- We can utilize a table like format for the interface with 3 columns. A table with Manage Roles heading on the left and a button in primary “Add Role” and a button “Add Action” in the right
- Actions column lists the functions that a role can have. The Ops, Instructor (or other role column in future) can be have checkboxes which can be checked or unchecked. By default use the configuration mentioned below. Have to confirm the scoped access. Just consider it “yes” for now
- For add role modal, just ask for its name and add a column with no checkboxes selected in the beginning
- For add action modal, just ask for its name and a row in the last of the table with corresponding checkboxes unchecked for all roles
