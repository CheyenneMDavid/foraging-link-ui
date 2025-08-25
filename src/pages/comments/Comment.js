// Comment.js - Renders individual comments with user interactions like likes, replies, and more options.

import React, { useState } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import btnStyles from "../../styles/Button.module.css";
import LikeUnlike from "../../components/LikeUnlike";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import ReplyCreateForm from "./ReplyCreateForm";
import CommentEditForm from "./CommentEditForm";

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

  const currentUser = useCurrentUser();
  const is_owner = currentUser.username === owner;

  // Toggles reply and edit for the UI
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // Deletes the comment from the backend, filters out the removed comment
  // updates local state and displays the change immediately.
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setComments((prev) => ({
        ...prev,
        results: (prev.results || []).filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Comment}>
      <Card.Body>
        <div className={styles.CommentContainer}>
          {/* Display user's avatar with a link to their profile */}
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

          {/* Display the comment's text content */}
          <div className={styles.CommentContent}>
            {showEditForm ? (
              <CommentEditForm
                id={id}
                profile_id={profile_id}
                content={content}
                profileImage={profile_image}
                setComments={setComments}
                setShowEditForm={setShowEditForm}
              />
            ) : (
              <Card.Text>{content}</Card.Text>
            )}
          </div>

          {/* Show edit/delete options if the comment belongs to the current user */}
          {is_owner && !showEditForm && (
            <MoreDropdown
              handleEdit={() => setShowEditForm(true)}
              handleDelete={handleDelete}
            />
          )}
        </div>

        {/* Display the comment's creation date and user interaction options */}
        <div className={styles.CommentBar}>
          <span className={styles.CreationDate}>{created_at}</span>

          {/* Likes section - disables likes for the comment owner */}
          <div className={styles.LikesSection}>
            {is_owner ? (
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
              // Ability to Like and Unlike for users who don't own the comment.
              <div className={styles.LikeWrapper}>
                <LikeUnlike
                  id={id}
                  like_id={like_id}
                  likes_count={likes_count}
                  setItems={setComments}
                  itemType="comment"
                />
                <span className={styles.LikesCount}>{likes_count}</span>
              </div>
            )}
          </div>

          {/* Button to toggle the reply form on/off */}
          <button
            className={`${btnStyles.Button}`}
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            {showReplyForm ? "Cancel" : "Reply"}
          </button>
        </div>

        {/* Show reply form only when toggled on */}
        {showReplyForm && (
          <ReplyCreateForm
            profile_id={currentUser?.profile_id}
            profileImage={profile_image}
            replying_comment={id}
            setComments={setComments}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Comment;
