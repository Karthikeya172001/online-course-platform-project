import React, { useEffect, useState } from "react";

function MyCourses() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(
      "https://online-course-platform-project-backend.onrender.com/api/courses/mine",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((r) => r.json())
      .then((d) => setList(Array.isArray(d) ? d : []));
  }, []);

  return (
    <div>
      <h2>My Courses</h2>

      {list.length === 0 ? "No courses yet" : (
        <ul>
          {list.map((c) => (
            <li key={c._id}>{c.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyCourses;
