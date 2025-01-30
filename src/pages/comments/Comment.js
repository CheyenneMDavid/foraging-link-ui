// CommentSection.js - Responsible for fetching and rendering comments.
// It imports the ReplyCreateForm component which enables users to reply to comments already made.

import React, { useState } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import LikeUnlike from "../../components/LikeUnlike";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import ReplyCreateForm from "./ReplyCreateForm";

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

  // State for replies.
  const [replyComments, setReplyComments] = useState({ results: [] });

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
          {is_owner && <MoreDropdown />}
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
          {/* Component for adding replies to comments */}
          <ReplyCreateForm
            profile_id={currentUser.profile_id}
            profileImage={profile_image}
            replying_comment={id}
            setReplyComments={setReplyComments}
          />
        </div>

        {replyComments.results.length > 0 && (
          <div className={styles.RepliesContainer}>
            {replyComments.results.map((reply) => (
              <Card key={reply.id} className={styles.Reply}>
                <Card.Body>
                  <div className={styles.CommentContainer}>
                    <Link to={`/profiles/${reply.profile_id}`}>
                      <Avatar
                        src={reply.profile_image}
                        height={30}
                        alt={`${reply.owner}'s avatar`}
                      />
                    </Link>
                    <strong className={styles.CommentAuthor}>
                      {reply.owner}
                    </strong>
                  </div>
                  <Card.Text>{reply.content}</Card.Text>
                  <span className={styles.CreationDate}>
                    {reply.created_at}
                  </span>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default Comment;
