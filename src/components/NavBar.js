import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-around w-100">
            <Nav.Link>
              <i className="fas fa-home"></i> Home
            </Nav.Link>
            <Nav.Link>
              <i class="fa-solid fa-shoe-prints">
                <i class="fa-brands fa-pagelines"></i>
              </i>{" "}
              Courses
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-sign-in-alt"></i> Sign in
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-user-plus"></i> Sign up
            </Nav.Link>
            <Nav.Link>
              <i class="fa-solid fa-phone"></i> Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
