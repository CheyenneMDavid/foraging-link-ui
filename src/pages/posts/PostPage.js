import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";

import CommentSection from "../comments/CommentSection";

function PostPage() {
  // Extracts the ID of the post from the URL parameters using useParams.
  const { id } = useParams();

  // Defines the "post" state, which stores the data for a single post.
  // The "setPost" function is used to update the "post" state when needed.
  const [post, setPost] = useState({ results: [] });

  // Fetches data for a single post according to it's id.
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/plants_blog/posts/${id}/`),
        ]);
        setPost({ results: [post] });
        console.log(post);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        {/* setPost is changed to setPosts and passed as a prop into Post.js */}
        <Post {...post.results[0]} setPosts={setPost} />
        <Container className={appStyles.Content}>
          <CommentSection postId={id} />
        </Container>
      </Col>
    </Row>
  );
}

export default PostPage;
