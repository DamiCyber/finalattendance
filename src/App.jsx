import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Loader from './components/Loader'
import Register from './components/Register'
import Teachers from './components/Teachers'
import Student from './components/Student'
import Billings from './components/Billings'
import Setting from './components/Setting'
import Exams from './components/Exams'
import AddTeachers from './components/AddTeachers'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Loader />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Teachers" element={<Teachers />} />
      <Route path="/Student" element={<Student />} />
      <Route path="/Billings" element={<Billings />} />
      <Route path="/Setting" element={<Setting />} />
      <Route path="/Exams" element={<Exams />} />
      <Route path="/AddTeachers" element={<AddTeachers />} />
    </Routes>
  
    </>
  )
}

export default App