// ReplyCreateForm.js - Handles the creation of replies to comments.
// While it shares a similar structure with CommentCreateForm, managing replies separately
// avoids unnecessary complexity and recursive logic issues.

import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import buttonStyles from "../../styles/Button.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function ReplyCreateForm(props) {
  const { replying_comment, setReplyComments, profileImage, profile_id } =
    props;
  const [replyContent, setReplyContent] = useState("");

  const handleChange = (event) => {
    setReplyContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Replying to comment ID:", replying_comment);

    if (!replying_comment) {
      console.log("Error: No replying_comment ID provided.");
      return;
    }

    try {
      console.log({
        content: replyContent,
        replying_comment: parseInt(replying_comment, 10),
      });

      // Makes a POST request to create a reply.
      const { data } = await axiosRes.post("/comments/", {
        content: replyContent,
        replying_comment: parseInt(replying_comment, 10),
      });

      console.log("Reply posted:", data);

      if (typeof setReplyComments !== "function") {
        console.log("Error: setReplyComments is not a function.");
        return;
      }

      // Updates replies state while preserving existing replies.
      setReplyComments((prevReplyComments) => ({
        results: [data, ...(prevReplyComments?.results || [])], // Fix applied here
      }));

      // Clears the input field after a successful submission.
      setReplyContent("");

      console.log("Reply section updated!");
    } catch (err) {
      // Logs all errors for debugging.
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
            placeholder="My reply..."
            as="textarea"
            value={replyContent}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>

      {/* Submits button for the reply form */}
      <button
        className={`${buttonStyles.Button} AlignRight`}
        disabled={!replyContent.trim()}
        type="submit"
      >
        Post Reply
      </button>
    </Form>
  );
}

export default ReplyCreateForm;
