import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ProfileDataProvider } from "./contexts/ProfileDataContext";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* Provides the current user's state and functionality throughout the app */}
      <CurrentUserProvider>
        {/* Provides authentication-related state and logic, 
            such as managing tokens or login status throughout the app */}
        <AuthProvider>
          {/* Provides profile data, including popular profiles and related updates throughout the app */}
          <ProfileDataProvider>
            <App />
          </ProfileDataProvider>
        </AuthProvider>
      </CurrentUserProvider>
    </Router>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
