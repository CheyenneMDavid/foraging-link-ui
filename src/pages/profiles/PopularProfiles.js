// PopularProfiles displays the most followed profiles, adapts
// layouts depending on screen size via the `mobile` prop and also
// conditionally renders sign-in prompts for unauthenticated users.

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
  // Retrieves profile data from ProfileDataContext.
  const { popularProfiles } = useProfileData();

  // Determines whether profile data should be displayed
  // or authentication prompts should be shown instead.
  const { isLoggedIn } = useAuth();

  return (
    <Container
      // Applies Sidebar-specific styling only when rendered
      // in mobile mode. Desktop layout is controlled by Sidebar.
      className={`${appStyles.content} ${
        mobile ? `${sidebarStyles.sidebar} d-lg-none text-center mb-3` : ""
      }`}
    >
      {!isLoggedIn ? (
        // Encourages authentication rather than exposing
        // community profile data to unauthenticated users.
        <div className={styles.signInSignUp}>
          <Link to="/signin">Sign-in</Link> or <Link to="/signup">Sign-up</Link>{" "}
          to join in with the community!
        </div>
      ) : (
        <>
          <h2>Most Followed Profiles</h2>

          {mobile ? (
            // On mobile, limit display to top 3 profiles.
            <div className="d-flex justify-content-around">
              {popularProfiles?.results?.slice(0, 3).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            // On desktop, display the full list.
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
