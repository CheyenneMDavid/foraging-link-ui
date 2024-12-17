import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";

function Comment(props) {
  const {
    owner,
    profile_image,
    profile_id,
    created_at,
    content,
    likes_count,
    isReply,
  } = props;

  return (
    // Conditionally applies styles based on whether the comment is a top-level comment or a reply with a parent.
    <div className={isReply ? styles.Reply : styles.Comment}>
      {/* Aligns the stacked avatar and owner's name side by side with the content. */}
      <div className={styles.CommentContainer}>
        <div className={styles.CommentAvatar}>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={40} alt={`${owner}'s avatar`} />
          </Link>
          <strong>{owner}</strong>
        </div>
        <p>{content}</p>
      </div>
      <div className={styles.CommentBar}>
        <span>{created_at}</span>
        <i className="far fa-heart"></i>
        {likes_count > 0 && <span>{likes_count}</span>}
      </div>
    </div>
  );
}

export default Comment;
