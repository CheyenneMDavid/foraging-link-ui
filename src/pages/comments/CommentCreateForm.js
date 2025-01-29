// Component to handle the creation of comments for a specific post.

import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import buttonStyles from "../../styles/Button.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function CommentCreateForm(props) {
  const { post, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log({
        content,
        plant_in_focus_post: parseInt(post),
      });

      // Makes a POST request to create a new comment
      const { data } = await axiosRes.post("/comments/", {
        content,
        // Ensures the post ID is an integer
        plant_in_focus_post: parseInt(post),
      });

      console.log("Comment posted:", data);

      // Updates comments.
      setComments((prevComments) => ({
        // Adds the new comment to the results array
        results: [data, ...prevComments.results],
      }));

      // Clears the input field after a successful submission
      setContent("");

      console.log("CommentSection updated!");
    } catch (err) {
      // Logs ALL errors to console for debugging
      console.log("All errors:", err);
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
        className={`${buttonStyles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        Post Comment
      </button>
    </Form>
  );
}

export default CommentCreateForm;
