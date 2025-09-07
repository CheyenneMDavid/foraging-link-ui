import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/posts/PostPage";
import ProfilePage from "./pages/profiles/ProfilePage";
import CoursesListPage from "./pages/courses/CoursesListPage";
import CoursePage from "./pages/courses/CoursePage";
import CourseRegistrationForm from "./pages/courses/CourseRegistrationForm";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";

function App() {
  const [query, setQuery] = useState("");

  return (
    <div className={styles.App}>
      <header>
        <NavBar setQuery={setQuery} />
      </header>

      <main>
        <Container className={styles.Main}>
          <Switch>
            <Route exact path="/" render={() => <HomePage query={query} />} />
            <Route
              exact
              path="/courses/full-list"
              render={() => <CoursesListPage />}
            />
            <Route exact path="/courses/:id" render={() => <CoursePage />} />
            <Route exact path="/profile" render={() => <h1>Profile</h1>} />
            <Route exact path="/signin" render={() => <SignInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/posts/:id" render={() => <PostPage />} />
            <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
            <Route
              exact
              path="/register/:id"
              render={() => <CourseRegistrationForm />}
            />
            <Route
              exact
              path="/profiles/:id/edit/username"
              render={() => <UsernameForm />}
            />
            <Route
              exact
              path="/profiles/:id/edit/password"
              render={() => <UserPasswordForm />}
            />
            <Route
              exact
              path="/profiles/:id/edit"
              render={() => <ProfileEditForm />}
            />

            <Route render={() => <p>Page not found!</p>} />
          </Switch>
        </Container>
      </main>
    </div>
  );
}

export default App;
