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
import AddStudents from './components/AddStudents'
import CreateSchool from './components/CreateSchool'
import SchoolAssign from './components/SchoolAssign'
import ParentDash from './components/ParentDash'
import Addmission from './components/Addmission'
import Attendance from  "./components/Attendace"
import SchoolListClass from  "./components/SchoolListClass"


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
     <Route path="/AddStudent" element={<AddStudents/>}/>
     <Route path="/CreateSchools" element={<CreateSchool/>}/>
     <Route path="/AssingTeachers" element={<SchoolAssign/>}/>
     <Route path="/ParentDashboard" element={<ParentDash/>}/>
     <Route path="/ViewAddmission" element={<Addmission/>}/>
     <Route path="/ViewAttendance" element={<Attendance/>}/>
     <Route path="/List" element={<SchoolListClass/>}/>
    
    </Routes>
  
    </>
  )
}

export default App