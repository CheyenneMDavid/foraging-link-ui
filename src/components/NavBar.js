import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";

import useClickOutsideToggle from "../hooks/src/hooks/useClickOutsideToggle";

import SearchBar from "./SearchBar";

// Navigation bar component, displays different navigation icons based on the user's
// authentication status.
function NavBar({ setQuery }) {
  const currentUser = useCurrentUser();
  const owner = currentUser?.username;

  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  // Handles logging out
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  // Navigation view for users that are logged in
  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/profiles/${currentUser?.profile_id}`}
        // Dynamic labeling displays actual user's name if it's available, otherwise it falls
        // back on a description of "Profile of User"
        aria-label={`Profile of ${owner || "user"}`}
      >
        <Avatar
          src={currentUser?.profile_image}
          text={owner}
          className={styles.NavAvatar}
        />
      </NavLink>

      {/* Sign Out */}
      <NavLink
        className={styles.NavLink}
        to="/"
        onClick={handleSignOut}
        aria-label="Sign out"
      >
        <i className="fa-solid fa-right-from-bracket" /> Sign out
      </NavLink>
    </>
  );

  // Navigation view when users are logged out.
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
        aria-label="Sign up"
      >
        <i className="fas fa-sign-in-alt" /> Sign in
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
        aria-label="Sign up"
      >
        <i className="fas fa-user-plus" /> Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        {/* {Logo} */}
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="55" />
          </Navbar.Brand>
        </NavLink>

        {/* SearchBar added to the right of the logo */}

        <SearchBar setQuery={setQuery} />

        <Navbar.Toggle
          className={styles.NavbarToggle}
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
          aria-label="Toggle navigation"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
              aria-label="Home"
            >
              <i className="fas fa-home" /> Home
            </NavLink>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/courses"
              aria-label="Courses"
            >
              <i className="fa-solid fa-location-arrow" /> Courses
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
