import React from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import LikeUnlike from "../../components/LikeUnlike";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function Comment(props) {
  const {
    owner,
    profile_image,
    profile_id,
    created_at,
    content,
    likes_count,
    id,
    like_id,
    setComments,
  } = props;

  // Gets the currently logged-in user's details
  const currentUser = useCurrentUser();

  // Checks if the logged-in user is the owner of the comment
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Comment}>
      <Card.Body>
        <div className={styles.CommentContainer}>
          {/* Avatar and username section */}
          <div className={styles.CommentHead}>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar
                src={profile_image}
                height={40}
                alt={`${owner}'s avatar`}
              />
            </Link>
            <strong className={styles.CommentAuthor}>{owner}</strong>
          </div>

          {/* Comment content */}
          <div className={styles.CommentContent}>
            <Card.Text>{content}</Card.Text>
          </div>
        </div>

        {/* User interaction section */}
        <div className={styles.CommentBar}>
          <span className={styles.CreationDate}>{created_at}</span>

          {/* Likes section */}
          <div className={styles.LikesSection}>
            {is_owner ? (
              // Tooltip for owners explaining why they can't like their own comment
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't like your own comment!</Tooltip>}
              >
                <span className={styles.LikeItem}>
                  <i className="far fa-heart" />
                  {likes_count > 0 && <span>{likes_count}</span>}
                </span>
              </OverlayTrigger>
            ) : (
              // Like and Unlike functionality for other users
              <LikeUnlike
                id={id}
                like_id={like_id}
                likes_count={likes_count}
                setItems={setComments}
                itemType="comment"
              />
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Comment;
