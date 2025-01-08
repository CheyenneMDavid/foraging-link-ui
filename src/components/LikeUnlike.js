// This file is the "Like" component which is utilised by Posts and also Comments.
// Originally part of the Post.js, extracted and made into an individual reusable component.

import React from "react";
import { axiosRes } from "../api/axiosDefaults";
import styles from "../styles/LikeUnlike.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";

function LikeAndUnlike({ id, like_id, likes_count, setItems, itemType }) {
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", {
        [itemType]: id, // Dynamically uses the field name passed via props, avoiding hardcoding
        // its purpose, making it usable in Posts and also Comments.
      });

      console.log("Previous Items (Before Like): ", setItems);
      console.log("Updated Item ID: ", id);

      setItems((prevItems) => ({
        ...prevItems,
        results: prevItems.results.map((item) =>
          item.id === id
            ? {
                ...item,
                likes_count: (item.likes_count || 0) + 1,
                like_id: data.id,
              }
            : item
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);

      console.log("Previous Items (Before Unlike): ", setItems);
      console.log("Updated Item ID: ", id);

      setItems((prevItems) => ({
        ...prevItems,
        results: prevItems.results.map((item) =>
          item.id === id
            ? {
                ...item,
                likes_count: (item.likes_count || 1) - 1,
                like_id: null,
              }
            : item
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // Gets the currently logged in user's details.
  const currentUser = useCurrentUser();

  return (
    <div>
      {like_id ? (
        <span onClick={handleUnlike}>
          <i className={`fas fa-heart ${styles.Heart}`} />
        </span>
      ) : currentUser ? (
        <span onClick={handleLike}>
          <i className={`far fa-heart ${styles.HeartOutline}`} />
        </span>
      ) : (
        <i className="far fa-heart" />
      )}
      {likes_count > 0 && <span>{likes_count}</span>}
    </div>
  );
}

export default LikeAndUnlike;
