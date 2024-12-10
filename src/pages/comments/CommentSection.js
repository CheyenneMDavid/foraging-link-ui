import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/Comment.module.css";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          `/comments/?plant_in_focus_post=${postId}`
        );
        console.log("Fetched comments:", data);
        setComments(data.results);
      } catch (err) {
        console.log("Error fetching comments:", err);
      }
    };
    handleMount();
  }, [postId]);

  return (
    <div className={styles.CommentSection}>
      {comments.length > 0 ? (
        comments.map((comment) => <p key={comment.id}>{comment.content}</p>)
      ) : (
        <p>No comments</p>
      )}
    </div>
  );
}

export default CommentSection;
