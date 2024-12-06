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

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/courses" render={() => <h1>Courses</h1>} />
          <Route exact path="/profile" render={() => <h1>Profile</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />

          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
