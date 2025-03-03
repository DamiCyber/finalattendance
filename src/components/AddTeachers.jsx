import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddTeachers = () => {
  const navigate = useNavigate();
  
  // Retrieve school token from localStorage
  const schoolToken = localStorage.getItem("school_token");

  const validationSchema = yup.object({
    fullName: yup.string().required("Full Name is required").max(55).min(3),
    email: yup.string().email("Invalid email format").required("Email is required").max(28).min(8),
    designation: yup.string().required("Designation is required").max(55).min(3),
    gender: yup.string().required("Gender is required"),
    phoneNumber: yup.string().matches(/^\d{10}$/, "Enter a valid 10-digit phone number").required("Phone Number is required"),
    classes: yup.string().required("Classes are required"),
    password: yup
      .string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must be at least 8 characters and contain letters and numbers")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      designation: "",
      gender: "",
      phoneNumber: "",
      classes: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://attendipen-d65abecaffe3.herokuapp.com/classes/assign_teacher",
          {
            email: values.email.trim(),
            password: values.password.trim(),
            fullName: values.fullName,
            designation: values.designation,
            gender: values.gender,
            phoneNumber: values.phoneNumber,
            classes: values.classes,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${schoolToken}`, // Included school token in header
            },
          }
        );

        if (response.data && response.data.access_token) {
          localStorage.setItem("school_token", response.data.access_token);

          Swal.fire({
            title: "Teacher successfully added",
            icon: "success",
            confirmButtonText: "Thank You",
          });

          navigate("/Teachers");
        }
      } catch (error) {
        console.error("Error adding teacher:", error);
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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className='err'>{formik.touched.fullName && formik.errors.fullName}</div>
        <input type="text" name="fullName" placeholder="Full Name" value={formik.values.fullName} onChange={formik.handleChange} onBlur={formik.handleBlur} />

        <div className='err'>{formik.touched.email && formik.errors.email}</div>
        <input type="email" name="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />

        <div className='err'>{formik.touched.designation && formik.errors.designation}</div>
        <input type="text" name="designation" placeholder="Designation" value={formik.values.designation} onChange={formik.handleChange} onBlur={formik.handleBlur} />

        <div className='err'>{formik.touched.classes && formik.errors.classes}</div>
        <input type="text" name="classes" placeholder="Classes" value={formik.values.classes} onChange={formik.handleChange} onBlur={formik.handleBlur} />

        <div className='err'>{formik.touched.gender && formik.errors.gender}</div>
        <select name="gender" value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur}>
          <option value="" label="Select Gender" />
          <option value="Male" label="Male" />
          <option value="Female" label="Female" />
          <option value="Other" label="Other" />
        </select>

        <div className='err'>{formik.touched.password && formik.errors.password}</div>
        <input type="password" name="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />

        <div className='err'>{formik.touched.phoneNumber && formik.errors.phoneNumber}</div>
        <input type="text" name="phoneNumber" placeholder="Phone Number" value={formik.values.phoneNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTeachers;
