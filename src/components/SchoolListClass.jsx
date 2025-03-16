import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SchoolListClass = () => {
  const BASE_URL = "https://attendipen-d65abecaffe3.herokuapp.com/classes";
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found. Redirecting to login.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteClass = async (classId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.delete(`${BASE_URL}/${classId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(classes.filter(cls => cls.id !== classId)); // Remove deleted class from UI
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  return (
    <div>
      <h2>Class List</h2>
      {classes.length === 0 ? (
        <p>No classes available.</p>
      ) : (
        <ul>
          {classes.map((cls) => (
            <li key={cls.id}>
              <strong>Class: </strong>{cls.name || "N/A"} <br />
              <Link to={`/class/${cls.id}/students`}>View Students</Link>
              <button onClick={() => deleteClass(cls.id)} style={{ marginLeft: "10px", color: "red" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SchoolListClass;
