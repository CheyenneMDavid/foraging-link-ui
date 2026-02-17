// Sidebar showing popular profiles and upcoming courses.

import React from "react";
import UpcomingCourses from "../pages/courses/UpcomingCourses";
import PopularProfiles from "../pages/profiles/PopularProfiles";
import { Container } from "react-bootstrap";
import styles from "../styles/Sidebar.module.css";

const Sidebar = ({ mobile }) => {
  return (
    <Container className={styles.sidebar}>
      <PopularProfiles />
      <hr className={styles.customHr} />
      {!mobile && <UpcomingCourses />}
    </Container>
  );
};

export default Sidebar;
