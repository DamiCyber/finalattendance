import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import "../assets/style/addstudent.css";

const SchoolAssign = () => {
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = yup.object({
    class_id: yup
      .number()
      .typeError("Class ID must be a number")
      .required("Class ID is required"),
    student_id: yup
      .number()
      .typeError("Student ID must be a number")
      .required("Student ID is required"),
  });

  const formik = useFormik({
    initialValues: {
      student_id: 0, // Set to number instead of empty string
      class_id: 0, // Set to number instead of empty string
    },
    validationSchema,
    onSubmit: async (values) => {
      const token = localStorage.getItem("token");

      if (!token) {
        Swal.fire({
          title: "Authentication Error",
          text: "Please log in to continue.",
          icon: "error",
          confirmButtonText: "OK",
        });
        navigate("/login");
        return;
      }
                       
      try {
        const response = await axios.post( 
          "https://attendipen-d65abecaffe3.herokuapp.com/classes/assign_student",
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        Swal.fire({
          title: "Student assigned successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/Dashboard");
        });
      } catch (error) {
        let errorMessage = "An error occurred. Please try again.";

        if (error.response) {
          console.error("API Error:", error.response.data); // Debugging
          errorMessage = error.response.data?.message || errorMessage;

          if (error.response.status === 401) {
            errorMessage = "Your session has expired. Please log in again.";
            localStorage.removeItem("token");
            navigate("/login");
          }
        }

        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="side-logo">
          <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1734938938/amend_lntakp.png" alt="Attendipen Logo" />
          <h1>Attendipen</h1>
        </div>
        <div className="border"></div>
        <nav>
          <ul>
            <div className="board">
              <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1736281723/home-2_wwzqrg.png" alt="Dashboard Icon" />
              <Link to="/Dashboard" className="link">Dashboard</Link>
            </div>
            <div className="board">
              <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1736281723/teacher_mmxcpi.svg" alt="Students Icon" />
              <Link to="/class/1/students" className="link">Students</Link>
            </div>
            <div className="board">
              <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1736281722/setting-2_nxazfr.svg" alt="Settings Icon" />
              <Link to="/Setting" className="link">Attendance Setting</Link>
            </div>
            <div className="board">
              <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1736281723/home-2_wwzqrg.png" alt="Assign Teachers Icon" />
              <Link to="/AssignTeachers" className="link">Assign Teacher</Link>
            </div>
          </ul>
        </nav>
      </div>
      <div className="content">
        <h2>Assign Student to Class</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="student_id">Student ID:</label>
          <input
            type="number"
            id="student_id"
            name="student_id"
            value={formik.values.student_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.student_id && formik.errors.student_id && (
            <div className="error">{formik.errors.student_id}</div>
          )}

          <label htmlFor="class_id">Class ID:</label>
          <input
            type="number"
            id="class_id"
            name="class_id"
            value={formik.values.class_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.class_id && formik.errors.class_id && (
            <div className="error">{formik.errors.class_id}</div>
          )}

          <button type="submit">Assign Student</button>
        </form>
      </div>
    </div>
  );
};

export default SchoolAssign;
