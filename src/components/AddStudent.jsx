import React, { useState } from 'react'

import { getDatabase, ref, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../Firebase';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const navigate = useNavigate()
  const [name, setName] = useState();
  const [admNo, setAdmNo]= useState();
  const [phone, setPhone] = useState();
  const [selectedFile, setSelectedFile]=useState();
  const handleChange=(e)=>{
    const file = e.target.files[0]
    setSelectedFile(file)
  }
  // function to send data on firebase 
  const handleSubmit = async(event)=>{
    event.preventDefault();
    if(admNo && name && phone){
    const db = getDatabase(app)
    const storage = getStorage(app);
    const myRef = storageRef(storage, `images/${admNo}`)
      await uploadBytes(myRef, selectedFile);
      const imageUrl = await getDownloadURL(myRef)
    set(ref(db, 'students/' + admNo), {
      studentName: name,
      phoneNumber: phone,
      imageUrl: imageUrl
    }).then(res=>{
      alert("Student Added Successfully")
      navigate("/dashboard/StudentList")
    }).catch((err=>{
      alert(err)
    }))
  }
  }
  return (
    <div>
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={(e)=>{setAdmNo(e.target.value)}} type="number" name="admNo" placeholder='Admission No' />
        <input onChange={(e)=>{setName(e.target.value)}} type="text" name="name" placeholder='Student Name' />
        <input onChange={(e)=>{setPhone(e.target.value)}} type="number" name="phone" placeholder='Student Phone' />
        <input onChange={handleChange} type="file"  />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddStudent