# The Foraging Link

## Project Description
The Foraging Link is the front-end React-based user interface that interacts with the [ForagingLink-API](https://github.com/CheyenneMDavid/ForagingLink-API). The front-end allows user interaction with features such as browsing monthly blog posts, commenting on the posts and one another's comments, managing user profiles, and registering for courses.

## Table of Contents
- [The Foraging Link](#project-description)
- [Table of Contents](#table-of-contents)
- [User Stories](#user-stories)

- [Planning](#planning)
  - [Wireframes](#wireframes)




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


## Planning


### Wireframes
All desktop wireframes are based on a screen size of 1920 x 1080, with the main view limited to 1200px wide. All mobile wireframes are based on the Samsung Galaxy S20 screen size of 360 x 800.

**Homepage Wireframe - Desktop view**

![Desktop Homepage](https://res.cloudinary.com/cheymd/image/upload/v1729524848/drf-api/Foraging-Link-UI-README-images/Home-Desktop_renpop.png)


**Post Detail - Wireframe - Desktop view**

![Desktop Post Detail](https://res.cloudinary.com/cheymd/image/upload/v1729524849/drf-api/Foraging-Link-UI-README-images/Post-Detail-Desktop_ewdsrg.png)

**Comments - Expanded - Wireframe - Desktop view**
The pen and trash icons in the comment box, indictating edit and delete are conditionally displayed, depending on whether the comment belongs to the currently signed-in user.

![Desktop Expanded Comments](https://res.cloudinary.com/cheymd/image/upload/v1729531207/drf-api/Foraging-Link-UI-README-images/Comments-Expanded-Desktop_tapxi8.png)

**Homepage Wireframe - Mobile view**

![Mobile Homepage](https://res.cloudinary.com/cheymd/image/upload/v1729524848/drf-api/Foraging-Link-UI-README-images/Home-Mobile_qv6ow1.png)

**Post Detail - Wireframe - Mobile view**

![Mobile Post Detail](https://res.cloudinary.com/cheymd/image/upload/v1729524848/drf-api/Foraging-Link-UI-README-images/Home-Mobile_qv6ow1.png)

**Comments - Expanded - Wireframe - Mobile view**
The pen and trash icons in the comment box, indictating edit and delete are conditionally displayed, depending on whether the comment belongs to the currently signed-in user.

![Mobile Expanded Comments](https://res.cloudinary.com/cheymd/image/upload/v1729531208/drf-api/Foraging-Link-UI-README-images/Comments-Expanded-Mobile_rn4xyt.png)




