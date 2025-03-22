import React, { useState } from "react";
import "../assets/style/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const validationSchema = yup.object({
    username: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required")
      .trim()
      .max(40, "Email must not exceed 40 characters")
      .min(3, "Email must be at least 3 characters"),
    password: yup
      .string()
      .matches(/^[a-zA-Z0-9]+$/, "Password must contain only letters and numbers")
      .required("Password is required")
      .trim()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password cannot exceed 20 characters"),
    userType: yup
      .string()
      .required("Please select a user type")
      .oneOf(["school", "teacher", "parent"], "Invalid user type"),
  });

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
        userType: "school", // default value
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        if (!values.username.trim() || !values.password.trim()) {
          setErrorMessage("Please fill in all fields");
          return;
        }

        setIsLoading(true);
        setErrorMessage("");

        try {
          const response = await axios.post(
            "https://attendipen-d65abecaffe3.herokuapp.com/auth/login",
            {
              email: values.username.trim(),
              password: values.password.trim(),
              _type: values.userType, // Send userType to backend
            },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );

          if (response.data && response.data.access_token) {
            localStorage.setItem("token", response.data.access_token);
            if (response.data.user) {
              localStorage.setItem("user", JSON.stringify(response.data.user));
            }

            Swal.fire({
              title: "Welcome to Attendipen",
              icon: "success",
              confirmButtonText: "Thank You",
            });

            // Redirect based on user type
            switch (values.userType) {
              case "school":
                navigate("/Dashboard");
                break;
              case "teacher":
                navigate("/TeacherDashboard");
                break;
              case "parent":
                navigate("/Parent");
                break;
              default:
                setErrorMessage("Invalid user role. Please try again.");
            }
          }
        } catch (error) {
          console.error("Login error:", error);
          if (error.response) {
            switch (error.response.status) {
              case 401:
                setErrorMessage("Invalid email or password. Please try again.");
                break;
              case 422:
                setErrorMessage(
                  error.response.data.message ||
                  "Invalid input. Please check your credentials."
                );
                break;
              case 429:
                setErrorMessage("Too many login attempts. Please try again later.");
                break;
              default:
                setErrorMessage("Login failed. Please try again.");
            }
          } else {
            setErrorMessage("Cannot connect to server. Please check your internet connection.");
          }
        } finally {
          setIsLoading(false);
        }
      },
    });

  return (
    <div>
      <div className="whole-con">
        <form onSubmit={handleSubmit}>
          <div className="first-con">
            <div className="text">
              <h2>Login</h2>
              <h4>Welcome Back</h4>
              <p>Please enter your Attendance credentials.</p>
            </div>
            <div className="login">
              <div className="drop">
                <label htmlFor="userType">User Type</label>
                <div style={{ color: "red" }} className="err">
                  {touched.userType && errors.userType}
                </div>
                <select
                  name="userType"
                  id="userType"
                  value={values.userType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="dropdown"
                >
                  <option value="school">School</option>
                  <option value="teacher">Teacher</option>
                  <option value="parent">Parent</option>
                </select>
              </div>

              <label htmlFor="username">Email ID</label>
              <div style={{ color: "red" }} className="err">
                {touched.username && errors.username}
              </div>
              <input
                type="email"
                placeholder="Enter Email ID"
                onChange={handleChange}
                onBlur={handleBlur}
                name="username"
                value={values.username}
                id="username"
              />

              <label htmlFor="password">Password</label>
              <div style={{ color: "red" }} className="err">
                {touched.password && errors.password}
              </div>
              <input
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                value={values.password}
                id="password"
                placeholder="Password"
              />
            </div>

            {errorMessage && (
              <div style={{ color: "red" }} className="error-message">
                {errorMessage}
              </div>
            )}

            <div className="remember">
              <input type="checkbox" className="box" />
              <label htmlFor="remember" className="label">
                Remember me
              </label>
            </div>

            <div className="forgot-password">
              <Link to="#" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            <div className="button-container">
              <button type="submit" className="login-btn" disabled={isLoading}>
                {isLoading ? "LOGGING IN..." : "LOGIN"}
              </button>
            </div>

            <div className="account">
              <p>Don't have an account?</p>
              <Link to="/Register" className="ink">
                Register here
              </Link>
            </div>
          </div>
        </form>

        <div className="second-con">
          <div className="text2">
            <p>
              "Attendance is the first step to <br /> success, be present to win."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
