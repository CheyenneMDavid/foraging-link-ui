// Page to display the full list of all upcoming courses

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/CourseListPage.module.css";

import Course from "./Course";

const CoursesListPage = () => {
  // State to store the list of all courses
  const [courses, setCourses] = useState([]);

  // Fetch the full list of upcoming courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Sends a GET request to the full-list endpoint.
        const { data } = await axiosReq.get("/courses/full-list");

        // Store the returned course data.
        setCourses(data.results);
      } catch (err) {
        console.log("Error fetching all courses:", err);
      }
    };

    fetchCourses();
  }, []);

  // Renders a list of courses
  return (
    <div className={styles.CoursesListContainer}>
      <h2>All Courses</h2>
      <ul>
        {courses.map((course) => {
          const truncatedDescription = course.description // Checks if the description exists
            ? course.description.split(" ").slice(0, 20).join(" ") + "..."
            : "";

          return (
            <li key={course.id} className={styles.IndividualCourse}>
              <Link to={`/courses/${course.id}`}>
                <Course
                  {...course}
                  description={truncatedDescription} // override only this field when in list page.
                  setCourses={setCourses}
                  isListPage={true}
                />
              </Link>
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CoursesListPage;
