import React from "react";
import appStyles from "../../App.module.css";
import styles from "../../styles/PopularProfiles.module.css";

import sidebarStyles from "../../styles/Sidebar.module.css";

import { Container } from "react-bootstrap";
import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();
  const { isLoggedIn } = useAuth();

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile ? `${sidebarStyles.Sidebar} d-lg-none text-center mb-3` : ""
      }`}
    >
      {!isLoggedIn ? (
        <div className={styles.SignInSignUp}>
          <Link to="/signin"> Sign-in</Link> or
          <Link to="/signup"> Sign-up</Link> to join in with the community!
        </div>
      ) : (
        <>
          <h2>Most Followed Profiles</h2>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles?.results?.slice(0, 3).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles?.results?.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      )}
    </Container>
  );
};

export default PopularProfiles;
