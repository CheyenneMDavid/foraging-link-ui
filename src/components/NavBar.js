import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="75" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={styles.NavbarToggle}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-home"></i>Home
            </NavLink>

            <NavLink
              to="/courses"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i class="fa-solid fa-location-arrow"></i>Courses
            </NavLink>

            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/signin"
            >
              <i className="fas fa-sign-in-alt"></i>Sign in
            </NavLink>

            <NavLink
              to="/signup"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i className="fas fa-user-plus"></i>Sign up
            </NavLink>

            <NavLink
              to="/contact"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i class="fa-solid fa-phone"></i>Contact Us
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
