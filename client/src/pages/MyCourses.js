import React, { useEffect, useState } from "react";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API = "https://online-course-platform-project-backend.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    fetch(`${API}/api/courses/my-courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to load courses");
        }
        return res.json();
      })
      .then((data) => {
        setCourses(data.courses || []);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading your courses…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>My Courses</h2>

      {courses.length === 0 ? (
        <p>No courses created yet.</p>
      ) : (
        <ul>
          {courses.map((c) => (
            <li key={c._id}>
              <strong>{c.title}</strong> – {c.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyCourses;



