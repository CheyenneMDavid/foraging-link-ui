// Displays the details of a specific course.
// Includes a "Book Now" button that routes to the registration form
// with the course id passed dynamically in the URL.

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import { axiosReq } from "../../api/axiosDefaults";

import styles from "../../styles/CoursePage.module.css";

function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axiosReq.get(`/courses/${id}/`);
        setCourse(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) return null;
  return (
    <Container className={styles.courseContainer}>
      <Row>
        <Col xs={12} md={10} lg={8}>
          <h2 className={`${styles.courseTitle} text-center`}>
            {course.title}
          </h2>

          <p className={styles.courseInfo}>
            <strong>Date:</strong> {new Date(course.date).toLocaleDateString()}
          </p>
          <p className={styles.courseInfo}>
            <strong>Season:</strong> {course.season}
          </p>
          <p className={styles.courseInfo}>
            <strong>Location:</strong> {course.location}
          </p>
          <p className={styles.courseInfo}>
            <strong>Description:</strong> {course.description}
          </p>
          <p className={styles.courseInfo}>
            <strong>Spaces Available:</strong> {course.available_spaces}
          </p>
          {/* Button linked to Registration form with course's id passed dynamically into the route. */}
          <Link to={`/register/${id}`}>
            <Button
              className={`${styles.bookButton} ${styles[course.season]}`}
              variant="outline-success"
            >
              Book Now
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default CoursePage;
