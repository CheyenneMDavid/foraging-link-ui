// Component to display a list of all the posts from "plants_blog"

import React from "react";
import styles from "../styles/Post.module.css";
import Post from "./Post";

const PostList = () => {
  return (
    <div>
      <h2 className={styles.TempColor2}>
        PostList: Displays a list of all the blog posts.
      </h2>
      <Post />
    </div>
  );
};

export default PostList;
