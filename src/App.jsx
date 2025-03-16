import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Loader from './components/Loader'
import Register from './components/Register'
import Teachers from './components/Teachers'
import Student from './components/Student'
import Setting from './components/Setting'
import AddTeachers from './components/AddTeachers'
import AddStudents from './components/AddStudents'
import CreateSchool from './components/CreateSchool'
import SchoolAssign from './components/SchoolAssign'
import SchoolListClass from "./components/SchoolListClass"
import ViewAttendance from './lib/ViewAttendance'
import Mark from './components/Mark'
import ParentDash from './components/ParentDash'
import TeachersDashboard from './components/TeachersDashboard'


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Loader />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Teachers" element={<Teachers />} />
        <Route path="/CreateClass" element={<CreateSchool />} />
        <Route path="/List" element={<SchoolListClass />} />
        <Route path="/Setting" element={<Setting />} />
        <Route path="/sendIviteToTeachers" element={<AddTeachers />} />
        <Route path="/View" element={<ViewAttendance />} />
        <Route path="/Parent" element={<ParentDash />} />
        <Route path="/Teacher" element={<TeachersDashboard />} />
        <Route path="/AddStudent" element={<AddStudents />} />
        <Route path="/class/:classId/students" element={<Student />} />
        <Route path="/mark" element={<Mark />} /> {/* not working */}
        <Route path="/AssignTeachers" element={<SchoolAssign />} />  {/* not working */}
      </Routes>

    </>
  )
}

export default App