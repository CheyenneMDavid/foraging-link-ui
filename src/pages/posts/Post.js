// Post.js displays a single post's data.
// It shows the full post when used in PostPage.js,
// or only the "culinary_uses" and "main_plant_environment" fields when used in PostsListPage.js.
// It receives all post data as props and uses the `isListPage` prop
// to conditionally render content and apply styles.

import React from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import LikeUnlike from "../../components/LikeUnlike";

function Post(props) {
  const {
    id,
    owner,
    created_at,
    main_plant_name,
    main_plant_environment,
    culinary_uses,
    medicinal_uses,
    history_and_folklore,
    main_plant_image,
    main_plant_parts_used,
    main_plant_warnings,
    confusable_plant_name,
    confusable_plant_information,
    confusable_plant_warnings,
    confusable_plant_image,
    likes_count = 0, // Ensures a default value for likes_count
    like_id,
    comments_count = 0, // Ensures a default value for comments_count
    setPosts,
    isListPage, // Used to check if the post is being rendered on the list page.
  } = props;

  // Gets the currently logged-in user's details.
  const currentUser = useCurrentUser();

  // Checks if the currently logged-in user is the owner of the post.
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Post}>
      {/* Main Plant Section */}
      <section aria-label="Main Plant Section">
        <Link to={`/posts/${id}`}>
          {main_plant_name && <h2>{main_plant_name}</h2>}

          <Card.Img
            src={
              main_plant_image
                ? main_plant_image.replace(
                    "/upload/",
                    isListPage
                      ? "/upload/f_auto,q_auto,w_600,h_300,c_fill,g_auto/"
                      : "/upload/f_auto,q_auto,w_600,h_300,c_fill,g_auto/"
                  )
                : ""
            }
            alt={main_plant_name}
            aria-describedby="main-plant-description"
            width="600"
            height={isListPage ? "300" : "400"}
          />

          <Card.Body>
            {isListPage ? (
              <>
                {main_plant_environment && (
                  <Card.Text>{main_plant_environment}</Card.Text>
                )}
                {culinary_uses && <Card.Text>{culinary_uses}</Card.Text>}
              </>
            ) : (
              <>
                {main_plant_environment && (
                  <Card.Text>{main_plant_environment}</Card.Text>
                )}
                {culinary_uses && <Card.Text>{culinary_uses}</Card.Text>}
                {medicinal_uses && <Card.Text>{medicinal_uses}</Card.Text>}
                {history_and_folklore && (
                  <Card.Text>{history_and_folklore}</Card.Text>
                )}
                {main_plant_parts_used && (
                  <Card.Text>{main_plant_parts_used}</Card.Text>
                )}
                {main_plant_warnings && (
                  <Card.Text>{main_plant_warnings}</Card.Text>
                )}
              </>
            )}
          </Card.Body>
        </Link>
      </section>

      {/* Confusable Plant Section */}
      {!isListPage && ( // Excludes the confusable plant section from the list page.
        <section aria-label="Confusable Plant Section">
          {confusable_plant_name && (
            <h3 className="text-center">{confusable_plant_name}</h3>
          )}
          <Card.Body>
            {confusable_plant_information && (
              <Card.Text>{confusable_plant_information}</Card.Text>
            )}
            {confusable_plant_warnings && (
              <Card.Text>{confusable_plant_warnings}</Card.Text>
            )}
            {confusable_plant_image && (
              <Card.Img
                src={
                  confusable_plant_image
                    ? confusable_plant_image.replace(
                        "/upload/",
                        "/upload/f_auto,q_auto,w_600,h_300,c_fill,g_auto/"
                      )
                    : ""
                }
                alt={confusable_plant_name}
                aria-describedby="confusable-plant-description"
              />
            )}
          </Card.Body>
        </section>
      )}

      {/* User and Author Interaction Section */}
      <section aria-label="User and Author Interaction Section">
        <Card.Body>
          <div className={styles.PostBar}>
            <span className={styles.CreationDate}>{created_at}</span>
            <div className={styles.LikeCommentWrapper}>
              <div className={styles.LikeSection}>
                {is_owner ? (
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>You can't like your own post!</Tooltip>}
                  >
                    <i className="far fa-heart" />
                  </OverlayTrigger>
                ) : !currentUser ? (
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Sign in to like posts!</Tooltip>}
                  >
                    <i className="far fa-heart" />
                  </OverlayTrigger>
                ) : (
                  <LikeUnlike
                    id={id}
                    like_id={like_id}
                    likes_count={likes_count}
                    setItems={setPosts}
                    itemType="plant_in_focus_post"
                  />
                )}
                <span className={styles.LikesCount}>{likes_count}</span>
              </div>
              {!currentUser ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Sign in to join the discussion!</Tooltip>}
                >
                  <div className={styles.CommentSection}>
                    <i className="far fa-comments no-hover" />
                    <span className={styles.CommentsCount}>
                      {comments_count}
                    </span>
                  </div>
                </OverlayTrigger>
              ) : (
                <div className={styles.CommentSection}>
                  <i className="far fa-comments no-hover" />
                  <span className={styles.CommentsCount}>{comments_count}</span>
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </section>
    </Card>
  );
}

export default Post;
