// This file provides the user's authentication status (`isLoggedIn`) throughout the app
// using the AuthContext. Components can access the status to determine if the user is logged in.
// Much of this functionality has been adapted from CurrentUserContext.js
// in the Moments walkthrough project by CodeInstitute.

import React, { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";

// Creates the AuthContext, which stores the user's authentication status
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide the user's authentication state
export function AuthProvider({ children }) {
  const currentUser = useCurrentUser(); // Gets the current user from the CurrentUserContext
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if the user is logged in.

  useEffect(() => {
    // Logs the currentUser value for the purpose of debugging.
    console.log("AuthProvider - currentUser:", currentUser);
    // Sets isLoggedIn based on the currentUser exists
    setIsLoggedIn(!!currentUser);
    // Runs whenever the currentUser changes.
  }, [currentUser]);

  // Logs the login in status for the purpose of debugging.
  console.log("AuthProvider - isLoggedIn:", isLoggedIn);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
  };

  // Provides the AuthContext value to any components that are wrapped in it.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook allowing components to access the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
