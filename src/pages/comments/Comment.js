import React from "react";
import { Card } from "react-bootstrap";
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
    // Conditionally applies styles based on whether the comment is a top-level comment or a
    // reply with a parent.
    <Card className={isReply ? styles.Reply : styles.Comment}>
      <Card.Body>
        <div className={styles.CommentContainer}>
          {/* Avatar and Username stacks to left, making most of space */}
          <div className={styles.CommentHead}>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar
                src={profile_image}
                height={40}
                alt={`${owner}'s avatar`}
              />
            </Link>
            <strong className={styles.OwnerName}>{owner}</strong>
          </div>

          {/* Comment Content to the right of the stacked Avatar and username */}
          <div className={styles.CommentContent}>
            <Card.Text>{content}</Card.Text>
          </div>
        </div>

        {/* User Interaction section */}
        <div className={styles.CommentBar}>
          <span className={styles.CreationDate}>{created_at}</span>
          <i className="far fa-heart"></i>
          {likes_count > 0 && <span>{likes_count}</span>}

          {/* Condisional display of edit and trash dependant on currently logged in user being the owner of comment */}
          <p>Edit Button</p>
          <p>Trash Can</p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Comment;
