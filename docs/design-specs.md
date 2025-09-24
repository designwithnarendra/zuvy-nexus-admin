Curriculum tab

Add Module/Project modal

- Add the duration field for both module and project. Duration should be in weeks. This will also be used to calculate total duration of the course
- No need for the "type" header above the radio selection for module and project

Module/Project cards

- Cards are selectable and user will go inside a project or module on clicking the card
- Edit button is not for going in the module where the module items or project details are. Edit button will open a modal with edit terminology. Changing to and from module or project is not allowed but other fields can be changed

Inside the module on module content page

- Page should be scrollable independently. The left panel is scrollable separately without affecting the main content area. And main content area is scrollable without affecting the left panel. In all this, the whole page does not scroll by itself
- For each content type, add the content type name below the title and before the time or due date i.e. if it is an assessment, it should be like "Assessment . Due: Dec 15, 2025"
- Ensure the content type name font size is 14px (in rem)
- Connect each of the content types to the content type button when clicking "Add Content" button so it works properly

Changes for the content area of each content type when a content type is selected. Clear out what is already there when selecting any content type. Show at 1 of each type by default

Also note the following:

- There will be no card wrapper for the fields unless specified
- Title for each content type can be in a different style where it is in h5 size and editable as a text field but in underline style not the box style
- For a newly created item, the CTA will be "Add {content type name}". But, if the user is returning to an item to edit it, CTA will be "Edit {content type name}" after the first creation
- If user does not click "Add" CTA or "Edit" CTA for any of the content types, a warning modal will be presented. If not confirmed then the changes will be discarded

Live Class

- Have title, description, date, start time, duration
- Add a message that a Zoom class link will be generated and email to everyone
- Add Live Class CTA

Video

- Have title, description, video source - Youtube or direct upload and Transcript
- In video source, admin should put youtube URL for youtube. A bookmark preview should come. If upload option is selected, show a upload area stating to drag and drop or click to upload a video file
- For transcript, show a upload area to upload the transcript file. Keep it optional

Article

- Have title, content type - rich text, external link, upload
- In rich text option, show a rich text box where user can type and format the article
- In external link option, show a text box to enter the article link. Admin should see a bookmark view of the article
- In upload option, show a upload area to upload the article file in PDF

Assignment

- Have title, instructions in text box or upload as PDF option, due date (optional and mention leave empty if no due date)

Coding Problem

- Have title. Then search bar and filters for topic selection and difficulty
- Below these the content area is divided into two parts in 4 by 6 ratio. Left part will show the list of coding problems from the content bank listed here
- Each coding problem listed in left part will have the title, tags for topic and difficulty, preview button and a "add icon button"
- "Add" icon button changes to "minus" button to remove it when a coding problem is selected
- Clicking preview button opens a modal with full details of the coding problem including test cases etc. Make a few sample problems to show here
- At a time only one coding problem can be selected
- Selected coding problem's full details appear in the right part which ability to remove it from here as well

Quiz

- Have title. Then search bar and filters for topic selection and difficulty
- Below these the content area is divided into two parts in 4 by 6 ratio. Left part will show the list of MCQs from the content bank listed here
- Each MCQ listed in left part will have the title, tags for topic and difficulty, preview button and a "add icon button"
- "Add" icon button changes to "minus" button to remove it when a MCQ is selected
- Clicking preview button opens a modal with full details of the MCQ i.e. the question (image if any) and the answer choices with the correct one highlighted. Make a few sample questions to show here
- Multiple questions can be added with no upper limit
- In the right part, show the selected question in a similar way as on the left with the ability to remove it from here

Feedback Form

- Have title and a question creation functionality
- By default show the fields to create first question title question 1 with delete icon on the right
- Have question type, required option, question text fields
- Question type can be short text, long text, rating, date, time, multiple choice, single choice
- Rating should be in 1 to 10. Admin can add labels for 1, 5, and 10
- In multiple choice and single choice, admin can add answer option. Since it is feedback form, there is no correct answer in these cases
