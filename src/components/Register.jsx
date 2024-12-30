import React from 'react'
import { Link } from 'react-router-dom'
import "../assets/style/register.css"
const Register = () => {
  return (
    <div>
      <div className="whole-cont">
       <form>
       <div className="first-cont">
          <div className="text">
            <h2>Register</h2>
            <p>Welcome to the Attendipen! Please fill in
              <br /> the required information to create your account.</p>
          </div>
          <div className="register-flex">
            <div className="register-first">
              <label htmlFor="">First Name</label>
              <input type="name" placeholder='First Name' />
            </div>
            <div className="register-first left">
              <label htmlFor="">Last Name</label>
              <input type="name" placeholder='Last Name' />
            </div>
          </div>
          <div className="register-second">
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
          <div className="buttons">
            <div className="button">
              <button >Register</button>
            </div>
            <div className="option">
              <h1>or</h1>
            </div>
            <div className="google-button">
              <button className='google-button' >continue with Google</button>
            </div>
            <div className="Reg-account">
              <p>Already have account? </p>
              <Link to="/login" className='inka'>Login here</Link>
            </div>
          </div>

        </div>
       </form>
        <div className="second-cont">
          {/* <div className="secondbox">
            <div className="logo">
              <h3>Welcome to</h3>
              <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1734982730/attend_in8wmy.png" alt="" />
            </div>
            <div className="text2">
              <p>“Attendance is the purest
                form of dedication.”</p>
            </div>
          </div> */}
        </div>
      </div>

    </div>
  )
}

export default Register