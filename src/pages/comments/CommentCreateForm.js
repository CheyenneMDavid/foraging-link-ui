// Form for creating and submitting new comments for a specific post.

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import btnStyles from "../../styles/Button.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function CommentCreateForm(props) {
  // Props passed from CommentSection
  const { post, setComments, profileImage, profile_id } = props;

  // Local state for comment input
  const [content, setContent] = useState("");

  // Updates content state as user types
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  // Submits new comment and updates local state
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        // Ensure post ID is treated as a number
        plant_in_focus_post: parseInt(post, 10),
      });

      // Prepend new comment so it appears at the top
      setComments((prevComments) => ({
        results: [data, ...prevComments.results],
      }));

      // Clear input after successful submission
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          {/* Link to current user's profile */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>

          {/* Controlled textarea input */}
          <Form.Control
            placeholder="My comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>

      {/* Disable submit if input is empty or only whitespace */}
      <button
        className={`${btnStyles.button} ${btnStyles.alignRight}`}
        disabled={!content.trim()}
        type="submit"
      >
        Post Comment
      </button>
    </Form>
  );
}

export default CommentCreateForm;
