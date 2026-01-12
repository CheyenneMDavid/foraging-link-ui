// NavBar.js holds the site logo and main navigation.
// It displays either the signed-in user or the sign-in / sign-up links,
// and handles toggling between mobile and desktop navigation.

import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

import styles from "../styles/NavBar.module.css";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";

import useClickOutsideToggle from "../hooks/src/hooks/useClickOutsideToggle";

import SearchBar from "./SearchBar";
import NavigationControls from "./NavigationControls";
const LOGO_URL =
  "https://res.cloudinary.com/cheymd/image/upload/f_auto,q_auto,w_60,h_60,c_fill,g_auto/v1761996487/foraging_link/site_design/logo_hcdxhe.jpg";

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
      <Container className={styles.NavContainer}>
        <div className={styles.TopRow}>
          <div className={styles.Left}>
            <NavLink to="/">
              <Navbar.Brand>
                <img
                  src={LOGO_URL}
                  alt="Logo"
                  width="60"
                  height="60"
                  className={styles.Logo}
                  decoding="async"
                  fetchpriority="high"
                />
              </Navbar.Brand>
            </NavLink>
            <SearchBar setQuery={setQuery} />
          </div>

          {/* NavigationControls */}
          <NavigationControls />

          <Navbar.Toggle
            className={styles.NavbarToggle}
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
            aria-label="Toggle navigation"
          />
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.Right}>
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
              to="/courses/full-list"
              className={styles.NavLink}
              activeClassName={styles.Active}
              isActive={(_, location) =>
                location.pathname.startsWith("/courses")
              }
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
