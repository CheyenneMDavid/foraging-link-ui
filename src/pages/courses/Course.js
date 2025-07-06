// Course.js displays course data using props.

import React from "react";
import { Card } from "react-bootstrap";

function Course(props) {
  const { season, title, date, description, location, available_spaces } =
    props;

  return (
    <Card.Body>
      <h4>{title}</h4>
      <p>Date: {new Date(date).toLocaleDateString()}</p>
      <p>Season: {season}</p>
      <p>Location: {location}</p>
      <p>Description: {description}</p>
      <p>Spaces Available: {available_spaces}</p>
    </Card.Body>
  );
}
export default Course;
