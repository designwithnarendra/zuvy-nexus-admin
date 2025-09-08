**Design changes**

# General Change

- The user should land on the course studio page directly as we have hidden the dashboard page however, dashboard page is the landing page right now
- Many pages have cramped tables. Stretch the content for full width of the screen similar to how the header is. This will now apply to all pages on the platform
- Barring the header, keep the height of all solid buttons across the platform to 48px. Only change the height if specified otherwise
- Highlight color on hover for dropdowns on actions icons anywhere in the platform should have primary light color for background and the icon color should be primary

## Settings

- Change the name of "settings" tab "Roles and Permissions"

### Manage Role Functions

- Add a button to the right of the manage role functions labelled "Add New Role". This opens a modal with one field called "Role Name"
- Newly added role name appears in the tab and give the circle for role an appropriate color
- For any new role that is added to the roles tab, the screen space for that tab will start as empty and admin is prompted to add the first role action that appears in the left side bar
- Increase the width of the left sidebar to 35% of the screen space
- Change the "Actions for Admin" to "Role Actions"
- Remove the "Add" button and instead move the add button to the bottom of the last action in the sidebar
- For a new role action, the right part of the screen will be empty initially and admin is asked to add the first permission for that role action
- Clicking on the "Add Permission" opens a modal with permission name, permission description
- Upto 3 permissions card can be shown in a row
- Don't show the edit and delete icons normally on the card. Only show edit icon on hover on the permission card and role action cards. On editing, the modal for permission or role action card will appear in edit mode and also have the delete action below it which will ask for a confirmation if user wants to do it
- To simulate these, keep things how it is for Admin, Ops and Instructor roles for now. But, admin should be able to simulate this flow from adding new role, its empty state to adding role actions and permissions in the role actions
