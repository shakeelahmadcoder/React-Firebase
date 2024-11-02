import React, { useState } from 'react'
import { signInWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../Firebase';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail]  =  useState('');
    const [password, setPassword] = useState();
    const submitHandler = (event)=>{
        event.preventDefault();
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password).then(res=>{
            console.log(res.user)
            alert("Login Successfully");
            navigate("/dashboard")
        })
    }
    const loginWithGoogle = ()=>{
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(res=>{
            alert("Signin Successfully")
            navigate("/dashboard")
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }
  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
            <input onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" placeholder='Enter Email' />
            <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" placeholder="Create Password" />
            <button type="submit">Login</button>
            <button type='button' onClick={loginWithGoogle} className='bg-blue-900 py-2 px-4 text-white'>Login with Google</button>
        </form>
    </div>
  )
}

export default Login