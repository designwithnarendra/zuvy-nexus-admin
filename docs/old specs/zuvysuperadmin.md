We are going to add a role for superadmin. The design remains similar to the admin with basically changes relating what is available to the superadmin and what is not. Details specs to change from admin role as follows:

# General SuperAdmin Changes

- In the current role selector page add 1 more choice and ask the user if they are superadmin, admin or instructor. If they choose admin, show the things as they are for admin. If they choose instructor, show the things as they are for instructor. If they choose super admin, then show the interface according to the instructions described below for each section.
- Card Description for Super Admin would be Heading As Super Admin, 
- In the header, show a tag stating the user is super admin similar to one shown in case of admin and intstructor on the top right just left to the logout icon button. Use info for text and info light for its background

Changes to each section when super admin role is selected

# Content Bank

- It will remain as it is for admin. No changes

# Course Studio

- It will remain as it is for admin. No changes

# Roles and Permissions

- Users Tab needs to be replaced by Organisation Tab
- Hide Invite Users via Link card. This functionality is not there as of now.
- After this show a heading for Organisations (XX) where XX is the count of organisations in the platform. The heading will be on the left and show a button in primary “Add Organisation” on the right i.e - Instead of Add User Button it should be Add Organisation Button
- A table of organisation will list different organisations onboarded on the platform. Columns will be Organisation, POC Name, email, management Type, Date Added and Actions . It can be changed by any super admin (use table style like in Question bank)
- Management Type column will be a dropdown for each row. The dropdown has the following options:— Self managed: Organisations who manage all functions on the platform, Zuvy Managed: Organisations for whom Zuvy manages all functions on the platform
- Actions columns which will have icon buttons for edit and delete
- Edit action would open the form to edit the organisation details
- Delete action would ask for a confirmation to delete a given organisation
- Add filters for management type and a search bar as it is there curently
- Manage Role Functions tab will be as it is. No changes 



## Add Organisation Modal

- A form with the fields for Organisation name, POC name, email and picking a Management Type. Management Type can be rectangular selection where each card has Management Type title and the short description of what it is. (Self managed: Organisations who manage all functions on the platform, Zuvy Managed: Organisations for whom Zuvy manages all functions on the platform)
- Only one Management Type can be selected 


Now lets proceed towards making changes for User Role as Admin
Under Roles and permission