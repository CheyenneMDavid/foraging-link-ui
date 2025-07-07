// Page to display the full details of a single course

import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import styles from "../../styles/CoursePage.module.css";

function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState({ results: [] });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axiosReq.get(`/courses/${id}/`);
        setCourse(data);
      } catch (err) {
        console.log("Error fetching course:", err);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) return null;
  return (
    <Container className={styles.Main}>
      <h2 className={styles.CourseTitle}>{course.title}</h2>
      <p className={styles.CourseInfo}>
        <strong>Date:</strong> {new Date(course.date).toLocaleDateString()}
      </p>
      <p className={styles.CourseInfo}>
        <strong>Season:</strong> {course.season}
      </p>
      <p className={styles.CourseInfo}>
        <strong>Location:</strong> {course.location}
      </p>
      <p className={styles.CourseInfo}>
        <strong>Description:</strong> {course.description}
      </p>
      <p className={styles.CourseInfo}>
        <strong>Spaces Available:</strong> {course.available_spaces}
      </p>
      <Button variant="outline-success">Book Now</Button>{" "}
    </Container>
  );
}

export default CoursePage;
