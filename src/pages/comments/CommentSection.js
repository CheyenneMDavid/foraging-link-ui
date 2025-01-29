// CommentSection.js - Responsible for fetching and rendering comments.

import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Comment from "./Comment";
import styles from "../../styles/CommentSection.module.css";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function CommentSection({ postId }) {
  console.log("Post ID in the CommentSection:", postId);

  // State to store fetched comments
  const [comments, setComments] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  // Fetch comments for the given post ID on component mount or when postId changes.
  useEffect(() => {
    const handleMount = async () => {
      try {
        // Axios request to API, fetch comments, filtered by the post's ID
        const { data } = await axiosReq.get(
          `/comments/?plant_in_focus_post=${postId}`
        );
        console.log("Fetched comments:", data);

        // Updates the state with the fetched comments.
        setComments({ results: data.results });
      } catch (err) {
        // Logs an error if request to fetch the comments fails
        console.log("Error fetching comments:", err);
      }
    };

    // Calls th handleMount function to fetch comments
    handleMount();
  }, [postId]);

  // Function rendering comments and their replies, recursively.
  const renderComments = (parentId = null) => {
    return comments.results
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
      {/* Conditional rendering of comments - if they exist */}
      {comments.results?.length > 0 ? (
        renderComments()
      ) : (
        <p>No comments yet.</p>
      )}

      {/* Rendering CommentCreateForm after comments */}
      {currentUser ? (
        <CommentCreateForm
          profile_id={currentUser.profile_id}
          profileImage={profile_image}
          post={postId}
          setComments={setComments}
        />
      ) : null}
    </div>
  );
}

export default CommentSection;
