import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
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
      <div className="sidebar">
        <div className="side-logo">
          <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1734938938/amend_lntakp.png" alt="" />
          <h1>Attendipen</h1>
        </div>
        <div className="border"></div>
        <nav>
          <ul>
            <div className="board">
              <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1736281723/home-2_wwzqrg.png" alt="" />
              <Link to="/Dashboard" className="link" >Dashboard</Link>
            </div>
            <div className="board">
              <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1736281723/home-2_wwzqrg.png" alt="" />
              <Link to="/Teachers" className="link" >Teachers</Link>
            </div>
            <div className="board">
              <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1736281723/teacher_mmxcpi.svg" alt="" />
              <Link to="/class/:classId/students" className="link" >Students</Link>
            </div>
            <div className="board">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 8.33336H2.00004C1.36004 8.33336 0.833374 7.8067 0.833374 7.1667V4.95336C0.833374 4.50002 1.14669 4.04003 1.56669 3.87336L7.56669 1.47338C7.82002 1.37338 8.18006 1.37338 8.43339 1.47338L14.4334 3.87336C14.8534 4.04003 15.1667 4.50669 15.1667 4.95336V7.1667C15.1667 7.8067 14.64 8.33336 14 8.33336ZM8.00004 2.39338C7.97337 2.39338 7.94672 2.39335 7.93339 2.40001L1.94002 4.80004C1.90002 4.82004 1.83337 4.90669 1.83337 4.95336V7.1667C1.83337 7.26003 1.90671 7.33336 2.00004 7.33336H14C14.0934 7.33336 14.1667 7.26003 14.1667 7.1667V4.95336C14.1667 4.90669 14.1067 4.82004 14.0601 4.80004L8.06006 2.40001C8.04673 2.39335 8.02671 2.39338 8.00004 2.39338Z" fill="white" />
                <path d="M14.6667 15.6667H1.33337C1.06004 15.6667 0.833374 15.44 0.833374 15.1667V13.1667C0.833374 12.5267 1.36004 12 2.00004 12H14C14.64 12 15.1667 12.5267 15.1667 13.1667V15.1667C15.1667 15.44 14.94 15.6667 14.6667 15.6667ZM1.83337 14.6667H14.1667V13.1667C14.1667 13.0733 14.0934 13 14 13H2.00004C1.90671 13 1.83337 13.0733 1.83337 13.1667V14.6667Z" fill="white" />
                <path d="M2.66663 13C2.39329 13 2.16663 12.7733 2.16663 12.5V7.83331C2.16663 7.55998 2.39329 7.33331 2.66663 7.33331C2.93996 7.33331 3.16663 7.55998 3.16663 7.83331V12.5C3.16663 12.7733 2.93996 13 2.66663 13Z" fill="white" />
                <path d="M5.33337 13C5.06004 13 4.83337 12.7733 4.83337 12.5V7.83331C4.83337 7.55998 5.06004 7.33331 5.33337 7.33331C5.60671 7.33331 5.83337 7.55998 5.83337 7.83331V12.5C5.83337 12.7733 5.60671 13 5.33337 13Z" fill="white" />
                <path d="M8 13C7.72667 13 7.5 12.7733 7.5 12.5V7.83331C7.5 7.55998 7.72667 7.33331 8 7.33331C8.27333 7.33331 8.5 7.55998 8.5 7.83331V12.5C8.5 12.7733 8.27333 13 8 13Z" fill="white" />
                <path d="M10.6666 13C10.3933 13 10.1666 12.7733 10.1666 12.5V7.83331C10.1666 7.55998 10.3933 7.33331 10.6666 7.33331C10.94 7.33331 11.1666 7.55998 11.1666 7.83331V12.5C11.1666 12.7733 10.94 13 10.6666 13Z" fill="white" />
                <path d="M13.3334 13C13.06 13 12.8334 12.7733 12.8334 12.5V7.83331C12.8334 7.55998 13.06 7.33331 13.3334 7.33331C13.6067 7.33331 13.8334 7.55998 13.8334 7.83331V12.5C13.8334 12.7733 13.6067 13 13.3334 13Z" fill="white" />
                <path d="M15.3333 15.6667H0.666626C0.393293 15.6667 0.166626 15.44 0.166626 15.1667C0.166626 14.8934 0.393293 14.6667 0.666626 14.6667H15.3333C15.6066 14.6667 15.8333 14.8934 15.8333 15.1667C15.8333 15.44 15.6066 15.6667 15.3333 15.6667Z" fill="white" />
                <path d="M8 6.66669C7.17333 6.66669 6.5 5.99335 6.5 5.16669C6.5 4.34002 7.17333 3.66669 8 3.66669C8.82667 3.66669 9.5 4.34002 9.5 5.16669C9.5 5.99335 8.82667 6.66669 8 6.66669ZM8 4.66669C7.72667 4.66669 7.5 4.89335 7.5 5.16669C7.5 5.44002 7.72667 5.66669 8 5.66669C8.27333 5.66669 8.5 5.44002 8.5 5.16669C8.5 4.89335 8.27333 4.66669 8 4.66669Z" fill="white" />
              </svg>
              <Link to="/List" className="link" >Class List</Link>
            </div>
            <div className="board">
              <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1736281722/setting-2_nxazfr.svg
                    " alt="" />
              <Link to="/Setting" className="linka" > Attendance Setting</Link>
            </div>
            <div className="board">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M1.33337 9.05332V10.5C1.33337 13.8333 2.66671 15.1666 6.00004 15.1666H10C13.3334 15.1666 14.6667 13.8333 14.6667 10.5V6.49998C14.6667 3.16665 13.3334 1.83331 10 1.83331H6.00004C2.66671 1.83331 1.33337 3.16665 1.33337 6.49998" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6.74003 7.93335H4.97337C4.55337 7.93335 4.21338 8.27332 4.21338 8.69332V12.1066H6.74003V7.93335V7.93335Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.50673 4.89996H7.49339C7.07339 4.89996 6.7334 5.23997 6.7334 5.65997V12.1H9.26007V5.65997C9.26007 5.23997 8.92673 4.89996 8.50673 4.89996Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.0334 9.06665H9.26672V12.1H11.7934V9.82666C11.7867 9.40666 11.4467 9.06665 11.0334 9.06665Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <Link to="/CreateClass" className="link" >Create Class</Link>
            </div>
            <div className="board">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M1.33337 9.05332V10.5C1.33337 13.8333 2.66671 15.1666 6.00004 15.1666H10C13.3334 15.1666 14.6667 13.8333 14.6667 10.5V6.49998C14.6667 3.16665 13.3334 1.83331 10 1.83331H6.00004C2.66671 1.83331 1.33337 3.16665 1.33337 6.49998" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6.74003 7.93335H4.97337C4.55337 7.93335 4.21338 8.27332 4.21338 8.69332V12.1066H6.74003V7.93335V7.93335Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.50673 4.89996H7.49339C7.07339 4.89996 6.7334 5.23997 6.7334 5.65997V12.1H9.26007V5.65997C9.26007 5.23997 8.92673 4.89996 8.50673 4.89996Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.0334 9.06665H9.26672V12.1H11.7934V9.82666C11.7867 9.40666 11.4467 9.06665 11.0334 9.06665Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <Link to="/AssignStudent" className="link">Assing Teacher </Link>
            </div>
            <div className="board">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M1.33337 9.05332V10.5C1.33337 13.8333 2.66671 15.1666 6.00004 15.1666H10C13.3334 15.1666 14.6667 13.8333 14.6667 10.5V6.49998C14.6667 3.16665 13.3334 1.83331 10 1.83331H6.00004C2.66671 1.83331 1.33337 3.16665 1.33337 6.49998" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6.74003 7.93335H4.97337C4.55337 7.93335 4.21338 8.27332 4.21338 8.69332V12.1066H6.74003V7.93335V7.93335Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.50673 4.89996H7.49339C7.07339 4.89996 6.7334 5.23997 6.7334 5.65997V12.1H9.26007V5.65997C9.26007 5.23997 8.92673 4.89996 8.50673 4.89996Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.0334 9.06665H9.26672V12.1H11.7934V9.82666C11.7867 9.40666 11.4467 9.06665 11.0334 9.06665Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <Link to="/view" className="link">View Attendance</Link>
            </div>
          </ul>
        </nav>
      </div>
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
