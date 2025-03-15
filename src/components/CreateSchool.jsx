import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
// import "../assets/style/createclass.css"; // Add your CSS file

const CreateClass = () => {
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = yup.object({
    name: yup.string().required("Class Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
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
          "https://attendipen-d65abecaffe3.herokuapp.com/classes",
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          Swal.fire({
            title: "Class created successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => navigate("/classes")); // Redirect to class list
        }
      } catch (error) {
        let errorMessage = "An error occurred. Please try again.";

        if (error.response) {
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
    <div className="form-container">
      <h2>Create a New Class</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Class Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="error">{formik.errors.name}</p>
        )}
        <button type="submit">Create Class</button>
      </form>
    </div>
  );
};

export default CreateClass;
