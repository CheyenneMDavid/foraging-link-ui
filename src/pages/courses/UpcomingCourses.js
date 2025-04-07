// Component to display the 3 most immediate upcoming courses, used in the sidebar
import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

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
        console.log("Fetched data:", data);
        setCourses(data.results);
      } catch (err) {
        console.log("Error fetching upcoming courses:", err);
      }
    };

    fetchCourses();
  }, []);

  // Renders the three up comming courses in component which is call into the sidebar
  return (
    <div>
      <h3>Upcoming Courses</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h5 className={styles.CourseTitle}>{course.title}</h5>

            {/* Formats the course date into a more readable format */}
            <p>{new Date(course.date).toLocaleDateString()}</p>

            {/* Fetches and displays number of available spaces from the back end. */}
            <p>{course.available_spaces} spaces left</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingCourses;
