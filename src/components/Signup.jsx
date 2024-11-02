import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from '../Firebase';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail]  =  useState('');
    const [password, setPassword] = useState();
    const submitHandler = (event)=>{
        event.preventDefault();
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password).then(res=>{
            console.log(res.user)
            alert("account created");
            navigate("/login")
        })
    }
  return (
    <div>
        <h1>Sign Up</h1>
        <form onSubmit={submitHandler}>
            <input onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" placeholder='Enter Email' />
            <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" placeholder="Create Password" />
            <button type="submit">Signup</button>
        </form>
    </div>
  )
}

export default Signup