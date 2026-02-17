// Handles fetching and rendering comments and nested replies for a post.

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
  // Stores fetched comments
  const [comments, setComments] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  // Fetch comments whenever the postId changes
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          `/comments/?plant_in_focus_post=${postId}`,
        );
        setComments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setHasLoaded(true);
      }
    };

    setHasLoaded(false);
    handleMount();
  }, [postId]);

  // Recursively renders comments and their nested replies
  const renderComments = (parentId = null) =>
    comments.results
      .filter((c) => c.replying_comment === parentId)
      .map((c) => (
        <div
          key={c.id}
          className={
            c.replying_comment === null ? styles.comment : styles.reply
          }
        >
          <Comment
            {...c}
            isReply={!!c.replying_comment}
            setComments={setComments}
          />
          {renderComments(c.id)}
        </div>
      ));

  return (
    <div className={styles.commentSection}>
      {/* Show comment form only for logged-in users */}
      {currentUser && (
        <CommentCreateForm
          profile_id={currentUser.profile_id}
          profileImage={profile_image}
          post={postId}
          setComments={setComments}
        />
      )}

      {/* Loading spinner whilst fetching */}
      {!hasLoaded && <Asset spinner />}

      {/* Render comments once loaded */}
      {hasLoaded &&
        (comments.results?.length > 0 ? (
          <InfiniteScroll
            dataLength={comments.results.length}
            hasMore={!!comments.next}
            next={() => fetchMoreData(comments, setComments)}
            loader={<Asset spinner />}
          >
            {renderComments()}
          </InfiniteScroll>
        ) : (
          <p>No comments yet.</p>
        ))}
    </div>
  );
}

export default CommentSection;
