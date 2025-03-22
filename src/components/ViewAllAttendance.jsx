import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ViewAllAttendance = () => {
  const { schoolId } = useParams();
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!schoolId) {
        Swal.fire("Error", "School ID is missing.", "error");
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        Swal.fire("Authentication Error", "Please log in to continue.", "error");
        return;
      }

      try {
        console.log("Fetching attendance for schoolId:", schoolId);

        const response = await axios.get(
          `https://attendipen-d65abecaffe3.herokuapp.com/attendance/view/${schoolId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.attendance) {
          setAttendanceData(response.data.attendance);
        } else {
          setAttendanceData([]);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
        Swal.fire(
          "Error",
          error.response?.data?.message || "Failed to fetch attendance.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [schoolId]);

  if (loading) return <p>Loading attendance data...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Teacher Attendance Records</h2>

      {attendanceData.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Teacher Name</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record, index) => (
              <tr key={index} className="border">
                <td className="border px-4 py-2">{record.teacher_name}</td>
                <td className="border px-4 py-2">{record.date}</td>
                <td className="border px-4 py-2">{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAllAttendance;
