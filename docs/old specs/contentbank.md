# Content Bank Table Page

- Remove the "Generate With AI" button. Instead add "Manage Topics" button

# Manage Topic Modal

- After the header, show a note "Questions can be made for these topics in the content bank"
- List the topics as chips which wraps depending on the number of topics within the modal
- On hovering a cross icon appears on the right of the chip clicking which removes the topic
- New topic can be created via a text button at the bottom left

# Coding Problem Modal

## Details tab

- Remove the description field
- Add constraints field after problem statement
- Add difficulty field which will be a radio button group and only one of easy, medium or hard can be selected
- Add a topic field which will be dropdown with options from the manage topics

## Test Cases tab

- Test case heading should be in h6
- For input field refer to testcase.png. Input has a dropdown for the type and then the field. Multiple input fields can be added
- Output field remains one but it is also a dropdown for the type and then the field
- Add Test Case button will be a text button with + icon

## Code setup tab

- Remove this tab. No need for it

# Open Ended Question Modal

- Currently, it returns an error
- The modal will have the heading and close icon aligned together at the top
- A text area field for question
- Add difficulty field which will be a radio button group and only one of easy, medium or hard can be selected
- Add a topic field which will be dropdown with options from the manage topics
- "Create Question" CTA on the bottom right

# Multiple Choice Question Modal

- Three tabs: One at a time, Bulk Upload, Generate with AI

## One at a time tab

- Topic and difficulty will be at the top
- Then, introduce a tabbed system to add variants of the same question. Variants get randomly distributed when a question is selected for an assignment or quiz. Refer to the variants.png
- Under any of the variant tab, show question field which will be a rich text area field and then the answer options. Remove the outer wrapper for the answer options

## Bulk Upload

- Enable the currently disabled tab and show a bulk upload areas with able to select it. Refer to bulkupload.png

## Generate with AI

- Ask for difficulty. Here, it will be a checkbox selection
- There will be topic name and no.of questions field. Questions can be 1 to 10
- On generation of the questions, the user should be able to check the question, answer options and make adjustments or delete them as preview
- Limit to create questions for max 3 topics and max 10 questions in each topic at a time
- Refer to generatewithai.png
