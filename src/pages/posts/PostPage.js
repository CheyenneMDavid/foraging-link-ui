// PostPage.js - Responsible for fetching and displaying a single post. It imports the
// CommentSection which manages comments and Sidebar which displays PopularProfiles and
// up-coming courses.

import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import CommentSection from "../comments/CommentSection";
import Sidebar from "../../components/Sidebar";

function PostPage() {
  const { id } = useParams();

  // State to manage post data
  const [post, setPost] = useState({ results: [] });

  useEffect(() => {
    console.log("PostPage useEffect triggered due to ID change:", id);

    // Function to fetch post data
    const handleMount = async () => {
      try {
        console.log("Fetching post...");

        // Fetch post data
        const { data: postData } = await axiosReq.get(
          `/plants_blog/posts/${id}/`
        );

        console.log("Post fetched:", postData);

        // Update state with fetched data
        setPost({ results: [postData] });
      } catch (err) {
        console.log("Error fetching post:", err);
      }
    };

    // Calls the function to fetch the data when the component mounts.
    handleMount();
  }, [id]); // Re-runs the effect whenever a post's ID changes

  // Extract current post data
  const currentPost = post.results[0];
  console.log("Current Post:", currentPost);

  return (
    <Row className="h-100">
      {/* Main content area */}
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* Render the post details */}
        <Post {...currentPost} setPosts={setPost} />

        {/* Comments component managing all aspects of comments */}
        <Container className={appStyles.Content}>
          <CommentSection postId={id} />
        </Container>
      </Col>

      {/* Sidebar content (visible only on large screens) */}
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <Sidebar mobile />
      </Col>
    </Row>
  );
}

export default PostPage;
