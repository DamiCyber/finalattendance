import React from 'react'
import { Link } from 'react-router-dom'
import "../assets/style/register.css"
// import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <div>
      <div className="whole-con">
        <div className="first-con">
          <div className="text">
            <h2>Register</h2>
            <p>Welcome to the Attendipen! Please fill in
              <br /> the required information to create your account.</p>
          </div>
          <div className="login-flex">
            <div className="login-first">
              <label htmlFor="">First Name</label>
              <input type="name" placeholder='First Name' />
            </div>
            <div className="login-first left">
              <label htmlFor="">Last Name</label>
              <input type="name" placeholder='Last Name' />
            </div>
          </div>
          <div className="login-second">
            <label htmlFor="email">Onpassive Email ID</label>
            <input type="email" placeholder='Enter Email ID' />
          </div>
          <div className="password-flex">
            <div className="password-first">
              <label htmlFor="">Password</label>
              <input type="password" placeholder='Password' />
            </div>
            <div className="password-first left">
              <label htmlFor="">Confirm Password</label>
              <input type="password" placeholder='Confirm Password' />
            </div>
          </div>
          <div className="button">b
            <button >Register</button>
          </div>
          <div className="option">
            <h1>or</h1>
          </div>
          <div className="google-button">
            <button className='google-button' >continue with Google</button>
          </div>
          <div className="account">
            <p>Already have account? </p>
            <Link to="/login" className='ink'>Login here</Link>
          </div>
        </div>
        <div className="second-con">
          <div className="secondbox">
            <div className="logo">
              <h1>A</h1>
              {/* <img src="@" alt="" /> */}
              <div className="text1">
                <h1>Attendipen</h1>
              </div>
            </div>
            <div className="text2">
              <p>“Attendance is the purest
                form of dedication.”</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Register