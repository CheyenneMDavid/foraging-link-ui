// This form collects and submits user details to register for a course.

import React, { useState } from "react";

const CourseRegistrationForm = ({ courseId }) => {
  // State variables.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isDriver, setIsDriver] = useState(false);
  const [dietaryRestrictions, setDietaryRestrictions] = useState(false);
  const [dietaryDetails, setDietaryDetails] = useState("");
  const [hasEmergencyContact, setHasEmergencyContact] = useState(false);
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");

  // Overall form structure
  return (
    <form>
      {/* Name input */}
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        name="name"
        type="text"
        value={name}
        placeholder="Joe Blogs"
        onChange={(e) => setName(e.target.value)}
      />
      {/* Email input */}
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        placeholder="user@example.com"
        onChange={(e) => setEmail(e.target.value)}
      />
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
      {/* Check for driver checkbox */}
      <label>
        <input
          type="checkbox" // Checkbox: Is the user a driver?
          name="isDriver"
          checked={isDriver}
          onChange={(e) => setIsDriver(e.target.checked)}
        />
        Are you a driver? (tick if yes)
      </label>
      <hr />
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
      <hr />
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
      {hasEmergencyContact && ( // Conditional display of box for ICE details.
        <>
          <label htmlFor="emergencyContactName">Emergency contact name:</label>

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
      <button type="submit">Submit</button>
    </form>
  );
};

export default CourseRegistrationForm;
