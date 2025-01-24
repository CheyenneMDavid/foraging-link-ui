// The PostPage.js is the detail page for a single post. It dynamically fetches the post data
// upon first loading and whenever the id changes.
// The CommentSection manages the comments that are associated with the single post that is fetrched.

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

  // Manages the state of the post data. The initial state contains an empty results array.
  const [post, setPost] = useState({ results: [] });

  useEffect(() => {
    // Function to fetch the post data from the API when the component mounts or the post id changes.
    const handleMount = async () => {
      try {
        // Sends a GET request to fetch the post details for the specific post id.
        const { data } = await axiosReq.get(`/plants_blog/posts/${id}/`);
        console.log(data);
        // Updates the post state with the fetched data wrapped in a results array.
        setPost({ results: [data] });
      } catch (err) {
        console.log(err);
      }
    };

    // Calls the function to fetch the data when the component mounts.
    handleMount();
  }, [id]); // Runs the effect whenever the id changes.

  // Extracts the current post from the results array. Assumes the array contains one item.
  const currentPost = post.results[0];
  console.log("Current Post:", currentPost);

  return (
    <Row className="h-100">
      {/* Main content area, taking up 8 columns on large screens */}
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* Renders the Post component, which displays the current post details
      and allows the child component to update the post state using setPost. */}
        <Post {...currentPost} setPosts={setPost} />

        {/* Container for the comments section */}
        <Container className={appStyles.Content}>
          <CommentSection postid={id} />
        </Container>
      </Col>

      {/* Sidebar section for additional content Only visible on large screens due to */}
      {/* the d-none d-lg-block class. */}
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <Sidebar mobile />
      </Col>
    </Row>
  );
}

export default PostPage;
