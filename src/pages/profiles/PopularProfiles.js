import React from "react";
import appStyles from "../../App.module.css";
import { Container } from "react-bootstrap";
import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";
import { useAuth } from "../../contexts/AuthContext";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();
  const { isLoggedIn } = useAuth();

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {!isLoggedIn ? (
        <p>Please Sign in to view popular profiles.</p>
      ) : (
        <>
          <p>Most Followed Profiles</p>
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
