// Displays the 3 most immediate upcoming courses in the sidebar.

import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import "../../App.module.css";

import styles from "../../styles/UpcomingCourses.module.css";

function UpcomingCourses() {
  // State to store the list of upcoming courses.
  const [courses, setCourses] = useState([]);

  // Fetches the upcoming courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Send GET request to the API endpoint for upcoming courses
        const { data } = await axiosReq.get("/courses/");

        setCourses(data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  // Displays a list of upcoming courses. The entire block is clickable and takes user to the detail page for the course.
  return (
    <div>
      <h3>Upcoming Courses</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`}>
              <h4 className={styles.courseTitle}>{course.title}</h4>
              <p>{new Date(course.date).toLocaleDateString()}</p>
              <p>
                <strong>Location:</strong> {course.location}
              </p>
              <p>
                <strong>Available Spaces:</strong> {course.available_spaces}
              </p>
            </Link>
            <hr className={styles.customHr} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingCourses;
