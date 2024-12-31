// Purpose of Post.js is to render a single post's data using props passed to it.
// It can be used in PostPage.js for a detailed view of a post or in components
// like PostList.js to display posts in a list page which is the Homepage.

import React from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import LikeAndUnlike from "../../components/LikeAndUnlike";

function Post(props) {
  // Destructures the props to extract all the data required for rendering the posts.
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
    likes_count,
    like_id,
    comments_count,
    setPosts, // Function to update the state of posts, passed as a prop from PostPage.js
  } = props;

  // Checks if the currently logged-in user to determine if they can interact with the post.
  const currentUser = useCurrentUser();

  // Checks if the currently logged-in user is the owner of the post.
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Post}>
      {/* Main Plant Section */}
      <section aria-label="Main Plant Section">
        {main_plant_name && <h2 className="text-center">{main_plant_name}</h2>}

        <Link to={`/posts/${id}`}>
          <Card.Img
            src={main_plant_image}
            alt={main_plant_name}
            aria-describedby="main-plant-description"
          />
        </Link>

        <Card.Body>
          {main_plant_environment && (
            <Card.Text id="main-plant-description">
              {main_plant_environment}
            </Card.Text>
          )}
          {culinary_uses && <Card.Text>{culinary_uses}</Card.Text>}
          {medicinal_uses && <Card.Text>{medicinal_uses}</Card.Text>}
          {history_and_folklore && (
            <Card.Text>{history_and_folklore}</Card.Text>
          )}
          {main_plant_parts_used && (
            <Card.Text>{main_plant_parts_used}</Card.Text>
          )}
          {main_plant_warnings && <Card.Text>{main_plant_warnings}</Card.Text>}
        </Card.Body>
      </section>

      {/* Confusable Plant Section */}
      <section aria-label="Confusable Plant Section">
        {confusable_plant_name && (
          <h3 className="text-center">{confusable_plant_name}</h3>
        )}

        <Card.Body>
          {confusable_plant_information && (
            <Card.Text id="confusable-plant-description">
              {confusable_plant_information}
            </Card.Text>
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

      {/* User and Author Interaction Section */}
      <section aria-label="User and Author Interaction Section">
        <Card.Body>
          <div className={styles.PostBar}>
            <span className={styles.CreationDate}>{created_at}</span>
            <div>
              {is_owner ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You can't like your own post! </Tooltip>}
                >
                  <span className="text-muted">Cannot like your own post</span>
                </OverlayTrigger>
              ) : currentUser ? (
                <LikeAndUnlike
                  id={id}
                  like_id={like_id}
                  likes_count={likes_count}
                  setItems={setPosts}
                  itemType="plant_in_focus_post"
                />
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Log in to like posts!</Tooltip>}
                >
                  <span className="text-muted">Log in to like</span>
                </OverlayTrigger>
              )}

              {/* Link to post detail page with comments count */}
              <Link to={`plants_blog/posts/${id}`}>
                <i className="far fa-comments" />
              </Link>
              {comments_count}
            </div>
          </div>
        </Card.Body>
      </section>
    </Card>
  );
}

export default Post;
