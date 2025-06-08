// Purpose of Post.js is to render a single post's data using props passed to it.
// It is used in PostPage.js to display the details of a single post
// and in PostsList.js to display posts in a list on the homepage.
// "isListPage" is used to check where the image is being displayed and applies styling accordingly

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

  // Truncated text for the list page only
  const truncatedText = culinary_uses
    ? culinary_uses.split(" ").slice(0, 30).join(" ") + "..."
    : "";

  return (
    <Card className={styles.Post}>
      {/* Main Plant Section */}
      <section aria-label="Main Plant Section">
        {main_plant_name && <h2>{main_plant_name}</h2>}
        <Link to={`/posts/${id}`}>
          <Card.Img
            src={main_plant_image}
            alt={main_plant_name}
            aria-describedby="main-plant-description"
            className={isListPage ? styles.PostImage : undefined} // Applies style conditionally
          />
        </Link>
        <Card.Body>
          {isListPage ? ( // Render truncated text in list page
            <Card.Text>{truncatedText}</Card.Text>
          ) : (
            <>
              {/* Render full details in detail page */}
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
      </section>

      {/* Confusable Plant Section */}
      {!isListPage && ( // Exclude confusable plant section from list page
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
                src={confusable_plant_image}
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
      <hr className={styles.PostSeparation} />
    </Card>
  );
}

export default Post;
