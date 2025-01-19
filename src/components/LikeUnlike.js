// This LikeAndUnlike.js file handles liking and unliking for posts and comments.
// Originally part of Post.js, it was refactored into a reusable component which uses "itemType"
// dynamically handling a post or a comment.
// It keeps the likes_count accurate by fetching and updating data, to and from the backend.

import React from "react";
import { axiosRes } from "../api/axiosDefaults";
import styles from "../styles/LikeUnlike.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";

function LikeAndUnlike({ id, like_id, setItems, itemType }) {
  // Retrieves the current user's details.
  const currentUser = useCurrentUser();

  // Handles liking a post or a comment
  const handleLike = async () => {
    try {
      // Creates the like for an item
      await axiosRes.post("/likes/", { [itemType]: id });

      // Fetches the most updated data, ensuring an accurate count
      const { data: updatedPost } = await axiosRes.get(
        `/plants_blog/posts/${id}/`
      );

      // Updates the parent's state with the re-fetched data.
      setItems((prevItems) => ({
        ...prevItems,
        results: prevItems.results.map((item) =>
          item.id === id ? updatedPost : item
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // Handles unliking a post or comment.
  const handleUnlike = async () => {
    try {
      // Removes the like on an item
      await axiosRes.delete(`/likes/${like_id}/`);

      // Fetches the most updated data, ensuring an accurate count
      const { data: updatedPost } = await axiosRes.get(
        `/plants_blog/posts/${id}/`
      );

      // Updates the parent's state with the re-fetched data
      setItems((prevItems) => ({
        ...prevItems,
        results: prevItems.results.map((item) =>
          item.id === id ? updatedPost : item
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {like_id ? (
        // Displays a solid heart icon for liked items and allows unliking.
        <span onClick={handleUnlike}>
          <i className={`fas fa-heart ${styles.Heart}`} />
        </span>
      ) : currentUser ? (
        // Displays an outlined heart icon for unliked items and allows liking.
        <span onClick={handleLike}>
          <i className={`far fa-heart ${styles.HeartOutline}`} />
        </span>
      ) : (
        // Displays a static outlined heart icon for users who are not logged in.
        <i className="far fa-heart" />
      )}
    </div>
  );
}

export default LikeAndUnlike;
