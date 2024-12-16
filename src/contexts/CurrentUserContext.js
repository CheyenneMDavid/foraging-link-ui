import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../api/axiosDefaults";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => {
  const currentUser = useContext(CurrentUserContext); // Gets the current user
  console.log("useCurrentUser - currentUser:", currentUser); // Log the current user
  return currentUser; // Returns the current user
};

export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const handleMount = async () => {
    try {
      // Fetches the current user's data and logs the response for debugging.
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      console.log("handleMount - /dj-rest-auth/user/ response:", data);
      setCurrentUser(data);
    } catch (err) {
      // Logs a custom error message with more context for debugging.
      console.log("handleMount error fetching the current user:", err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (err) {
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              history.push("/signin");
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          console.log("Attempting token refresh due to 401 error...");
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
            console.log("Token refreshed successfully.");
          } catch (err) {
            console.log("Token refresh failed:", err);
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}
