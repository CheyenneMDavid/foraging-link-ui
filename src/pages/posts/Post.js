// Purpose of Post.js is to fetch all data for a post so it can be used in PostPage.js which
// is the detail page for a post, and a component that creates a list of posts with
// limited information

import React from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";

import { axiosRes } from "../../api/axiosDefaults";

function Post(props) {
  // Destructures the props to extract all the data required for rendering the posts.
  const {
    id,
    owner,
    profile_id,
    profile_image,
    updated_at,
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

  // Checks if the currently logged in user is the owner of the post
  const is_owner = currentUser?.username === owner;

  // Function for liking a post
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", {
        plant_in_focus_post: id,
      });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // Function for unliking a post
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // Conditional rendering of the main plant's name.  If it doesn't exist, this avoids a
  // empty space on the screen.
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

      <section aria-label="User and Author Interaction Section">
        <Card.Body>
          <div className={styles.PostBar}>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar
                className={styles.PostAvatar}
                src={profile_image}
                text={owner}
                height={30}
                width={30}
              />
            </Link>
            <span>{updated_at}</span>
            <div>
              {is_owner ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You can't like your own post!</Tooltip>}
                >
                  <i className="far fa-heart" />
                </OverlayTrigger>
              ) : like_id ? (
                <span onClick={handleUnlike}>
                  <i className={`fas fa-heart ${styles.Heart}`} />
                </span>
              ) : currentUser ? (
                <span onClick={handleLike}>
                  <i className={`far fa-heart ${styles.HeartOutline}`} />
                </span>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Log in to like posts!</Tooltip>}
                >
                  <i className="far fa-heart" />
                </OverlayTrigger>
              )}
              {likes_count}
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
