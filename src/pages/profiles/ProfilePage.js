// The ProfilePage shows one user's profile. It's based on the Code Institute
// “Moments” walkthrough and adapted for this app.
// It display profile information, a list of comments the the profile owner
// has made along with links back to the associated posts.
// Conditionally displayed buttons for the edit profile and follow/unfollow
// are shown, based on whether the logged in user own the profile being viewed.

import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link, useParams } from "react-router-dom";
import Asset from "../../components/Asset";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import { axiosReq } from "../../api/axiosDefaults";

function ProfilePage() {
  // Tracks the loading state for profile data.
  const [hasLoaded, setHasLoaded] = useState(false);

  // Stores the comments made by this profile owner.
  const [profileComments, setProfileComments] = useState({ results: [] });

  // Gets the current logged-in user.
  const currentUser = useCurrentUser();

  // Gets the profile ID from URL.
  const { id } = useParams();

  // Gets the profile data setters and follow/unfollow handlers from context.
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();

  // Access the profile data from context.
  const { pageProfile } = useProfileData();

  // Extract the first profile object from the results array.
  const [profile] = pageProfile.results;

  // Checks if the profile belongs to the logged-in user
  const is_owner = currentUser?.username === profile?.owner;

  // Fetches profile details when page loads or ID changes.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
        ]);

        setProfileData((prevState) => ({
          ...prevState,

          pageProfile: { results: [pageProfile] },
        }));

        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id, setProfileData]);

  // Fetches comments created by this profile owner.
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axiosReq.get(
          `/comments/?owner__username=${profile?.owner}`
        );

        setProfileComments(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (profile?.owner) {
      fetchComments();
    }
  }, [profile?.owner]);

  // Profile header section: avatar, follow/unfollow and stats.
  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        {/* Profile image. */}
        <Col lg={3} className={`text-lg-left ${styles.ProfileInfo}`}>
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
          {/* Conditionally displayed edit button. */}
          {is_owner && (
            <Button
              className={`${btnStyles.Button} ${btnStyles.EditButton} m-3`}
              as={Link}
              to={`/profiles/${profile?.id}/edit`}
              style={{ width: "50%" }}
            >
              Edit profile
            </Button>
          )}
        </Col>

        {/* Owner name */}
        <Col lg={6}>
          <h2 className="text-center">{profile?.owner}</h2>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>

              {/* Follower/following counts. */}
              <div>followers</div>
            </Col>

            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>

              <div>following</div>
            </Col>
          </Row>
        </Col>

        {/* Conditionally displayed Follow/Unfollow button */}
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
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
        </Col>

        {/* Profile bio if available. */}
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  // Section listing the user's comments with links to posts
  const mainProfilePosts = (
    <>
      <hr />
      <h5 className="mx-3">
        {profile?.owner}'s comments
        {/* Award badge/Top Contributor if over 3 comments */}
        {profile?.total_comments_count >= 3 && (
          <span
            style={{
              marginLeft: "5px",
              fontSize: "0.8em",
              display: "inline-block",
            }}
          >
            🏆 (top contributor)
          </span>
        )}
      </h5>

      <hr />
      {/* Comments made by profile owner with links to root posts/comments */}
      {profileComments.results.length ? (
        profileComments.results.map((comment) => (
          <div key={comment.id} className="mx-3">
            <p>{comment.content}</p>

            <p className={styles.Link}>
              <a href={`/posts/${comment.plant_in_focus_post}`}>
                {comment.replying_comment !== null
                  ? ". . . Follow the conversation --->"
                  : ". . . See original post --->"}
              </a>
            </p>
            <hr className={styles.commentListDivider} />
          </div>
        ))
      ) : (
        <p className="text-center">This user hasn't commented yet.</p>
      )}
    </>
  );

  // Renders full profile page with sidebar and profile sections
  return (
    <Row>
      {/* Main profile and comments */}
      <Col lg={8} md={12}>
        {/* Popular profiles displayed above content on mobile devices */}
        <div className="d-md-none">
          <PopularProfiles mobile />
        </div>

        <Container
          className={`${appStyles.Content} ${styles.ProfileContainer}`}
        >
          <div className={styles.ProfileWrapper}>
            {/* Displays profile + comments with loading spinner whilst loading */}
            {hasLoaded ? (
              <>
                {mainProfile}

                {mainProfilePosts}
              </>
            ) : (
              <Asset spinner />
            )}
          </div>
        </Container>
      </Col>

      {/* Sidebar is only shown on large screens */}
      <Col lg={4} className="d-none d-lg-block">
        <Sidebar />
      </Col>
    </Row>
  );
}

export default ProfilePage;
