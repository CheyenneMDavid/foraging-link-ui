// Form for creating and submitting replies to existing comments.

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import buttonStyles from "../../styles/Button.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function ReplyCreateForm(props) {
  // Props passed from the parent comment component.
  const { replying_comment, setComments, profileImage, profile_id } = props;

  // Local state for the input of reply text.
  const [replyContent, setReplyContent] = useState("");

  // Updates the replyContent as the user types.
  const handleChange = (event) => {
    setReplyContent(event.target.value);
  };

  // Submits reply to backend and updates local comment state.
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axiosRes.post("/comments/", {
        content: replyContent,
        replying_comment: parseInt(replying_comment, 10),
      });

      // Appends new reply to existing comment state.
      setComments((prevComments) => ({
        results: [...prevComments.results, data],
      }));

      // Clears input after a successful submission.
      setReplyContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          {/* Link to replying user's profile */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>

          {/* Controlled textarea for reply input */}
          <Form.Control
            placeholder="My reply..."
            as="textarea"
            value={replyContent}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>

      {/* Disables the submit if input contains only whitespaces */}
      <button
        className={`${buttonStyles.button} AlignRight`}
        disabled={!replyContent.trim()}
        type="submit"
      >
        Post Reply
      </button>
    </Form>
  );
}

export default ReplyCreateForm;
