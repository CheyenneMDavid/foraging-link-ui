import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container className="d-flex justify-content-between align-items-center">
        <div className={styles.logoContainer}>
          <img src={logo} alt="The Foraging Link logo" height="70" />
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-around w-100">
            <Nav.Link href="#home">
              <i className="fas fa-home"></i> Home
            </Nav.Link>
            <Nav.Link href="#courses">
              <i className="fa-solid fa-pagelines"></i> Courses
            </Nav.Link>
            <Nav.Link href="#sign-in">
              <i className="fas fa-sign-in-alt"></i> Sign in
            </Nav.Link>
            <Nav.Link href="#sign-up">
              <i className="fas fa-user-plus"></i> Sign up
            </Nav.Link>
            <Nav.Link href="#contact">
              <i className="fa-solid fa-phone"></i> Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
