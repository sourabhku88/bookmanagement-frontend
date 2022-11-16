import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './NavBar';

const BackendUrl = 'https://project-bookmanagment-production.up.railway.app';

const Login = () => {
    const [data, setData] = useState({email:'' , password:''});
    const navigate = useNavigate()
    
    const changeHandler = (e) =>{
        setData({...data, [e.target.name] : e.target.value});
    }
    const submit = () =>{
        axios.post(`${BackendUrl}/login`,data).then(res => {
            localStorage.setItem('token',res.data.data.token);
            localStorage.setItem('user',JSON.stringify(res.data.data.isUser));
            navigate('/');
            if(res.status === true) toast.success('login ');
            setData({email:'' , password:''});
        }).catch(err => { 
          toast.error(err.response.data.message);
          console.log(err);
        });
    }
  return (
    <>
    <NavBar/>
      <div className="login">
      <ToastContainer/>
        <form className='shadow p-3 mb-5 bg-body rounded'>
            <div className="mb-3">
                <input type="email" onChange={changeHandler} name='email' value={data.email}  placeholder='Email' className="form-control" />
            </div>
            <div className="mb-3">
                <input type="password" onChange={changeHandler} name='password' value={data.password} placeholder='Password'  className="form-control" />
            </div>
           <button type="submit" onClick={(e)=> { e.preventDefault(); submit() }} className="btn btn-outline-primary">Submit</button>
        </form>
      </div>   
    </>
  )
}

export default Login