import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
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

  useEffect(() => {
    const handleMount = async () => {
      try {
        // Fetches the profiles data ordered by the followers_count.
        const { data } = await axiosReq.get(
          "/profiles/?ordering=followers_count"
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

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={setProfileData}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
