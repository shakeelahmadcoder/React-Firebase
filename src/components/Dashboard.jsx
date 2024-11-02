import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { FaAddressCard } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div>
        <div className="flex">
            {/* left  */}
            <div className="left bg-blue-900 h-screen w-[20%] flex flex-col text-white p-8 gap-4"> 
                <h1 className='text-xl font-bold'>Dashboard</h1>
                <div className='flex gap-2 items-center'> <FaAddressCard className='text-2xl' /> <Link to="/dashboard/addStudent" className='hover:bg-blue-700 p-2 rounded-xl'> Add Student</Link> </div>
                <div className='flex gap-2 items-center'> <FaListAlt className='text-2xl' /> <Link to="/dashboard/studentList" className='hover:bg-blue-700 p-2 rounded-xl'> Student List</Link> </div>
                <div className='flex gap-2 items-center'> <FaAddressCard className='text-2xl' /> <Link to="/dashboard/addFaculty" className='hover:bg-blue-700 p-2 rounded-xl'> Add Faculty</Link> </div>
                <div className='flex gap-2 items-center'> <FaListAlt className='text-2xl' /> <Link to="/dashboard/facultyList" className='hover:bg-blue-700 p-2 rounded-xl'> Faculty List</Link> </div>
            </div>
            {/* right  */}
            <div className="right h-screen w-[80%]">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard