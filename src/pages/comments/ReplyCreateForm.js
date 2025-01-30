// Component to handle the creation of replies for a specific comment.
// It has the same structure as CommentCreateForm but it's a separate component that manages
// replies independently. WHilst reusing CommentCreateForm may have been keeping in-line with
// DRY principles, it would have introduced unnecessary complexity whilst trying to managing
// the nested replies. This separated form ensures that replies are handled smoothly whilst
// avoiding unintended recursive imports or logic loops.

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
        console.log("Error: setReplyComments is not a function");
        return;
      }

      // Updates replies state and ensures the prevReplyComents are managed correctly.
      setReplyComments((prevReplyComments) => ({
        results: [data, ...(prevReplyComments?.results || [])], // Fix applied here
      }));

      // Clears the input field after a successful submission
      setReplyContent("");

      console.log("Reply section updated!");
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
            placeholder="My reply..."
            as="textarea"
            value={replyContent}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>

      {/* form's submit button */}
      <button
        className={`${buttonStyles.Button} btn d-block ml-auto`}
        disabled={!replyContent.trim()}
        type="submit"
      >
        Post Reply
      </button>
    </Form>
  );
}

export default ReplyCreateForm;
