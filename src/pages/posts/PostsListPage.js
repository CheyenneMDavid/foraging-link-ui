// PostsListPage.js fetches and displays all the blog posts.
// It shows a truncated form of "culinary_uses" text for each post in the list.
// It uses InfiniteScroll to dynamically load additional posts.
// And passes `isListPage={true}` to Post.js to control the layout and content being rendered.

import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";

import styles from "../../styles/PostsListPage.module.css";

import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PopularProfiles from "../profiles/PopularProfiles";
import Post from "./Post";

function PostsListPage({ message, filter = "", query }) {
  // State for storing posts data and loading status
  const [posts, setPosts] = useState({ results: [] });
  const [pageLoading, setPageLoading] = useState(true);

  // Gets the current URL location to trigger re-fetching of posts for navigation
  const { pathname } = useLocation();

  // Get the currently logged-in user
  const currentUser = useCurrentUser();

  useEffect(() => {
    // Fetches posts from the API according to the current filter and query
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(
          `/plants_blog/posts/?${filter}search=${query}`
        );
        setPosts(data); // Updates posts state with api response
        setPageLoading(false); // sets data's loaded
      } catch (err) {
        console.log(err);
      }
    };

    setPageLoading(true); // resets the loading status before fetching new data
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer); // Clears timeout on component unmount or dependency change.
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <>
      {/* Display for popular profiles when in mobile view */}
      <PopularProfiles mobile />

      {!pageLoading ? (
        <div className={styles.PostsListContainer}>
          {posts.results.length ? (
            <InfiniteScroll
              dataLength={posts.results.length} // number of posts
              loader={<Asset spinner />} //spinner for loading more data
              hasMore={!!posts.next} //checks if there's more data
              next={() => fetchMoreData(posts, setPosts)} // gets more posts
            >
              {posts.results.map((post) => {
                const truncatedCulinary = post.culinary_uses // Redefines the culinary_uses prop for display in the list page only.
                  ? post.culinary_uses.split(" ").slice(0, 30).join(" ") + "..."
                  : "";

                return (
                  <Post
                    key={post.id}
                    {...post}
                    culinary_uses={truncatedCulinary} // override only this field when in the list page.
                    setPosts={setPosts}
                    isListPage={true}
                  />
                );
              })}
            </InfiniteScroll>
          ) : (
            <Container className={appStyles.Content}>
              <Asset src={NoResults} message={message} />
            </Container>
          )}
        </div>
      ) : (
        // Spinner displayed while data is loading
        <Container className={appStyles.Content}>
          <Asset spinner />
          <p className={styles.LoadingMessage}>
            Hang on in there, we're just looking for you!
          </p>
        </Container>
      )}
    </>
  );
}

export default PostsListPage;
