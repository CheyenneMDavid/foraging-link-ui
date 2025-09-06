// Profile.js is Based on the Code Institute “Moments” walkthrough project,
// and adapted for this app. It renders a single user's profile, with avatar,
// username, a conditional follow/unfollow button, and uses the
// ProfileDataContext to trigger follow/unfollow actions, whilst
// using the CurrentUserContext to ensure the follow/unfollow buttons are
// hidden for the profile owner.

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
      <div className={styles.AvatarContainer}>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} width={imageSize} />
        </Link>
      </div>

      {/* Username */}
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>

      {/* Conditionally displayed Follow/Unfollow buttons */}
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.UnfollowButton}`}
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.FollowButton}`}
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
