// Homepage serves as the landing page, utilizing the PostsList and Sidebar components in it's
// layout.
import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import PostsList from "./posts/PostsList";
import HeroBanner from "../components/HeroBanner";

// import PopularProfiles from "./profiles/PopularProfiles";
import Sidebar from "../components/Sidebar";

function HomePage({ query }) {
  return (
    <>
      {/* Hero image as banner with link to full list of courses */}
      <HeroBanner />

      <Row className="h-100">
        {/* Main Content */}
        <Col lg={8}>
          <PostsList
            message="No results found. Adjust the search keyword."
            query={query}
          />
        </Col>

        {/* Sidebar Container for Courses and Popular Profiles */}
        <Col md={4}>
          <Sidebar />
        </Col>
      </Row>
    </>
  );
}

export default HomePage;
