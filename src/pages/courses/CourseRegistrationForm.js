// This form collects and submits user details to register for a course.

import React, { useState } from "react";

const CourseRegistrationForm = ({ courseId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <form>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        name="name"
        type="text"
        value={name}
        placeholder="Joe Blogs"
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        placeholder="user@example.com"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="phone">Phone:</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        value={phone}
        placeholder="+44 7123 456789"
        onChange={(e) => setPhone(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default CourseRegistrationForm;
