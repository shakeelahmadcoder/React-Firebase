import React, { useState } from 'react'
import { getDatabase, ref, set, update } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../Firebase';
import { useLocation, useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [admNo, setAdmNo]= useState(location.state[0]);
  const [name, setName] = useState(location.state[1].studentName);
  const [phone, setPhone] = useState(location.state[1].phoneNumber);
  const [selectedFile, setSelectedFile]=useState();
  const handleChange=(e)=>{
    const file = e.target.files[0]
    setSelectedFile(file)
  }
  
  // function to update data 
  const handleSubmit = async(event)=>{
    event.preventDefault();
    if(admNo && name && phone){
    const db = getDatabase(app)
    const storage = getStorage(app);
    const myRef = storageRef(storage, `images/${location.state[0]}`)
    await uploadBytes(myRef, selectedFile);
    const imageUrl = await getDownloadURL(myRef)
   const studentRef = ref(db, 'students/'+location.state[0])
   update(studentRef, {studentName: name, phoneNumber: phone, imageUrl: imageUrl}).then(res=>{
    alert("suduent updated")
    navigate("/dashboard/StudentList")
   }).catch(err=>{
    alert(err)
   })
  }
  }
  return (
    <div>
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <input disabled value={admNo} onChange={(e)=>{setAdmNo(e.target.value)}} type="number" name="admNo" placeholder='Admission No' />
        <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" name="name" placeholder='Student Name' />
        <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} type="number" name="phone" placeholder='Student Phone' />
        <input onChange={handleChange} type="file"  />
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}

export default AddStudent