import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import appStyles from "../../App.module.css";
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
    </Container>
  );
}

export default CoursePage;
