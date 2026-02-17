// Profile component adapted from the Code Institute
// “Moments” walkthrough project. It has been modified
// to suit this application's architecture and styling.
// It displays the avatar and username, and conditionally
// renders follow/unfollow controls based on authentication
// state and profile ownership.

import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

// Profile component displaying the user's avatar, name, and the conditional
// follow/unfollow button
const Profile = (props) => {
  const { profile, mobile, imageSize = 30 } = props;
  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  // Destructuring of the follow and unfollow handlers from ProfileDataContext
  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      {/* Avatar with link to the user's profile page */}
      <div className={styles.avatarContainer}>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} width={imageSize} />
        </Link>
      </div>

      {/* Username */}
      <div className={`mx-2 ${styles.wordBreak}`}>
        <strong>{owner}</strong>
      </div>

      {/* Conditionally displayed Follow/Unfollow buttons */}
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.button} ${btnStyles.unfollowButton}`}
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.button} ${btnStyles.followButton}`}
              onClick={() => handleFollow(profile)}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
