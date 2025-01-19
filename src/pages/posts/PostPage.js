import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import CommentSection from "../comments/CommentSection";
import PopularProfiles from "../profiles/PopularProfiles";
import Sidebar from "../../components/Sidebar";

function PostPage() {
  const { id } = useParams();

  // Manages the state for the post data. Initially an empty results array.
  const [post, setPost] = useState({ results: [] });

  useEffect(() => {
    // Fetches post data from the backend based on the id.
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/plants_blog/posts/${id}/`);

        // Updates the post state with the "fetched data"
        setPost({ results: [data] });
      } catch (err) {
        console.log(err);
      }
    };

    // Fetches the data when the component mounts
    handleMount();
  }, [id]);

  // Extracts the current post data.
  const currentPost = post.results[0];

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* Displays popular profiles for mobile users */}
        <PopularProfiles mobile />

        {/* Renders the Post component with the fetched post data */}
        <Post {...currentPost} setPosts={setPost} />

        {/* Displays likes count if available */}
        {currentPost && currentPost.likes_count > 0 && (
          <div>{currentPost.likes_count} likes</div>
        )}

        {/* Comments Section */}
        <Container className={appStyles.Content}>
          <CommentSection postId={id} />
        </Container>
      </Col>

      {/* Sidebar content */}
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <Sidebar mobile />
      </Col>
    </Row>
  );
}

export default PostPage;
