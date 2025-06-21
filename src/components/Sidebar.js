// Sidebar used for displaying most immediate upcoming dates for courses and most followed
// profiles of other users.

import React from "react";
import UpcomingCourses from "../pages/courses/UpcomingCourses";
import PopularProfiles from "../pages/profiles/PopularProfiles";
import { Container } from "react-bootstrap";
import styles from "../styles/Sidebar.module.css";

const Sidebar = ({ mobile }) => {
  return (
    <Container className={styles.Sidebar}>
      <PopularProfiles />
      {!mobile && <UpcomingCourses />}
      <hr />
    </Container>
  );
};

export default Sidebar;
