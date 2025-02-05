// CommentSection.js - Responsible for fetching and rendering comments.

import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Comment from "./Comment";
import styles from "../../styles/CommentSection.module.css";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function CommentSection({ postId }) {
  console.log("Post ID in the CommentSection:", postId);

  // State to store comments, initialized as an object with an empty results array
  const [comments, setComments] = useState({ results: [] });

  // Retrieve the current user's profile image if they are loged in
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  useEffect(() => {
    const handleMount = async () => {
      try {
        // Fetch comments for the given post ID
        const { data } = await axiosReq.get(
          `/comments/?plant_in_focus_post=${postId}`
        );

        console.log("Fetched comments:", data);

        // Update state with the fetched comments
        setComments({ results: data.results });
      } catch (err) {
        console.log("Error fetching comments:", err);
      }
    };

    // Call handleMount when the component mounts or postId changes
    handleMount();
  }, [postId]);

  // Render comments and their replies recursively
  const renderComments = (parentId = null) => {
    return comments.results
      .filter((comment) => comment.replying_comment === parentId) // Filter comments based on parent ID
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
            {/* Render a single comment component */}
            <Comment
              {...comment}
              isReply={!!comment.replying_comment}
              setComments={setComments}
            />

            {/* Recursively render replies to this comment */}
            {renderComments(comment.id)}
          </div>
        );
      });
  };

  return (
    <div className={styles.CommentSection}>
      {/* Render the comment input form if the user's logged in. */}
      {currentUser ? (
        <CommentCreateForm
          profile_id={currentUser.profile_id}
          profileImage={profile_image}
          post={postId}
          setComments={setComments}
        />
      ) : null}

      {/* Render comments if available, otherwise show placeholder text */}
      {comments.results?.length > 0 ? (
        renderComments()
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}

export default CommentSection;
