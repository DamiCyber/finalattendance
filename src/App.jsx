import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Loader from './components/Loader'
import Register from './components/Register'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Loader />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Register" element={<Register />} />
    </Routes>
  
    </>
  )
}

export default App