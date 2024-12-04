import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";

import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsList.module.css";

import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import PopularProfiles from "../profiles/PopularProfiles";

function PostsList({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });

  const [hasLoaded, setHasLoaded] = useState(false);

  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(
          `/plants_blog/posts/?${filter}search=${query}`
        );
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <>
      <PopularProfiles mobile />
      <i className={`fas fa-search ${styles.SearchIcon}`} />
      <Form
        className={styles.SearchBar}
        onSubmit={(event) => event.preventDefault()}
      >
        <Form.Control
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="text"
          className="mr-sm-2"
          placeholder="Search posts"
        />
      </Form>

      {hasLoaded ? (
        <>
          {posts.results.length ? (
            <InfiniteScroll
              dataLength={posts.results.length}
              loader={<Asset spinner />}
              hasMore={!!posts.next}
              next={() => fetchMoreData(posts, setPosts)}
            >
              {posts.results.map((post) => (
                <Link
                  to={`/posts/${post.id}`}
                  key={post.id}
                  className={styles.PostLink}
                >
                  <div className={styles.PostItem}>
                    <h2>{post.main_plant_name}</h2>

                    <img
                      src={post.main_plant_image}
                      alt={post.main_plant_name}
                      style={{
                        width: "100%",
                        height: "30vh",
                        objectFit: "cover",
                      }}
                    />

                    <p>
                      {post.culinary_uses?.split(" ").slice(0, 20).join(" ")}
                      ...
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px",
                        borderBottom: "2px solid #57151e",
                      }}
                    >
                      <span>{post.owner}</span>

                      <div style={{ display: "flex", gap: "15px" }}>
                        <span style={{ marginRight: "5px" }}>❤️</span>

                        {/* Conditional rendering of an actual number for likes_count being greater */}
                        {/* than 0. Otherwise it only displays the heart emoji which is used to link */}
                        {/* to the detail page, along with the image and text for the post. */}
                        {post.likes_count > 0 && (
                          <span>{post.likes_count}</span>
                        )}
                        <span>
                          <span style={{ marginRight: "5px" }}>🗨</span>
                          {post.comments_count}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </InfiniteScroll>
          ) : (
            <Container className={appStyles.Content}>
              <Asset src={NoResults} message={message} />
            </Container>
          )}
        </>
      ) : (
        <Container className={appStyles.Content}>
          <Asset spinner />
        </Container>
      )}
    </>
  );
}

export default PostsList;
