# The Foraging Link

## Project Description
The Foraging Link is the front-end React-based user interface that interacts with the [ForagingLink-API](https://github.com/CheyenneMDavid/ForagingLink-API). The front-end allows user interaction with features such as browsing monthly blog posts, commenting on the posts and one another's comments, managing user profiles, and registering for courses.

## Table of Contents
- [The Foraging Link](#project-description)
- [User Stories](#user-stories)
- [Features](#features)
- [Planning](#planning)
  - [Wireframes](#wireframes)
  - [Design Choices](#design-choices)
  - [Form Validation](#form-validation)
- [Deployment Steps](#deployment-steps)
- [Credits](#credits)


## User Stories
| Feature              | As    | I Want To                                | So That I Can                                 | Backend Functions                                                   | UI Components             |
| -------------------- | ----- | ---------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------  | --------------------------|
| Authentication       | user  | sign-up for an account                   | access the application securely               | Managed by Django Allauth                                           | Sign up page|
| Authentication       | user  | sign in to my account securely           | use the application                           | Managed by Django Allauth                                           | Sign in page|
| Authentication       | user  | sign out of my account securely          | ensure the privacy of my data                 | Managed by Django Allauth                                           | Sign out page|
| Comments             | user  | read comments and replies                | engage with discussions                       | `list()`, `retrieve()` (via `CommentList()`, `CommentDetail()`)     | Post list page|
| Comments             | user  | create comments or replies               | ask or answer questions on posts or comments  | `create()` via `CommentList()`                                      | Post detail page, Comment button, Comments form|
| Comments             | user  | edit comments                            | make corrections or updates                   | `update()` via `CommentDetail()`                                    | Post detail page, Edit comment button, Edit comment form |
| Comments             | user  | delete comments                          | remove my comments from the post              | `destroy()` via `CommentDetail()`                                   | Post detail page, Delete comment button, Confirm Delete Modal|
| Likes                | user  | like a post or comment                   | show appreciation for what's been written     | `create()` via `LikeList()`                                         | Post detail page, Like/Unlike button   |
| Likes                | user  | unlike a post or comment                 | unlike if I changed my mind                   | `destroy()` via `LikeDetail()`                                      | Post detail page, Like/Unlike button   |
| Followers            | user  | follow other users                       | I can engage with content that interests me   | `create()` via `FollowerList()`                                     | Profile page (other users), Follow/Unfollow button|
| Followers            | user  | unfollow other users                     | disengage from content that I no longer enjoy | `destroy()` via `FollowerDetail()`                                  | Profile page (other users), Follow/Unfollow button|
| Courses              | user  | view available courses.                  | choose one I wish to go on                    | `list()` via `CourseList()`, `retrieve()` via `CourseUpdateDelete`  | Course list page, Course detail page|
| Courses              | admin | create courses                           | plan and publish future events                | `CourseCreate()`                                                    | Handeled by Django Admin panel                          |
| Courses              | admin | Update and Delete                        | update course details and remove old courses  | `update()`, `destroy()` via `CourseUpdateDelete()`                  | Handeled by Django Admin panel                          |
| Course Registrations | user  | fill out a contact form                  | register my interest in attending a course    | `CourseRegistrationCreate()`                                        | Course Detail Page, Contact Registration Form, Submit Form utton|
| Course Registrations | admin | have full CRUD ability for contact forms | manage course attendees                       | `CourseRegistrationDetail()`                                        | Handeled by Django Admin panel|
| Plant Blog           | admin | have full CRUD capability for posts      | manage site content                           | `PlantInFocusPostCreate()`                                          | Handeled by Django Admin panel|
| Plants Blog          | user  | read blog posts                          | learn about the plants I wish to forage       | `PlantInFocusPostList()`                                            | Postlist page, Post detail page|
| Profiles             | user  | read user's profiles details             | engage with my fellow users                   | `list()` via `ProfileList()`, `retrieve()` via `ProfileDetail()`    | Profile list page (other users), Profile detail page|
| Profiles             | owner | update and delete my profile             | update my info or delete my account           | `ProfileDetail()`                                                   | My Profile page, Update button, Delete Profile Button, Update Profile Page, Submit Update Button |

## Features
### Components
#### Global Components
- `NavBar` shows navigation options based on the user's status (signed in or signed out).
- `Avatar` displays the user’s profile picture.
- `Footer` contains the socialmedia links at the bottom of the screen.

#### Post Components
- `PostList` shows a list of all blog posts.
- `Post` displays a single post with the title, image, content, author, and published date.

- `CommentsSection` is the main container for all comments related to a specific post. It uses the `Comment` component to show first-level comments on a post and any second-level nested replies to other comments.

#### Course and Course Registration Components
- `Sidebar` displays the first three/closest dates for upcoming foraging courses.







## Planning
Diagram showing the structure of the the application through it's **applications and the permissions** that facilitate it's use.

![Applications and Permissions Diagram](https://res.cloudinary.com/cheymd/image/upload/v1731508996/foraging_link/readme_images/apps_and_permissions_dazayh.png)


### Wireframes
All desktop wireframes are based on a screen size of 1920 x 1080, with the main view limited to 1200px wide. All mobile wireframes are based on the Samsung Galaxy S20 screen size of 360 x 800.

The colors used in the wwireframes are not representational of the sites colors.  They are simply alternating colors to show division.

**Homepage Wireframe - Desktop view** (also serves as the homepage/landing page)

![Desktop Homepage](https://res.cloudinary.com/cheymd/image/upload/v1731488079/foraging_link/readme_images/desktop_homepage_and_post_list_ahmz0c.png)


**Post Detail - Wireframe - Desktop view**

![Desktop Post Detail](https://res.cloudinary.com/cheymd/image/upload/v1731488211/foraging_link/readme_images/desktop_post_detail_irfqvk.png)

**Comments - Expanded - Wireframe - Desktop view** Comments display only if there are any to show.
The pen and trash icons, representing edit and delete actions, appear conditionally in each comment box, visible only if the comment belongs to the currently signed-in user.

![Desktop Expanded Comments](https://res.cloudinary.com/cheymd/image/upload/v1731488210/foraging_link/readme_images/desktop_post_detail_expanded_comments_kvjrje.png)

**Homepage Wireframe - Mobile view**

![Mobile Homepage](https://res.cloudinary.com/cheymd/image/upload/v1731488209/foraging_link/readme_images/mobile_homepage_and_post_list_qbtj7t.png)

**Post Detail - Wireframe - Mobile view**

![Mobile Post Detail](https://res.cloudinary.com/cheymd/image/upload/v1731488209/foraging_link/readme_images/mobile_post_detail_g12mha.png)

**Comments - Expanded - Wireframe - Mobile view**
The pen and trash icons in the comment box, indictating edit and delete are conditionally displayed, depending on whether the comment belongs to the currently signed-in user.

![Mobile Expanded Comments](https://res.cloudinary.com/cheymd/image/upload/v1731488212/foraging_link/readme_images/mobile_post_detail_expanded_comments_fqif0x.png)

## Design Choices
### Colors
The colors selected for "The Foraging Link" were chosen to align with colors found in nature, gentle on the eye, but also a rewarding depth

- Navigation icon/links
  
  - Default color: #532402 (brown)
  - Color on hover: #347928 (green)
  - Current page: #347928 (green)

- Buttons
  - Default color #532402 (brown)
  - Color on hover #347928 (green)
  - Opacity on hover: 0.8

- Lines and Borders
  - #532402 (brown)

- Site Background
  - Background color: #f8f8f8 (a light, but gentle on the eyes)

### Components and Functionality
**NavBar**. Conditional display of navigation elements based on whether a user was signed in or signed out.
Intention is to engage with potentiial users, ecouraging them to join. So, the site content is open to the public, but the ability to engage with the site content is restrictesd to users.

  - **Signed out**, displays `Home`, `Courses`, `Sign in`, `Sign up`
  
  - **Signed in**, displays `Home`, `Courses`, `Profile` and `Sign out`


## Form Validation and Defensive Design
Whilst the Sign-up and Sign-in forms were parallel to Code Institute's `Moments` walkthrough project, the expected behaviour of a returned message informing the user that the field couldn't be left empty didn't happen.

The first solution considered was to set an error state with conditional logic to display specific messages when fields were left empty. This approach proved needlessly complex. The second solution was to use React Hook Form, but for the simplicity needed in this form, it felt like overkill. Instead, adding a simple `required` attribute did the job effectively, keeping the solution browser-friendly. This approach uses the browser’s own validation, so users get instant feedback without extra code, making it simple and efficient.


---



## Credits

Favicon created using: [Favicon.io](https://favicon.io/favicon-generator/)

[Font Awesome](https://fontawesome.com/icons) for the Icons in the navigation

[Picsart](https://picsart.com/) for creating the logo
