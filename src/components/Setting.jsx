import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../assets/style/addteacher.css";

const Setting = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    start_time: yup.string().required("Start time is required"),
    end_time: yup.string().required("End time is required"),
  });

  const formik = useFormik({
    initialValues: {
      start_time: "",
      end_time: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          "https://attendipen-d65abecaffe3.herokuapp.com/settings/attendance_time",
          values,
          {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          Swal.fire({
            title: "Attendance settings updated successfully",
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
              type="text"
              name="start_time"
              placeholder="Start Time (HH:MM)"
              value={formik.values.start_time}
              onChange={formik.handleChange}
            />
            {formik.errors.start_time && <p className="error">{formik.errors.start_time}</p>}

            <input
              type="text"
              name="end_time"
              placeholder="End Time (HH:MM)"
              value={formik.values.end_time}
              onChange={formik.handleChange}
            />
            {formik.errors.end_time && <p className="error">{formik.errors.end_time}</p>}

            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
