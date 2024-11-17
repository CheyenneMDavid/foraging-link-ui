// Component that serves as the landing page, displaying the PostList and any associated Comments if they're available.

import React from "react";
import styles from "../../styles/Post.module.css";

const HomePage = () => {
  return (
    <div>
      <h1 className={styles.TempColor1}>
        HomePage: Displays the PostList after pulling in content from
        PostsList.js
      </h1>
      {/* <PostsList /> */}
    </div>
  );
};

export default HomePage;
