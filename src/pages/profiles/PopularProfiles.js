import React from "react";
import appStyles from "../../App.module.css";
import styles from "../../styles/ProfilePage.module.css";
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
        <span>
          <Link className={styles.Link} to="/signin">
            {" "}
            Sign-in
          </Link>{" "}
          or
          <Link className={styles.Link} to="/signup">
            {" "}
            Sign-up to join in with the community!
          </Link>
        </span>
      ) : (
        <>
          <h3>Most Followed Profiles</h3>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles?.results?.slice(0, 4).map((profile) => (
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
