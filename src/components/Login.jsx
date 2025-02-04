import React, { useState } from "react";
import "../assets/style/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  const validationSchema = yup.object({
    username: yup
      .string()
      .email("Invalid email")
      .required("Required")
      .max(40)
      .min(3),
    password: yup
      .string()
      .matches(
        /^[a-zA-Z0-9]{8}$/,
        "Password must be 8 characters with letters and numbers"
      )
      .required("Required")
      .max(8)
      .min(8),
  });

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Submitting:", values);
      axios
        .post("https://attendipen-d65abecaffe3.herokuapp.com/auth/login", {
          email: values.username,
          password: values.password,
          _type: "school",
        })
        .then((response) => {
          console.log("Response:", response);
          if (response.status === 200) {
            const token = response.data.access_token;
            localStorage.setItem("token", token);
            navigate("/Dashboard");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          if (error.response && error.response.status === 401) {
            setErrorMessage("Unauthorized: Invalid email or password.");
          } else {
            setErrorMessage("Something went wrong. Please try again later.");
          }
        });
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
              <label htmlFor="username">Email ID</label>
              <div className="err">{errors.username}</div>
              <input
                type="email"
                placeholder="Enter Email ID"
                onChange={handleChange}
                name="username"
                value={values.username}
                id="username"
              />
              <label htmlFor="password">Password</label>
              <div className="err">{errors.password}</div>
              <input
                type="password"
                onChange={handleChange}
                name="password"
                value={values.password}
                id="password"
                placeholder="Password"
              />
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
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
              <button type="submit" className="login-btn">
                LOGIN
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
              "Attendance is the first step to <br /> success, be present to
              win."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
