import React from "react";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";

function Comment(props) {
  const { owner, profile_image, created_at, content, is_owner } = props;

  return (
    <div className={styles.Comment}>
      <div className="d-flex align-items-center">
        {/* Avatar and user info */}
        <Avatar src={profile_image} height={30} />
        <div className="ml-2">
          <strong>{owner}</strong>
          <span className="text-muted ml-2">{created_at}</span>
        </div>
      </div>
      <p>{content}</p>
    </div>
  );
}

export default Comment;
