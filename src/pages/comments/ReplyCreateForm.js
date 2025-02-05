// ReplyCreateForm.js - Handles the creation of replies to comments.

import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import buttonStyles from "../../styles/Button.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function ReplyCreateForm(props) {
  const { replying_comment, setComments, profileImage, profile_id } = props;
  const [replyContent, setReplyContent] = useState("");

  // Updates the replyContent state when a user enters text.
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

      // Send a POST request to create a reply.
      const { data } = await axiosRes.post("/comments/", {
        content: replyContent,
        replying_comment: parseInt(replying_comment, 10),
      });

      console.log("Reply posted:", data);

      if (typeof setComments !== "function") {
        console.log("Error: setComments is not a function.");
        return;
      }

      // Add the new reply to the existing comment state.
      setComments((prevComments) => ({
        results: [...prevComments.results, data],
      }));

      // Clear the input field after a successful submission.
      setReplyContent("");

      console.log("Reply section updated!");
    } catch (err) {
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
            placeholder="My reply..."
            as="textarea"
            value={replyContent}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>

      {/* Use 'trim' method to disable submit button when replyContent only contains whitespace */}
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
