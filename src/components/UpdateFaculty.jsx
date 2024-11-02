import React from 'react'
import { useState } from 'react';
import { getFirestore, addDoc, collection, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import {app} from "../Firebase"
import { useLocation, useNavigate } from 'react-router-dom';
const UpdateFaculty = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state)
    const [name, setName] = useState(location.state.facultyName);
    const [phone, setPhone] = useState(location.state.facultyPhone);

    const submitHandler = async(event)=>{
        event.preventDefault();
        const db = getFirestore(app);
        const docRef = doc(db, 'faculty', location.state.id)
        try {
            updateDoc(docRef, {facultyName: name, facultyPhone:phone})
            alert("updated")
            navigate("/dashboard/FacultyList")
        } catch (error) {
           console.log(error) 
        }
    }
   
  return (
    <div>
        <form onSubmit={submitHandler}>
            <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" name='name' placeholder='Student Name' />
            <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} type="number" name="phone" placeholder='Student Phone' />
            <button  type="submit">Submit</button>
        </form>
    </div>
  )
}

export default UpdateFaculty