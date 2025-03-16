import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewAttendance = () => {
  const BASE_URL = "https://attendipen-d65abecaffe3.herokuapp.com/settings/attendance_time";
  const [attendanceSettings, setAttendanceSettings] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendanceSettings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No authentication token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(BASE_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setAttendanceSettings(response.data); // Expecting an object, not an array
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchAttendanceSettings();
  }, [navigate]);

  return (
    <div>
      <h2>Attendance Time Settings</h2>
      {attendanceSettings ? (
        <ul>
          <li>
            <strong>Start Time: </strong> {attendanceSettings.start_time || "N/A"}
          </li>
          <li>
            <strong>End Time: </strong> {attendanceSettings.end_time || "N/A"}
          </li>
        </ul>
      ) : (
        <p>Loading attendance settings...</p>
      )}
    </div>
  );
};

export default ViewAttendance;
