// The CommentSection.js file fetches and displays comments for posts, using InfiniteScrolling

import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Comment from "./Comment";
import styles from "../../styles/CommentSection.module.css";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

function CommentSection({ postId }) {
  // Stores all comments
  const [comments, setComments] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  // Fetch comments for this post whenever postId changes
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          `/comments/?plant_in_focus_post=${postId}`
        );
        setComments(data);
      } catch (err) {
        console.log("Error fetching comments:", err);
      } finally {
        setHasLoaded(true);
      }
    };
    setHasLoaded(false); // Displays spinner until page is loaded
    handleMount();
  }, [postId]);

  // Recursively renders comments and replies to comments
  const renderComments = (parentId = null) =>
    comments.results
      .filter((c) => c.replying_comment === parentId)
      .map((c) => (
        <div
          key={c.id}
          className={
            c.replying_comment === null ? styles.Comment : styles.Reply
          }
        >
          {/* Renders a single comment */}
          <Comment
            {...c}
            isReply={!!c.replying_comment}
            setComments={setComments}
          />
          {/* Renders any replies to the single comment */}
          {renderComments(c.id)}
        </div>
      ));

  return (
    // Only logged-in users see the CommentCreateForm.
    <div className={styles.CommentSection}>
      {currentUser && (
        <CommentCreateForm
          profile_id={currentUser.profile_id}
          profileImage={profile_image}
          post={postId}
          setComments={setComments}
        />
      )}

      {/* Displays spinner whilst loading */}
      {!hasLoaded && <Asset spinner />}

      {/* Once loaded, show the comments or the fallback text */}
      {hasLoaded &&
        (comments.results?.length > 0 ? (
          <InfiniteScroll
            dataLength={comments.results.length}
            hasMore={!!comments.next} // keep loading comments all the time there is more.
            next={() => fetchMoreData(comments, setComments)}
            loader={<Asset spinner />}
          >
            {renderComments()}{" "}
            {/* Recursively render comments and replies to comments*/}
          </InfiniteScroll>
        ) : (
          <p>No comments yet.</p> // Fallback text if no comments are found.
        ))}
    </div>
  );
}

export default CommentSection;
