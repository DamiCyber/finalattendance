import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const SchoolListClass = () => {
  const BASE_URL = "https://attendipen-d65abecaffe3.herokuapp.com/classes";
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchClasses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No authentication token found. Redirecting to login.");
        navigate("/login"); // Redirect to login if no token is found
        return;
      }

      try {
        const response = await axios.get(BASE_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setClasses(response.data); // Assuming response.data is an array
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchClasses();
  }, [navigate]); // Added navigate to dependency array to avoid stale closures

  return (
    <div>
      <h2>Class List</h2>
      {classes.length === 0 ? (
        <p>No classes available.</p>
      ) : (
        <ul>
          {classes.map((cls, index) => (
            <li key={index}>
              <strong>Class: </strong>{cls.name || "N/A"} <br />
              <Link to={`/class/${cls.id}/students`}>View Students</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SchoolListClass;
