import React from 'react'
import "../assets/style/login.css"
import { Link } from 'react-router-dom'
const Login = () => {

  return (
    <div>
      <div className="whole-con">
        <div className="first-con">
          <div className="text">
            <h2>Login</h2>
            <h4>Welcome Back</h4>
            <p>Please enter your Attendance credentials.</p>
          </div>
          <div className="login">
            <label htmlFor="email">Email ID</label>
            <input type="email" placeholder='Enter Email ID' />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Password' />
          </div>
          <div className="remember">
            <input type="checkbox" className='box' />
            <label htmlFor="remember" className='label'>Remember me</label>
          </div>
          <div className="forgot-password">
            <Link to="#" className='forgot-password'>Forgot Password?</Link>
          </div>
          <div className="button">
            <button >LOGIN</button>
          </div>
          <div className="account">
            <p>Don't you have account?</p>
            <Link to="/Register" className='ink'> Register here</Link>
          </div>
        </div>
        <div className="second-con">
          <div className="secondbox">
            <div className="logo">
            <img src="https://res.cloudinary.com/dgxvuw8wd/image/upload/v1734982730/attend_in8wmy.png" alt="" />
            </div>
            <div className="text2">
              <p>"Attendance is the first step to success, be present to win."</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login