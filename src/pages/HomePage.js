// Homepage serves as the landing page, utilizing the PostsListPage and Sidebar components in it's
// layout.
import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import PostsListPage from "./posts/PostsListPage.js";
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
          <PostsListPage
            message="No results found. Adjust the search keyword."
            query={query}
          />
        </Col>

        {/* Sidebar Container for Courses and Popular Profiles */}
        <Col lg={4} className="d-none d-lg-block">
          <Sidebar />
        </Col>
      </Row>
    </>
  );
}

export default HomePage;
