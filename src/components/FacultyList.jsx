import React, { useState, useEffect} from 'react'
import { getDocs, Firestore, getFirestore, doc, collection, deleteDoc } from 'firebase/firestore'
import { app } from '../Firebase';
import { useNavigate } from 'react-router-dom';

const FacultyList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, [])
  
  const getData = async ()=>{
    const db = getFirestore();
    const docRef = collection(db, 'faculty');
    const docSnaps = await getDocs(docRef)
    const data = docSnaps.docs.map(doc=>({
      id:doc.id,
      ...doc.data()
    }))
    setData(data)
  }

  const deleteData = async(id)=>{
    const db = getFirestore(app)
    const dataRef = doc(db, 'faculty', id);
    try {
      deleteDoc(dataRef)
      getData();
      alert("delted")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1></h1>
      {data.map(faculty=>{
        return (
          <div key={faculty.id}>  
            <p>{faculty.facultyName}</p>
            <p>{faculty.facultyPhone}</p>
            <button onClick={()=>{deleteData(faculty.id)}}>Delete</button>
            <button onClick={()=>{navigate("/dashboard/UpdateFaculty", {state: faculty})}}>Update</button>
             </div>
        )
      })}
    </div>
  )
}

export default FacultyList