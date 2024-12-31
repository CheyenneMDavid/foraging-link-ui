// This file is the "Like" component which is utilised by Posts and also Comments.
// Originally part of the Post.js, extracted and made into an individual reusable component.

import React from "react";
import { axiosRes } from "../api/axiosDefaults";
import styles from "../styles/Post.module.css";

function LikeAndUnlike({ id, like_id, likes_count, setItems, itemType }) {
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", {
        [itemType]: id, // Dynamically uses the field name passed via props, avoiding hardcoding
        // its purpose, making it usable in Posts and also Comments.
      });
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

  return (
    <div>
      {like_id ? (
        <span onClick={handleUnlike}>
          {" "}
          <i className={`fas fa-heart ${styles.Heart}`} />
        </span>
      ) : (
        <span onClick={handleLike}>
          <i className={`far fa-heart ${styles.HeartOutline}`} />
        </span>
      )}
      {/* Conditional rendering of an actual number for likes_count being greater than 0. */}
      {/* Otherwise it only displays a greyed out Font Awesome heart, which a signed in user */}
      {/* can interact with. */}
      {likes_count > 0 && <span>{likes_count}</span>}
    </div>
  );
}

export default LikeAndUnlike;
