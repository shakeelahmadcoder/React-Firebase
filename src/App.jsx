import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import StudentList from './components/StudentList'
import AddStudent from './components/AddStudent'
import UpdateStudent from './components/UpdateStudent'
import AddFaculty from './components/AddFaculty'
import FacultyList from './components/FacultyList'
import UpdateFaculty from './components/UpdateFaculty'
import Signup from './components/Signup'
import Login from './components/Login'
const myRouter = createBrowserRouter([
  {path: "signup", Component:Signup}, 
  {path: "login", Component:Login}, 
  {path: "dashboard", Component:Dashboard, children:[
    {path: "", Component:StudentList},
    {path: "studentList", Component:StudentList},
    {path: "addStudent", Component:AddStudent},
    {path: "updateStudent", Component:UpdateStudent},
    {path: "addFaculty", Component:AddFaculty},
    {path: "facultyList", Component:FacultyList},
    {path: "updateFaculty", Component:UpdateFaculty}
  ]},
])
const App = () => {
  return (
    <div>
      <RouterProvider router={myRouter}/>
    </div>
  )
}

export default App