// ProfileDataContext.js keeps track of profile information and makes it
// available to other components and functions across the app.

import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });
  const currentUser = useCurrentUser();

  // Called when follow button is clicked. Sends request to follow the profile.
  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        // // Gets profiles, with most followers
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        // Logs API response for debugging, with better context about the data received.
        console.log(
          "ProfileDataContext - Popular Profiles API Response:",
          data
        );
        // Updates the profileData state, preserving the previous state and adding popular profiles.
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        // Logs an error messages with context about where the error was.
        console.log("ProfileDataContext - Fetch Error:", err);
      }
    };
    // Calls handleMount function.
    handleMount();
  }, [currentUser]);

  // Provides profile data and update functions to the rest of the app.
  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={{ setProfileData, handleFollow }}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
