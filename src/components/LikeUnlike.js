// LikeAndUnlike is a reusable component that uses the variable "itemType" to manage the likes for
// both the Posts and Comments. It fetches the initial number of likes just the once and updates
// the backend with like/unlike actions as they are made. Instead of repeatedly fetching
// likes_count from the backend, it uses "Optimistic Updates" to provide immediate feedback
// in the UI, ensuring that the likes_count shown to the user is correct.

import React from "react";
import { axiosRes } from "../api/axiosDefaults";
import styles from "../styles/LikeUnlike.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";

function LikeAndUnlike({ id, like_id, setItems, itemType }) {
  // Retrieves the currently logged-in user's details
  const currentUser = useCurrentUser();

  // handleLike function that manages liking of an item, updating the backend and ensures
  // that the front and back are in sync.
  const handleLike = async () => {
    try {
      // Updates the likes_count and like_id locally to provide immediate feedback in the UI
      setItems((prevItems) => ({
        // Spreads the previous state to preserve all existing properties and values
        ...prevItems,
        // Iterates over the results array to update the specific item matching the id
        results: prevItems.results.map(
          (item) =>
            // Checks if the current item's id matches the target id
            item.id === id
              ? {
                  ...item,
                  likes_count: item.likes_count + 1,
                  like_id: "temp_like_id",
                }
              : item, // If the id doesn't match, the item remains unchanged.
        ),
      }));

      // Sends a request to the backend to create the like
      const { data } = await axiosRes.post("/likes/", { [itemType]: id });

      // Replaces the temporary like_id with the real one received from the backend
      setItems((prevItems) => ({
        ...prevItems,
        results: prevItems.results.map((item) =>
          item.id === id ? { ...item, like_id: data.id } : item,
        ),
      }));
    } catch (err) {
      console.error(err);
      // If the request to create a like fails to update the database, the front end reverts the
      // likes_count displayed in the UI to ensure it remains consistent with the backend.
      setItems((prevItems) => ({
        ...prevItems,
        results: prevItems.results.map((item) =>
          item.id === id
            ? { ...item, likes_count: item.likes_count - 1, like_id: null }
            : item,
        ),
      }));
    }
  };

  // handleUnlike function that's responsible for managing the unliking of and item, updating
  // the backend and ensuring that the front and back are in sync.
  const handleUnlike = async () => {
    try {
      // Updates likes_count and like_id locally to provide immediate feedback in the UI.
      setItems((prevItems) => ({
        // Spread the previous state to preserve all existing properties and values
        ...prevItems,
        // Iterates over the results array to update the specific item matching the given id
        results: prevItems.results.map(
          (item) =>
            // Checks if the current item's id matches the target id
            item.id === id
              ? { ...item, likes_count: item.likes_count - 1, like_id: null }
              : item, // If the id doesn't match, the item remains unchanged.
        ),
      }));

      // Sends a request to the backend to delete a like
      await axiosRes.delete(`/likes/${like_id}/`);
    } catch (err) {
      console.error(err);
      // If the request to delete a like fails to update the database, the front end reverts the
      // likes_count displayed in the UI to ensure it remains consistent with the backend.
      setItems((prevItems) => ({
        ...prevItems,
        results: prevItems.results.map((item) =>
          item.id === id
            ? { ...item, likes_count: item.likes_count + 1, like_id }
            : item,
        ),
      }));
    }
  };

  return (
    <div>
      {like_id ? (
        // If the item is already liked, a filled in heart is displayed.
        <span onClick={handleUnlike}>
          <i className={`fas fa-heart ${styles.heart}`} />
        </span>
      ) : currentUser ? (
        // If the item is not yet liked and the user is logged in, an outlined heart is displayed
        // and liking is allowed.
        <span onClick={handleLike}>
          <i className={`far fa-heart ${styles.heartOutline}`} />
        </span>
      ) : (
        // If the user is not logged in, display a static outline heart icon
        <i className="far fa-heart" />
      )}
    </div>
  );
}

export default LikeAndUnlike;
