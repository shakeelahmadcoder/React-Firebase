import React from 'react'
import { useState } from 'react';
import { getFirestore, addDoc, collection, doc, deleteDoc } from 'firebase/firestore';
import {app} from "../Firebase"
import { useNavigate } from 'react-router-dom';
const AddFaculty = () => {
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();

    const submitHandler = async(event)=>{
        event.preventDefault();
        const db = getFirestore(app);
        const addRef = await addDoc(collection(db, 'faculty'),{
        facultyName: name,
        facultyPhone: phone
        }).then(res=>{
          alert("Faculty Added")
          navigate("/dashboard/FacultyList")
        }).catch(err=>{
          alert(err)
        })
        // console.log(addRef)
    }
   
  return (
    <div>
        <form onSubmit={submitHandler}>
            <input onChange={(e)=>{setName(e.target.value)}} type="text" name='name' placeholder='Student Name' />
            <input onChange={(e)=>{setPhone(e.target.value)}} type="number" name="phone" placeholder='Student Phone' />
            <button  type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AddFaculty