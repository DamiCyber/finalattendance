import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ Import SweetAlert
import "../assets/style/register.css";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    _type: "school", // Changed from userType to _type
  });

  const [message, setMessage] = useState("");

  // ✅ Added missing handleChange function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setIsLoading(true); // Set loading before making the request

    const payload = {
      _type: formData._type,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        "https://attendipen-d65abecaffe3.herokuapp.com/auth/register",
        payload
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Registration Successful",
          icon: "success",
          confirmButtonText: "Thank You",
        });

        setMessage("Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      Swal.fire({
        title: "Registration Failed, try again!",
        text: error.response?.data?.message || "An error occurred.",
        icon: "error",
        confirmButtonText: "OK",
      });

      setMessage(error.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setIsLoading(false); // Reset loading state after request completes
    }
  };

  return (
    <div className="whole-cont">
      <form className="form" onSubmit={handleSubmit}>
        <div className="first-cont">
          <div className="first-text">
            <h2>Register</h2>
            <p>
              Welcome to Attendipen! Please fill in the required information to
              create your account.
            </p>
          </div>

          {/* User Type Selection */}
          <div className="register-second">
            <label>User Type</label>
            <select name="_type" value={formData._type} onChange={handleChange} className="select">
              <option value="school">School</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
            </select >
          </div>

          {/* Name Fields */}
          <div className="register-flex">
            <div className="register-first">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-first leftu">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="register-second">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email ID"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Fields */}
          <div className="password-flex">
            <div className="password-first">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="password-first leftu">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Display error/success message */}
          <p className="message"> {message && <p className="message " >{message}</p>}</p>

          <div className="button-Reg">
            <button className="Reg-btn" type="submit" disabled={isLoading}>
              {isLoading ? "REGISTERING..." : "REGISTER"}
            </button>
          </div>

          {/* Google Auth (Placeholder, actual functionality needs OAuth) */}
          <div className="option">
            <h1>or</h1>
          </div>
          <div className="google">
            <img
              src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1735513636/google_do1gt6.svg"
              alt="Google Logo"
            />
            <button className="google-btn">Continue with Google</button>
          </div>

          {/* Redirect to Login */}
          <div className="Reg-account">
            <p>Already have an account? </p>
            <Link to="/login" className="inka">
              Login here
            </Link>
          </div>
        </div>
      </form>
      <div className="second-cont"></div>
    </div>
  );
};

export default Register;
