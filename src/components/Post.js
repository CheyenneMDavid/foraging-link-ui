// Component to display all information for a single post within the PostList

import React from "react";
import styles from "../styles/Post.module.css";
import Avatar from "./Avatar";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const Post = () => {
  const currentUser = useCurrentUser();

  return (
    <div className={styles.TempColor3}>
      <Avatar src={currentUser?.profile_image} height={20} />
      <h3>
        Post: Displays a single post’s details, including the author’s avatar.
      </h3>
    </div>
  );
};

export default Post;
