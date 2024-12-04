// Homepage serves as the landing page, utilizing the PostsList and Sidebar components in it's
// layout.
import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import PostsList from "./posts/PostsList";

import PopularProfiles from "./profiles/PopularProfiles";

function HomePage() {
  return (
    <Row className="h-100">
      {/* Main Content */}
      <Col lg={8} className="py-2 p-0 p-lg-2">
        <PostsList message="No results found. Adjust the search keyword." />
      </Col>

      {/* Sidebar Container for Courses and Popular Profiles */}
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        {/* Upcoming Courses */}
        <div className="mb-4">
          <p>Upcoming Courses</p>
        </div>

        {/* Popular Profiles */}
        <div>
          <PopularProfiles />
        </div>
      </Col>
    </Row>
  );
}

export default HomePage;
