// CourseRegistrationForm is presented to the user with their name and email as fixed values.
// All other fields are editable state variables.
// Phone numbers entered by users are checked for a leading zero, which is replaced with +44
// before submission. This is the format expected by the database.

import React, { useEffect, useState } from "react";
import axios from "axios";

import { useCurrentUser } from "../../contexts/CurrentUserContext";

import styles from "../../styles/CourseRegistrationForm.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { Redirect, useHistory, useParams } from "react-router-dom";

const CourseRegistrationForm = () => {
  const { id: courseId } = useParams();
  // Retrieved from CurrentUserContext to display name and email as fixed values.
  const currentUser = useCurrentUser();
  const [isLoading, setIsLoading] = useState(true);

  console.log("CurrentUser:", currentUser);
  // Fetches profile owner name and user email to populate fixed form fields.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const history = useHistory();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileResponse = await axiosReq.get(
          `/profiles/${currentUser?.profile_id}/`
        );
        const userResponse = await axiosReq.get("/dj-rest-auth/user/");
        console.log("Fetched profile:", profileResponse.data);
        console.log("Fetched user data:", userResponse.data);

        setName(profileResponse.data.owner);

        setEmail(userResponse.data.email);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setIsLoading(false);
      }
    };
    console.log("currentUser inside useEffect:", currentUser);
    console.log("Calling fetchProfile...");

    if (currentUser?.profile_id) {
      fetchProfile();
    } else console.log("currentUser.profile_id is not available");
  }, [currentUser]);

  // State variables.
  const [phone, setPhone] = useState("");
  const [isDriver, setIsDriver] = useState(false);
  const [dietaryRestrictions, setDietaryRestrictions] = useState(false);
  const [dietaryDetails, setDietaryDetails] = useState("");
  const [hasEmergencyContact, setHasEmergencyContact] = useState(false);
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");

  // Formating for UK-style numbers before submission by checking for a
  // leading zero and replacing it with "+44", which is the format expected
  // by the database.
  const convertPhone = (num) => {
    if (num.startsWith("0")) {
      return "+44" + num.slice(1);
    }
    return num;
  };

  const convertedPhone = convertPhone(phone);
  const convertedICE = convertPhone(emergencyContactPhone);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("course_title", courseId);
    formData.append("owner", currentUser?.profile_id);
    formData.append("email", email);
    formData.append("phone", convertedPhone);
    formData.append("is_driver", isDriver);
    formData.append("has_dietary_restrictions", dietaryRestrictions);
    formData.append("dietary_restrictions", dietaryDetails);
    formData.append("has_emergency_contact", hasEmergencyContact);
    formData.append("ice_name", emergencyContactName);
    formData.append("ice_number", convertedICE);

    axios
      .post("/course_registrations/create/", formData)
      .then((response) => {
        console.log("Form Submission Successful", response.data);
        history.push("/"); // Takes user back to home after success.
      })
      .catch((err) => {
        console.error("Form Submission Failed", err);
      });
  };

  // Using CurrentUserContext, if the user is not currently signed in, they are redirected to the sign-in page
  if (!currentUser) return <Redirect to="/signin" />;
  if (isLoading) return <p>loading... </p>;

  // Overall form structure
  return (
    <form className={styles.FormContainer} onSubmit={handleSubmit}>
      {/* Fixed values that are supplied by the CurrentUserContext */}
      <div className={styles.FormGroup}>
        <label>Name:</label>
        <p>{name || "Please sign in"}</p>
      </div>

      <div className={styles.FormGroup}>
        <label>Email:</label>
        <p>{email || "Please sign in"}</p>
      </div>

      {/* Values supplied by user */}
      <div className={styles.FormGroup}>
        {/* Phone number input */}
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          placeholder="+44 7123 456789"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Check for driver checkbox */}
      <div className={styles.FormGroup}>
        <label>
          <input
            type="checkbox" // Checkbox: Is the user a driver?
            name="isDriver"
            checked={isDriver}
            onChange={(e) => setIsDriver(e.target.checked)}
          />
          Are you a driver? (tick if yes)
        </label>
      </div>
      <hr />

      <div className={styles.FormGroup}>
        {/* Dietary restrictions, checkbox and conditionally displayed box for input of further details. */}
        <label>
          <input
            type="checkbox" // Checkbox: Does the user have any dietary restrictions?
            name="dietaryRestrictions"
            checked={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.checked)}
          />
          Do you have any dietary restrictions? (tick if yes)
        </label>
      </div>

      <div className={styles.FormGroup}>
        {dietaryRestrictions && (
          <>
            <label htmlFor="dietaryDetails">
              If "Yes", please provide more information:
            </label>
            <input
              id="dietaryDetails"
              name="dietaryDetails"
              type="text"
              value={dietaryDetails}
              placeholder="e.g. vegetarian, gluten-free, etc."
              onChange={(e) => setDietaryDetails(e.target.value)}
            />
          </>
        )}
      </div>
      <hr />

      <div className={styles.FormGroup}>
        {/* Emergency contact checkbox and conditionally displayed inputs for contact name and contact number */}
        <label>
          <input
            type="checkbox" // Checkbox: Does the user have ICE (In Case of Emergency) contact?
            name="hasEmergencyContact"
            checked={hasEmergencyContact}
            onChange={(e) => setHasEmergencyContact(e.target.checked)}
          />
          Do you have someone who can be contacted <strong>I</strong>n{" "}
          <strong>C</strong>ase of <strong>E</strong>mergency (tick if yes)
        </label>
      </div>

      <div className={styles.FormGroup}>
        {hasEmergencyContact && ( // Conditional display of box for ICE details.
          <>
            <label htmlFor="emergencyContactName">
              Emergency contact name:
            </label>

            <input
              id="emergencyContactName"
              name="emergencyContactName"
              type="text"
              value={emergencyContactName}
              placeholder="Jane Doe"
              onChange={(e) => setEmergencyContactName(e.target.value)}
            />
            <label htmlFor="emergencyContactPhone">
              Emergency contact number:
            </label>
            <input
              id="emergencyContactPhone"
              name="emergencyContactPhone"
              type="tel"
              value={emergencyContactPhone}
              placeholder="07123 456789"
              onChange={(e) => setEmergencyContactPhone(e.target.value)}
            />
          </>
        )}
      </div>
      <div className={styles.FormGroup}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default CourseRegistrationForm;
