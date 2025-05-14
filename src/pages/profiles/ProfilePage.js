import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";

import Sidebar from "../../components/Sidebar";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileComments, setProfileComments] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
        ]);
        console.log("Fetched profile data:", pageProfile);
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

  // Fetches all comments made by the profile owner
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

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className={`text-lg-left ${styles.ProfileInfo}`}>
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        {/* Name of the profile owner */}
        <Col lg={6}>
          <h3 className="m-2">
            {profile?.owner}
            {/* Displays a trophy for top contributors (set to 2+ comments for now) */}
            {profile?.total_comments_count >= 2 && (
              <span
                style={{
                  marginLeft: "5px",
                  fontSize: "0.6em",
                  display: "inline-block",
                }}
              >
                🏆
              </span>
            )}
          </h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => {}}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => {}}
              >
                follow
              </Button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      {/* Section for user's comments */}
      <hr />
      <p className="text-center">Profile owner's comments</p>
      <hr />

      {profileComments.results.length ? (
        // Loops through each comment and renders its content with a link to the post
        profileComments.results.map((comment) => (
          <div key={comment.id} className="mb-3">
            {/* Display the comment content */}
            <p>{comment.content}</p>
            {/* Link to the original post or comment that this comment belongs to */}
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
        // Shown when the user has yet to make a comment.
        <p className="text-center">This user hasn't commented yet.</p>
      )}
    </>
  );

  return (
    <Row>
      <Col lg={8} md={12}>
        <div className="d-md-none">
          <PopularProfiles mobile />
        </div>

        <Container
          className={`${appStyles.Content} ${styles.ProfileContainer}`}
        >
          <div className={styles.ProfileWrapper}>
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
      {/* Sidebar Container for Courses and Popular Profiles */}
      <Col lg={4} className="d-none d-lg-block">
        <Sidebar />
      </Col>
    </Row>
  );
}

export default ProfilePage;
