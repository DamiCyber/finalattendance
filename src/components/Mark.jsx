import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../assets/style/addteacher.css";

const Mark = () => {
  const navigate = useNavigate();
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczODMxODcyNiwianRpIjoiM2ExNzRkY2MtNzIxYi00Y2VmLWI2NGQtN2NhZjhiMGM5NGZjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IntcImlkXCI6IDEsIFwidHlwZVwiOiBcInRlYWNoZXJcIn0iLCJuYmYiOjE3MzgzMTg3MjYsImNzcmYiOiJiZDllM2Y5Zi1jZDFkLTRkMmQtOGQyZS0zNGEzMjQwOWQzYTAiLCJleHAiOjE3Njk4NTQ3MjZ9.s2ux6dc15N61C9JCOD4YqlKJgSl0vdOFl95q74LmT_Q";

  if (!token) {
    Swal.fire({
      title: "Unauthorized",
      text: "Please log in again.",
      icon: "warning",
      confirmButtonText: "OK",
    });
    navigate("/login");
    return null; 
  }

  const validationSchema = yup.object({
    class_id: yup
      .number()
      .typeError("Class ID must be a number")
      .required("Class ID is required"),
    student_id: yup
      .number()
      .typeError("Student ID must be a number")
      .required("Student ID is required"),
    status: yup
      .string()
      .required("Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      "class_id": 1,
      "student_id": 1,
      "status": "present",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://attendipen-d65abecaffe3.herokuapp.com/attendance/mark",
          {
            class_id: parseInt(values.class_id), 
            student_id: parseInt(values.student_id),
            status: values.status,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczODMxODcyNiwianRpIjoiM2ExNzRkY2MtNzIxYi00Y2VmLWI2NGQtN2NhZjhiMGM5NGZjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IntcImlkXCI6IDEsIFwidHlwZVwiOiBcInRlYWNoZXJcIn0iLCJuYmYiOjE3MzgzMTg3MjYsImNzcmYiOiJiZDllM2Y5Zi1jZDFkLTRkMmQtOGQyZS0zNGEzMjQwOWQzYTAiLCJleHAiOjE3Njk4NTQ3MjZ9.s2ux6dc15N61C9JCOD4YqlKJgSl0vdOFl95q74LmT_Q`,
            },
          }
        );

        if (response.status === 200) {
          Swal.fire({
            title: "Attendance marked successfully",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => navigate("/View"));
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "An error occurred",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });

  return (
    <div className="dashboard">
      <div className="sidebar2">
        <div className="content">
          <form onSubmit={formik.handleSubmit}>
            <input
              type="number"
              name="class_id"
              placeholder="Class ID"
              value={formik.values.class_id}
              onChange={(e) => formik.setFieldValue("class_id", e.target.value ? parseInt(e.target.value) : "")}
            />
            {formik.errors.class_id && <p className="error">{formik.errors.class_id}</p>}

            <input
              type="number"
              name="student_id"
              placeholder="Student ID"
              value={formik.values.student_id}
              onChange={(e) => formik.setFieldValue("student_id", e.target.value ? parseInt(e.target.value) : "")}
            />
            {formik.errors.student_id && <p className="error">{formik.errors.student_id}</p>}

            <input
              type="text"
              name="status"
              placeholder="Status (e.g., Present, Absent)"
              value={formik.values.status}
              onChange={formik.handleChange}
            />
            {formik.errors.status && <p className="error">{formik.errors.status}</p>}

            <button type="submit">Mark Attendance</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Mark;
