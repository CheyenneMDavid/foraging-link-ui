# The Foraging Link

## Project Description

The Foraging Link is the front-end React-based user interface that interacts with the
[ForagingLink-API](https://github.com/CheyenneMDavid/ForagingLink-API). The front-end allows user
interaction with features such as browsing monthly blog posts, commenting on the posts and one
another's comments, managing user profiles, and registering for courses.

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
    - [Post Management Features](#post-management-features)
      - [Current Features](#current-features)
      - [Future Planned Features](#future-planned-features)
  - [Planning](#planning)
    - [Wireframes](#wireframes)
      - [Component Planning](#component-planning)
        - [Comments Section](#comments-section)
- [Development Notes (Temporary use of H1 for ease of finding notes quickly.)](#development-notes-temporary-use-of-h1-for-ease-of-finding-notes-quickly)
  - [List of Reusable Components](#list-of-reusable-components)
  - [Design Choices](#design-choices)
    - [Colors](#colors)
    - [Components and Functionality](#components-and-functionality)
    - [Form Validation and Defensive Design](#form-validation-and-defensive-design)
  - [Development Challenges \& Solutions](#development-challenges--solutions)
    - [Issue Resolution](#issue-resolution)
  - [Credits](#credits)

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

- **`Sidebar`**: Displays the first three/closest dates for upcoming foraging courses.

---

### Post Management Features

#### Current Features

- While complete post management is handled by admins in the backend, the front end provides basic
  editing and deleting features for admins, limited to posts they authored. This allows for quick
  edits without needing to access the backend for minor tasks.

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

**Homepage Wireframe - Mobile view**

![Mobile Homepage](https://res.cloudinary.com/cheymd/image/upload/v1731488209/foraging_link/readme_images/mobile_homepage_and_post_list_qbtj7t.png)

**Post Detail - Wireframe - Mobile view**

![Mobile Post Detail](https://res.cloudinary.com/cheymd/image/upload/v1731488209/foraging_link/readme_images/mobile_post_detail_g12mha.png)

**Comments - Expanded - Wireframe - Mobile view** The pen and trash icons in the comment box,
indictating edit and delete are conditionally displayed, depending on whether the comment belongs to
the currently signed-in user.

![Mobile Expanded Comments](https://res.cloudinary.com/cheymd/image/upload/v1731488212/foraging_link/readme_images/mobile_post_detail_expanded_comments_fqif0x.png)

___

#### Component Planning

The component planning aims to break down the application into manageable parts, focusing on reusable components to maintain consistency and modularity.

##### Comments Section

The comments section is by far the most complex part of the application, due to the number of functionalities and conditional displays involved. To simplify and manage this complexity, I decided to break the functionality into individual reusable components which can then also be used by Posts.
___
___
___

# Development Notes (Temporary use of H1 for ease of finding notes quickly.)

**Note**: This section is only being used as a notes section to self for planning out functionality, implementation and reasoning as components are broken down into their shared usage.

## List of Reusable Components

1. **Likes Component**:
   - **Function**: Toggles likes and displays the like count.
   - Conditionally displayed, baseed on being signed in.
  
2. **Comment Button Component**:
   - **Function**: Opens comments form.
   - Conditionally displayed, based on being signed in.
  
3. **Edit Button Component**:
   - **Function**: Opens an editing form.
   - Conditionally displayed, based on being signed in.
   - Conditionally displayed, based on Currently signed in user being the Author of the comment.

4. **Delete Button Component**:
   - **Function**: Deletes comments, or replies with a confirmation.
   - Conditionally displayed, based on being signed in.
   - Conditionally displayed, based on Currently signed in user being the Author of the comment.
  
**Note**: H1 heading above is temporary and will be removed or changed before the final version.

___
___
___

## Design Choices

### Colors

The colors selected for "The Foraging Link" were chosen to align with colors found in nature, gentle
on the eye, but also a rewarding depth

- Navigation icon/links

  - Default color: #532402 (brown)
  - Color on hover: #619158 (green)
  - Current page: #619158 (green)

- Buttons

  - Default color #532402 (brown)
  - Color on hover #619158 (green)
  - Opacity on hover: 0.8

- Lines and Borders

  - #532402 (brown)

- Site Background
  - Background color: #f8f8f8 (a light, but gentle on the eyes)

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

### Issue Resolution

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

---

## Credits

- **[Favicon.io](https://favicon.io/favicon-generator/)** : Used to generate the favicon.  
- **[Font Awesome](https://fontawesome.com/icons)** : Icons used in the navigation.  
- **[Picsart](https://picsart.com/)** : Tool used to create the logo.  
- **[Symbl.cc](https://symbl.cc/)** : Resource for Unicode characters.
