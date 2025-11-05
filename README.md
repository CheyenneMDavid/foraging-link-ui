# The Foraging Link

## Project Description

The **Foraging Link** is a React-based front end that connects to the [ForagingLink-API](https://github.com/CheyenneMDavid/ForagingLink-API).  
It provides a user interface for browsing blog posts, commenting and replying, managing user profiles, and registering for seasonal courses.

## Table of Contents

- [The Foraging Link](#the-foraging-link)
  - [Project Description](#project-description)
  - [Table of Contents](#table-of-contents)
  - [User Stories](#user-stories)
  - [Features](#features)
    - [Pages](#pages)
    - [Components](#components)
      - [Global Components](#global-components)
      - [Post Components](#post-components)
      - [Comments Section Components](#comments-section-components)
      - [Course and Course Registration Components](#course-and-course-registration-components)
      - [Initial Setup](#initial-setup)
      - [Temporary Setup for Testing](#temporary-setup-for-testing)
      - [Refining the Form](#refining-the-form)
      - ["Hooking in" User Data](#hooking-in-user-data)
    - [Post Management Features](#post-management-features)
      - [Current Features](#current-features)
      - [Future Planned Features](#future-planned-features)
  - [Planning](#planning)
    - [Wireframes](#wireframes)
      - [Component Planning](#component-planning)
        - [Comments Section](#comments-section)
  - [Development Notes](#development-notes)
    - [CourseRegistrationForm – Development Journey](#courseregistrationform--development-journey)
  - [List of Reusable Components](#list-of-reusable-components)
    - [LikeAndUnlike Component](#likeandunlike-component)
  - [Design Choices](#design-choices)
    - [Colors](#colors)
    - [Components and Functionality](#components-and-functionality)
    - [Form Validation and Defensive Design](#form-validation-and-defensive-design)
  - [Development Challenges \& Solutions](#development-challenges--solutions)
    - [Form Submission Rejected Due to Phone Format](#form-submission-rejected-due-to-phone-format)
    - [Course Registration Submission – Format and Field Issues](#course-registration-submission--format-and-field-issues)
    - [Naming Conflicts](#naming-conflicts)
    - [Authentication Redirect – Page Refresh Issue](#authentication-redirect--page-refresh-issue)
  - [Later Dev Fixes](#later-dev-fixes)
    - [Refactoring Post.js and PostsList.js](#refactoring-postjs-and-postslistjs)
    - [Handling Comments and Replies](#handling-comments-and-replies)
      - [**Additional Fixes to Ensure Replies Display Correctly:**](#additional-fixes-to-ensure-replies-display-correctly)
    - [Use of Email – Front-End](#use-of-email--front-end)
  - [Credits](#credits)
    - [Images used for grid back ground](#images-used-for-grid-back-ground)

## User Stories

| Feature              | As    | I Want To                                | So That I Can                                 | Backend Functions                                                  | UI Components                                                                                    |
| -------------------- | ----- | ---------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Authentication       | user  | sign-up for an account                   | access the application securely               | Managed by Django Allauth                                          | Sign up page                                                                                     |
| Authentication       | user  | sign in to my account securely           | use the application                           | Managed by Django Allauth                                          | Sign in page                                                                                     |
| Authentication       | user  | sign out of my account securely          | ensure the privacy of my data                 | Managed by Django Allauth                                          | Sign out page                                                                                    |
| Comments             | user  | read comments and replies                | engage with discussions                       | `list()`, `retrieve()` (via `CommentList()`, `CommentDetail()`)    | Post list page                                                                                   |
| Comments             | user  | create comments or replies               | ask or answer questions on posts or comments  | `create()` via `CommentList()`                                     | Post detail page, Comment button, Comments form                                                  |
| Comments             | user  | edit comments                            | make corrections or updates                   | `update()` via `CommentDetail()`                                   | Post detail page, Edit comment button, Edit comment form                                         |
| Comments             | user  | delete comments                          | remove my comments from the post              | `destroy()` via `CommentDetail()`                                  | Post detail page, Delete comment button, Confirm Delete Modal                                    |
| Likes                | user  | like a post or comment                   | show appreciation for what's been written     | `create()` via `LikeList()`                                        | Post detail page, Like/Unlike button                                                             |
| Likes                | user  | unlike a post or comment                 | unlike if I changed my mind                   | `destroy()` via `LikeDetail()`                                     | Post detail page, Like/Unlike button                                                             |
| Followers            | user  | follow other users                       | I can engage with content that interests me   | `create()` via `FollowerList()`                                    | Profile page (other users), Follow/Unfollow button                                               |
| Followers            | user  | unfollow other users                     | disengage from content that I no longer enjoy | `destroy()` via `FollowerDetail()`                                 | Profile page (other users), Follow/Unfollow button                                               |
| Courses              | user  | view available courses.                  | choose one I wish to go on                    | `list()` via `CourseList()`, `retrieve()` via `CourseUpdateDelete` | Course list page, Course detail page                                                             |
| Courses              | admin | create courses                           | plan and publish future events                | `CourseCreate()`                                                   | Handeled by Django Admin panel                                                                   |
| Courses              | admin | Update and Delete                        | update course details and remove old courses  | `update()`, `destroy()` via `CourseUpdateDelete()`                 | Handeled by Django Admin panel                                                                   |
| Course Registrations | user  | fill out a contact form                  | register my interest in attending a course    | `CourseRegistrationCreate()`                                       | Course Detail Page, Contact Registration Form, Submit Form utton                                 |
| Course Registrations | admin | have full CRUD ability for contact forms | manage course attendees                       | `CourseRegistrationDetail()`                                       | Handeled by Django Admin panel                                                                   |
| Plant Blog           | admin | have full CRUD capability for posts      | manage site content                           | `PlantInFocusPostCreate()`                                         | Handeled by Django Admin panel                                                                   |
| Plants Blog          | user  | read blog posts                          | learn about the plants I wish to forage       | `PlantInFocusPostList()`                                           | Postlist page, Post detail page                                                                  |
| Profiles             | user  | read user's profiles details             | engage with my fellow users                   | `list()` via `ProfileList()`, `retrieve()` via `ProfileDetail()`   | Profile list page (other users), Profile detail page                                             |
| Profiles             | owner | update and delete my profile             | update my info or delete my account           | `ProfileDetail()`                                                  | My Profile page, Update button, Delete Profile Button, Update Profile Page, Submit Update Button |

## Features

### Pages

- **`HomePage.js`** (in `pages/`): Serves as the main landing page, displaying:

  - `PostsList`
  - `HeroBanner`
  - `Sidebar` with upcoming course dates

  Its purpose is to provide an entry point for users with key content and clear navigation options.

- **`PostPage.js`** (in `pages/`): Provides the detailed view of a single post.

---

### Components

#### Global Components

- **`NavBar`**: Shows navigation options based on the user's status (signed in or signed out).
- **`Avatar`**: Displays the user’s profile picture.
- **`Footer`**: Contains social media links at the bottom of the screen.

#### Post Components

- **`PostsList`**: Displays a list of all blog posts for users to browse.
  
- **`Post`**: Displays a single post with details such as title, image, content, author, and
  published date.

- **`PostPage`**: Fetches and displays the full details of a specific post, including its comments.

#### Comments Section Components

- **`CommentsSection`**: The main container for all comments related to a specific post. It uses the
  `Comment` component to show:

  - First-level comments on a post.
  - Second-level nested replies to other comments.

#### Course and Course Registration Components

- **`Sidebar`**: In desktop view:
  - Conditionally displays the most popular users, but only if the current user is authenticated. Else, it displays a prompt to sign in.  In mobile view, the `Sidebar` is hidden, and again, the `PopularProfiles` component or a prompt to sign in are displayed according to whether the current user is authenticated

  - Displays UpcomingCourses as a list of the 3 soonest courses, showing title, date, location, and available spaces. Available spaces are dynamically calculated by subtracting the number of registrations from the course’s max capacity.

  - Each list item links to the details page for that course.

- **`CoursesListPage`**: Displays all courses.  Each of the list items acting as a link to that specific course's detail page.
  
- **`CoursePage`**: Displays the detail of an individual course, the available spaces and a **`Book Now`** button which takes the unauthenticated user to the sign in page and the authenticated user to the registration form.

- **`CourseRegistrationForm`**: Displays a user's name and email address as fixed values which are taken from the user profile, whilst all other fields are editable, requested input for:
  - Phone number
  - Whether they are a driver
  - Any dietary restrictions
  - An emergency contact (I.C.E.)

If checked, both the Dietary Restrictions and I.C.E. checkboxes open additional required fields that must be completed before submission.

---

#### Initial Setup

- Created `CourseRegistrationForm.js`.
- Used controlled components with `useState` for each form field.
- Used a basic `handleSubmit` function to send data to the backend using a plain JavaScript object.

#### Temporary Setup for Testing

- Hardcoded `<CourseRegistrationForm courseId={1} />` in App.js.
- Accepted courseId as a prop inside the form component.

- Allowed consistent testing and styling before adding dynamic routing with the use of `useParams()`

#### Refining the Form

- Replaced hardcoded `courseId={1}` with a dynamic route using `useParams` in React Router.

- Updated route to `/register/:id`.
- Changed form to extract `id` from URL and use it for submission.

#### "Hooking in" User Data

- Added `useCurrentUser` context.

- Fetched user name and email via API and displayed them as fixed (non-editable) values in the form.
- Used `console.log`() to inspect `currentUser` and verify profiles data and emails were loading correctly.

### Post Management Features

#### Current Features

- While complete post management is handled by admins in the backend, the front end provides basic
  editing and deleting features for admins, limited to posts they authored. This allows for quick
  edits without needing to access the backend for minor tasks

- Displays the total number of likes (`likes_count`) for each post.
- When a user likes or unlikes a post, the `likes_count` dynamically updates without requiring a page refresh. This is achieved through state updates in the `PostPage` component, which interact with the backend API.

#### Future Planned Features

- Introduce a **moderator** tier of users with permissions greater than regular authenticated users.
  Moderators will be able to:
  
  - Create, read, update, and delete their own posts.
  - Manage posts without requiring full access to the admin panel.

## Planning

Diagram showing the structure of the the application through it's **applications and the
permissions** that facilitate it's use.

![Applications and Permissions Diagram](https://res.cloudinary.com/cheymd/image/upload/v1731508996/foraging_link/readme_images/apps_and_permissions_dazayh.png)

### Wireframes

All desktop wireframes are based on a screen size of 1920 x 1080, with the main view limited to
1200px wide. All mobile wireframes are based on the Samsung Galaxy S20 screen size of 360 x 800.

The colors used in the wwireframes are not representational of the sites colors. They are simply
alternating colors to show division.

**Homepage Wireframe - Desktop view** (also serves as the homepage/landing page)

![Desktop Homepage](https://res.cloudinary.com/cheymd/image/upload/v1731488079/foraging_link/readme_images/desktop_homepage_and_post_list_ahmz0c.png)

**Post Detail - Wireframe - Desktop view**
![Desktop Post Detail](https://res.cloudinary.com/cheymd/image/upload/v1731488211/foraging_link/readme_images/desktop_post_detail_irfqvk.png)

**Comments - Expanded - Wireframe - Desktop view** Comments display only if there are any to show.
The pen and trash icons, representing edit and delete actions, appear conditionally in each comment
box, visible only if the comment belongs to the currently signed-in user.

![Desktop Expanded Comments](https://res.cloudinary.com/cheymd/image/upload/v1731488210/foraging_link/readme_images/desktop_post_detail_expanded_comments_kvjrje.png)

**Homepage Wireframe - Mobile view**:

![Mobile Homepage](https://res.cloudinary.com/cheymd/image/upload/v1731488209/foraging_link/readme_images/mobile_homepage_and_post_list_qbtj7t.png)

**Post Detail - Wireframe - Mobile view**:

![Mobile Post Detail](https://res.cloudinary.com/cheymd/image/upload/v1731488209/foraging_link/readme_images/mobile_post_detail_g12mha.png)

**Comments - Expanded - Wireframe - Mobile view** The pen and trash icons in the comment box,
indictating edit and delete are conditionally displayed, depending on whether the comment belongs to
the currently signed-in user.

![Mobile Expanded Comments](https://res.cloudinary.com/cheymd/image/upload/v1731488212/foraging_link/readme_images/mobile_post_detail_expanded_comments_fqif0x.png)

The G displays the user's name and email as fixed values. Additional fields, including dietary restrictions and emergency contact, appear only when the relevant checkboxes are selected. The layout and conditional fields are shown in the screenshot below.

![Course Registrtation Form](https://res.cloudinary.com/cheymd/image/upload/v1754443368/foraging_link/readme_images/course_registration_form_b7xatk.png)

#### Component Planning

The component planning aims to break down the application into manageable parts, focusing on reusable components to maintain consistency and modularity.

##### Comments Section

The comments section is by far the most complex part of the application, due to the number of functionalities and conditional displays involved. To simplify and manage this complexity, I decided to break the functionality into individual reusable components which can then also be used by Posts.

## Development Notes

### CourseRegistrationForm – Development Journey

- I started with `CourseRegistrationForm.js` using controlled inputs with `useState`.

- Then, temporarily hardcoded `<CourseRegistrationForm courseId={1} />` into `App.js` to enable simple testing without anything else bluring the task.

- Later replaced with dynamic routing using `useParams()` from React Router.
  
- Used useCurrentUser to fetch and display the user's name and email.

- Used `console.log`() to verify user data before building logic for fixed fields, editable inputs, conditional sections, and final submission using `FormData()`.

## List of Reusable Components

### LikeAndUnlike Component

1. **LikeUnlike Component**

   The LikeUnlike component is utilized in both posts and comments. It dynamically updates the likes_count in the UI using "Optimistic Updates", provides immediate feedback by modifying the count locally before confirming changes with the backend.
   It conditionally renders according to the user authentication: a filled heart for liked items, an outlined heart for unliked items, and a static heart if the user isn't logged in.

2. **Comments**
    - Comment Section which follows the associated posts and contains the comments with comment input boxes.
    - Individual comments have a toggle-reply button which then opens a reply input box with a 'Post Reply' button.
  
3. **Three Dots - More DropDown**
   - Provides Edit and Delete functions for the author of a comment.
  
**Note**: H1 heading above is temporary and will be removed or changed before the final version.

## Design Choices

### Colors

The colors selected for "The Foraging Link" were chosen to align with colors found in nature, gentle
on the eye, but also a rewarding depth

- Navigation icon/links

  - Default color: #532402 (brown)
  - Icon color on hover: #ffa500 (orange)
  - Current page: #619158 (green)

- Text #f5f5f5 (Whitesmoke)

- Buttons

  - Default color #856404 (gold)
  - Color on hover #ffa500 (orange)
  - Border #ffffff (White)

- Lines and Borders

  - #856404 (gold)

- Site Background
  - Background color: #0d0d0d (dark grey / almost black) chosen in contrast to the vivid colors that plants offer

### Components and Functionality

**NavBar**. Conditional display of navigation elements based on whether a user was signed in or
signed out. Intention is to engage with potentiial users, ecouraging them to join. So, the site
content is open to the public, but the ability to engage with the site content is restrictesd to
users.

- **Signed out**, displays `Home`, `Courses`, `Sign in`, `Sign up`

- **Signed in**, displays `Home`, `Courses`, `Profile` and `Sign out`
  
- **Post Listings Display**  
  The posts in the listings are presented in a condensed format to provide a quick overview. The images are styled to take up 100% of the width but only 30% of the viewport height `30vh`, ensuring consistent and proportional scaling, accompanied with a short text excerpt taken from the "Culinary Uses" field, to give users a glimpse of the content without overwhelming the interface.

  Although each post displays a heart icon and a speech bubble with their corresponding counts (if available), the icons are not interactive in the post listings. Unlike in the detail pages, where clicking these icons updates the counts, the icons in the listings are purely decorative. This design choice was made because the hover effect on the icons suggested interactivity, which could mislead users. A color change on hover without any resulting action would have conveyed a sense of incompleteness, so this behavior was removed for the post listings and saved for the detail page for a post which the entire post in the listed content is a link for.

### Form Validation and Defensive Design

Whilst the Sign-up and Sign-in forms were parallel to Code Institute's `Moments` walkthrough
project, the expected behaviour of a returned message informing the user that the field couldn't be
left empty didn't happen.

The first solution considered was to set an error state with conditional logic to display specific
messages when fields were left empty. This approach proved needlessly complex. The second solution
was to use React Hook Form, but for the simplicity needed in this form, it felt like overkill.
Instead, adding a simple `required` attribute did the job effectively, keeping the solution
browser-friendly. This approach uses the browser’s own validation, so users get instant feedback
without extra code, making it simple and efficient.

## Development Challenges & Solutions

### Form Submission Rejected Due to Phone Format

When testing the form submission for course registrations, the failed submission was traced back to the backend validation expecting +44.

This was resolved by adding logic to `CourseRegistrationForm.js` which would check phone numbers for a preceding 0 and swap it for +44 before saving to the database in a format that the validation was expecting, like so:

```js
const convertPhone = (num) => {
  if (num.startsWith("0")) {
    return "+44" + num.slice(1);
  }
  return num;
};
```

### Course Registration Submission – Format and Field Issues

Initially, form submission failed because the backend expected `multipart/form-data`, but the frontend was sending a plain JavaScript object.

**Solution:**
Replaced the plain object with a `FormData()` instance to meet the backend’s expectations:

```js
const formData = new FormData();
formData.append("name", name);
```

### Naming Conflicts

When first creating the `PostPage`, I had difficulty fetching data, unable to get it to display the
returned JSON data in the devtools console. The issue was tracked to a mismatch in naming between
the frontend and backend.

This was resolved by:

1. Correcting the URL paths in the backend application's `urls.py` files.
2. Aligning the Axios request in the frontend to match the corrected backend paths.

Fixing **Like and Unlike** Logic
Initially following the logic for liking and unliking posts was modeled after the walkthrough project. But when liking and unliking it, instead of displaying a number or a zero, or have an absence of a number due to being zero, NaN would be displayed. Upon refreshing the page, it would return to it's expected behaviour.
The likes_count value wasn't being initialized properly when it was undefined or null.

To resolve this, the logic to handle edge cases:

- For liking a post, likes_count is initialized to 0 if
  it'sundefined, ensuring it increments correctly.

- For unliking a post, likes_count defaults to a 1 before
  decrementing, ensuring it never becomes NaN. Also, by setting it to 1 before decrementing, it doesn't run the risk of becomeing a negative number.

### Authentication Redirect – Page Refresh Issue

Refreshing the `CourseRegistrationForm` page always redirected to **Sign In**,  
even when already signed in.  

This happened because `CurrentUserProvider` rendered its children before the  
`/dj-rest-auth/user/` request finished. On refresh, `currentUser` was briefly  
`null`, which triggered a false redirect.  

As part of troubleshooting, I also updated `SignInForm.js` to use `axiosReq`  
instead of plain `axios`. This keeps the login request consistent with the  
rest of the API calls, though it wasn’t the direct fix for the redirect issue.  

The actual fix was adding an `isLoading` state. While `isLoading` is `true`,  
children aren’t rendered. Once the request completes, `finally` sets  
`isLoading` to `false` — essentially providing a short delay before the page  
is rendered.

## Later Dev Fixes

Had to change from object to useParams
Added logic to check for leading zero in phonenumber and swap it for +44 before saving in database.
Filling all fields in allowed 201

But leaving fields such as ICE contact, not filled in, despite not ticking the bock was stopping submission.
I was able this by using devtools to check the network response.
It's appeared that despite using clean(), django was still treating the fields as required.
So adding Even though you're enforcing conditional logic in clean()
Only by adding

```python
    blank=True, 
    null=True,
```

and specifying that these could be as such, did django allow this.

### Refactoring Post.js and PostsList.js

Initially, Post.js was created as a reusable component. However, during development it was not properly imported and utilized within PostsList.js and PostPage.js as intended. This oversight led to duplicated logic and inconsistencies in the display of post details between the list and detailed views.

To address this, Post.js was integrated into both components, enabling more consistency in styling and behavior across the different views.

To enable the list page for posts to display the posts in a condensed manner, conditional logic was added via the "isListPage" prop and was used to format the image display and create truncated text in the list page.

### Handling Comments and Replies

The app allows users to comment on posts and reply to existing comments. To manage this functionality efficiently:  

- **`CommentCreateForm`** is a reusable component used for posting top-level comments on posts.  
- **`ReplyCreateForm`** was created separately because reusing `CommentCreateForm` inside comments led to import conflicts and structural issues.  
- **`ReplyCreateForm`** is imported into `Comment.js` specifically for handling replies to existing comments.  

#### **Additional Fixes to Ensure Replies Display Correctly:**  

- Fixed retrieval logic so replies are properly linked to parent comments.  
- Updated **CommentsSection** and **Comment** components to correctly handle and display nested replies.  
- Ensured **likes_count** and **replies_count** are correctly passed and rendered to track comment interactions.  
- Debugged API calls and adjusted how state updates to prevent missing or duplicated replies.  

This structure **avoids circular imports, improves retrieval accuracy, and ensures a functional commenting system.**

### Use of Email – Front-End

Originally, the front end did not collect email addresses during signup — registration was limited to username and password only. While `django-allauth` handled email collection on the backend, that data wasn’t accessed by the frontend interface.

However, once course registration functionality was introduced, email became necessary for associating a logged-in user with a booking. As a result, the frontend was updated to:

- Initially allow users to enter their email manually.  
- Later replace that field with a fixed, read-only display of the logged-in user’s email, since only authenticated users can submit the registration form.

At this stage, the frontend **does not perform any email validation itself**. It relies entirely on the backend’s validation. Future updates will include more robust validation checks

---

## Credits

- **[Favicon.io](https://favicon.io/favicon-generator/)** : Used to generate the favicon.  
- **[Font Awesome](https://fontawesome.com/icons)** : Icons used in the navigation.  
- **[Picsart](https://picsart.com/)** : Tool used to create the logo.  
- **[Symbl.cc](https://symbl.cc/)** : Resource for Unicode characters.
- **[color-hex by RKWhite2](https://www.color-hex.com/member/rkwhite2)** : Color for buttons according to season, in course detail pages

### Images used for grid back ground

**Apple Blossom**
Photo by [Marc Cordeaulash](https://unsplash.com/@_marcram) on [Unsplash](https://unsplash.com/photos/a-close-up-of-white-flowers-on-a-tree-Wq0EfJcVc7M)

**Nettles**
Photo by [Paul Morely](https://unsplash.com/@mobography) on [Unsplash](https://unsplash.com/photos/green-leaves-plant-DrYqMhk53dY)

**Dandilion**
Photo by [Walter Strun](https://unsplash.com/@walter46) on [Unsplash](https://unsplash.com/photos/four-yellow-petaled-flowers-kKmSRORgcnM)

**Hairy Bittercress**
Photo by [Bekarys Khozhanazar](https://unsplash.com/@aarys) [Unsplash](https://unsplash.com/photos/a-field-full-of-green-plants-with-lots-of-leaves-GK-P7M1UVE0)

**Seaweed**
Photo by [Ben Wicks](https://unsplash.com/@profwicks) on [Unsplash](https://unsplash.com/photos/yellow-and-black-leaves-on-water-_thl1SQCbPE)

**Seaweeds**
Photo by [Martin Dawson](https://unsplash.com/@dawsino) on [Unsplash](https://unsplash.com/photos/a-close-up-of-a-green-grass-field-Psx_SS2uUjM)

**Summer Plums**
Photo by [Kier in Sight Archives](https://unsplash.com/@kierinsightarchives) on [Unsplash](https://unsplash.com/photos/a-bowl-of-berries-Jf459MsgEIw)

**Ramsons Leaves**
Photo by [Nikolett Emmert](https://unsplash.com/@niki_emmert) on [Unsplash](https://unsplash.com/photos/a-bunch-of-green-leaves-with-water-drops-on-them-9PGNK9Gaf8c)

**Sea Buckthorn**
Photo by[Yulia khlebnikovayulia](https://unsplash.com/@khlebnikovayulia) on [Unsplash](https://unsplash.com/photos/brown-and-white-flowers-in-tilt-shift-lens-FE1qdFUYVZ0)

**Ramsons Flowers**
Photo by [C SNow](https://unsplash.com/@snowch) on [Unsplash](https://unsplash.com/photos/a-bunch-of-white-flowers-that-are-in-the-grass-QomRwDQJr9s)

**Various Mushrooms**
Photo by [Andrew Ridley](https://unsplash.com/@aridley88) on [Unsplash](https://unsplash.com/photos/a-basket-filled-with-lots-of-different-types-of-mushrooms-6KCS---7jbc)

**Various Mushrooms**
Photo by[Nick Grappone](https://unsplash.com/@ngrapp1) on [Unsplash](https://unsplash.com/photos/variety-of-shrooms-bTFPfoVOqb0)

**Yellow Mushrooms**
Photo by [Fabian Wikto](https://unsplash.com/@fabianwiktor) on [Unsplash](https://unsplash.com/photos/yellow-mushrooms-BKyih6Rjrxo)

**Hawthorn Berries**
Photo by [Kristina Kutleša](https://unsplash.com/@kristina001) on [Unsplash](https://unsplash.com/photos/a-close-up-of-a-tree-with-berries-on-it-oFDCsIWx9bk)

Yew Berries
Photo by [Adél Grőber](https://unsplash.com/@ninszi) on [Unsplash](https://unsplash.com/photos/a-close-up-of-a-plant-lpg3M5v8-TA)

Photo by [Cédric Le Bars](https://unsplash.com/@brronze) on [Unsplash](https://unsplash.com/photos/a-couple-of-strawberries-sitting-on-top-of-a-lush-green-field-0aUwNFImVKY)

**Ramsons**
Photo by [M.X.](https://unsplash.com/@custom_project) on [Unsplash](https://unsplash.com/photos/a-close-up-of-a-bunch-of-white-flowers-uplqUAJoukM)

**Stining nettles**
Photo by [Bakd&Raw by Karolin Baitinger](https://unsplash.com/@bakdandraw) on [Unsplash](https://unsplash.com/photos/green-leaf-plant-in-close-up-photography-dQGd4UG0_Hc)
