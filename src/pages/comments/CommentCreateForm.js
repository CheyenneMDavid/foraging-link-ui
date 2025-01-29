// Component to handle the creation of comments for a specific post.

import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

// Main function for the creation of Component.
function CommentCreateForm(props) {
  // Detructuring the props that are passed from the parent Component.
  const { post, setPost, setComments, profileImage, profile_id } = props;

  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log({
        content,
        // Ensures the post ID is an integer
        plants_in_focus_post: parseInt(post),
      });

      // Makes a POST request to create a new comment
      const { data } = await axiosRes.post("/comments/", {
        content,
        plants_in_focus_post: parseInt(post), // Ensures the post ID is an integer
      });

      setComments((prevComments) => ({
        ...prevComments,
        // Adds the new comment to the results array
        results: [data, ...prevComments.results],
      }));

      // Updates the post state to increase the comments count
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));

      // Clears the input field after a successful submission
      setContent("");
    } catch (err) {
      console.log("Error response:", err.response);
      console.log("Error data:", err.response?.data);
      console.log("Error status:", err.response?.status);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      {/* form's submit button */}
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default CommentCreateForm;
