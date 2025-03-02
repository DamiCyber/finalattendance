import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../assets/style/addteacher.css";

const AddTeachers = () => {
  // State to manage form inputs
  const [values, setValues] = useState({
    email: "",
    designation: "",
    fullName: "",
    classes: "",
    gender: "",
    password: "",
    phoneNumber: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://attendipen-d65abecaffe3.herokuapp.com/classes/assign_teacher",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="side-logo">
          <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1734938938/amend_lntakp.png" alt="Logo" />
          <h1>Attendipen</h1>
        </div>
        <div className="border"></div>
        <nav>
          <ul>
            <div className="board">
              <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1736281723/home-2_wwzqrg.png" alt="Home" />
              <Link to="/Dashboard" className="link">Dashboard</Link>
            </div>
            <div className="board">
              <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1736281723/home-2_wwzqrg.png" alt="Teachers" />
              <Link to="/Teachers" className="link">Teachers</Link>
            </div>
            <div className="board">
              <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1736281723/teacher_mmxcpi.svg" alt="Students" />
              <Link to="/Student" className="link">Students</Link>
            </div>
          </ul>
        </nav>
      </div>
      <div className="content">
        <h2>Add Teachers</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name" value={values.fullName} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
          <input type="text" name="designation" placeholder="Designation" value={values.designation} onChange={handleChange} />
          <input type="text" name="classes" placeholder="Classes" value={values.classes} onChange={handleChange} />
          <input type="text" name="gender" placeholder="Gender" value={values.gender} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} />
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={values.phoneNumber} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddTeachers;
