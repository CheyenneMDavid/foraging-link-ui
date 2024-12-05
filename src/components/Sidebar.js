// Sidebar used for displaying most immediate upcoming dates for courses and most followed
// profiles of other users.

import React from "react";
// import UpcomingCourses from "../courses/UpcomingCourses";
import PopularProfiles from "../pages/profiles/PopularProfiles";
import { Container } from "react-bootstrap";
import appStyles from "../App.module.css";

const Sidebar = ({ mobile }) => {
  return (
    <Container
      className={`${mobile ? appStyles.MobileSidebar : appStyles.Sidebar}`}
    >
      {!mobile && <p>Upcoming Courses</p>}
      <PopularProfiles />
    </Container>
  );
};

export default Sidebar;
