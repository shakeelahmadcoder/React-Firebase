import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, remove } from 'firebase/database'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { app } from '../Firebase'
import { useLocation, useNavigate } from 'react-router-dom'
const StudentList = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState();
  useEffect(() => {
    const db = getDatabase(app)
    const studentRef = ref(db, 'students')
    onValue(studentRef, (snapshot)=>{
      const file = snapshot.val();
      setStudentData(file)
    })
  }, [])
  console.log(location)
  // function to delete 
  const handleDelete = (key)=>{
    const db = getDatabase(app)
    const studentRef = ref(db, `students/${key}`)
    const storage = getStorage(app);
    const myRef = storageRef(storage, `images/`+ key)
    deleteObject(myRef)
    remove(studentRef).then(res=>{
      alert("data deleted")
    }).catch(err=>{
      alert(err)
    })
  }
  return (
    <div>
      <h1>Student List </h1>
      {studentData && (
        <div>
          {Object.entries(studentData).map(([key, value])=>{
            return (
              <div key={key}> 
                <img className='w-20 rounded-full' src={value.imageUrl} alt="" />
                {console.log(value.imageUrl)}
                <p>{value.studentName}</p>
                <p>{value.phoneNumber}</p>
                <button onClick={()=>{handleDelete(key)}}>Delete</button>
                <button onClick={()=>{navigate("/dashboard/UpdateStudent", {state: [key, value]})}}>Update</button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default StudentList