// Page to display the full list of all upcoming courses

import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

const CoursesListPage = () => {
  // State to store the list of all courses
  const [courses, setCourses] = useState([]);

  // Fetch the full list of upcoming courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Sends a GET request to the full-list endpoint.
        const { data } = await axiosReq.get("/courses/full-list/");

        // Store the returned course data.
        setCourses(data.results);
      } catch (err) {
        console.log("Error fetching all courses:", err);
      }
    };

    fetchCourses();
  }, []);

  // Renders the list of courses.
  return (
    <div>
      <h2>All Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {/* Course title */}
            <h4>{course.title}</h4>

            {/* Course date formatted to local style, dependant on coutry of user */}
            <p>{new Date(course.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesListPage;
