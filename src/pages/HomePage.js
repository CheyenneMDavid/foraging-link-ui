// Component that serves as the landing page, displaying the PostsList and Sidebar
import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import PostsList from "./posts/PostsList";
import { useCurrentUser } from "../contexts/CurrentUserContext";

function HomePage() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <Row className="h-100">
      {/* Main Content */}
      <Col lg={8} className="py-2 p-0 p-lg-2">
        <PostsList message="No results found. Adjust the search keyword." />
      </Col>

      {/* Sidebar */}
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Courses</p>
        <p>Most Followed</p>
      </Col>
    </Row>
  );
}

export default HomePage;
