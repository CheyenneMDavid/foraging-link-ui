// The purpose of Course.js is to render the full course details.
// It is used in CoursePage.js and CoursesListPage.js.
// Description is shown in full, is truncated or discluded depending on context.

import React from "react";

function Course({ course }) {
  const {
    id,
    season,
    title,
    date,
    description,
    location,
    max_capacity,
    available_spaces,
  } = course;

  return (
    <div>
      <h4>{title}</h4>
      <p>Date: {new Date(date).toLocaleDateString()}</p>
      <p>Season: {season}</p>
      <p>Location: {location}</p>
      <p>Description: {description}</p>
      <p>Spaces Available: {available_spaces}</p>
    </div>
  );
}
export default Course;
