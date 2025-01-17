import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Comment from "./Comment"; // Importing of component that will render individual comments

import styles from "../../styles/CommentSection.module.css";

function CommentSection({ postId }) {
  // State to store the fetched comments.
  const [comments, setComments] = useState([]);

  // Fetch comments for the given post ID on component mount or when postId changes
  useEffect(() => {
    const handleMount = async () => {
      try {
        // Request to API, fetching comments that are filtered by the post's ID
        const { data } = await axiosReq.get(
          `/comments/?plant_in_focus_post=${postId}`
        );
        console.log("Fetched comments:", data);
        // Updates the state with the fetched comments.
        setComments(data.results);
      } catch (err) {
        // Logs the error if the request to fetch comments fails
        console.log("Error fetching comments:", err);
      }
    };
    // Calls the handleMount function to fetch comments
    handleMount();
  }, [postId]);

  // Function to recursively render comments and their replies.
  const renderComments = (parentId = null) => {
    return comments
      .filter((comment) => comment.replying_comment === parentId)
      .map((comment) => {
        console.log(
          "Comment ID:",
          comment.id,
          "Replying Comment:",
          comment.replying_comment
        );
        return (
          <div
            key={comment.id}
            className={
              comment.replying_comment === null ? styles.Comment : styles.Reply
            }
          >
            <Comment {...comment} isReply={!!comment.replying_comment} />
            {renderComments(comment.id)}
          </div>
        );
      });
  };

  return (
    <div className={styles.CommentSection}>
      {comments.length > 0 ? renderComments() : <p>No comments yet.</p>}
    </div>
  );
}

export default CommentSection;
