import React, { useState } from 'react'
import axios from 'axios';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BackendUrl = 'https://project-bookmanagment-production.up.railway.app'

const AddBook = () => {  
    const [data, setData] = useState({excerpt:'' , userId:'',ISBN:'',category:'',subcategory:'',releasedAt:'',title:''});
    const navigate = useNavigate()

    const changeHandler = (e) =>{
        setData({...data, [e.target.name] : e.target.value});
    }
    const submit = () =>{
        data.userId = JSON.parse(localStorage.getItem('user'))._id;
        axios.post(`${BackendUrl}/books`,data,{headers: {'x-api-key': localStorage.getItem('token')}}).then(res => {
            navigate('/');
            toast.success(res.data.message);
            setData({excerpt:'' , userId:'',ISBN:'',category:'',subcategory:'',releasedAt:'',title:''});
        }).catch(err =>{ 
            console.log(err);
            toast.error(err.response.data.message);
        });
    }
  return (
    <>
     <NavBar/>
     <div className="addbook">
     <ToastContainer/>
        <form className='shadow p-3 mb-5 bg-body rounded'>
            <div className="mb-3">
                <input type="text" onChange={changeHandler} name='title' value={data.title} placeholder='Title'  className="form-control" />
            </div>
            <div className="mb-3">
                <input type="text" onChange={changeHandler} name='excerpt' value={data.excerpt}  placeholder='Excerpt' className="form-control" />
            </div>
            <div className="mb-3">
                <input type="text" onChange={changeHandler} name='ISBN' value={data.ISBN} placeholder='ISBN Ex:- 978-3-16-148410-0'  className="form-control" />
            </div>
            <div className="mb-3">
                <input type="text" onChange={changeHandler} name='category' value={data.category} placeholder='Category'  className="form-control" />
            </div>
            <div className="mb-3">
                <input type="text" onChange={changeHandler} name='subcategory' value={data.subcategory} placeholder='Subcategory'  className="form-control" />
            </div>
            <div className="mb-3">
                <input type="date" onChange={changeHandler} name='releasedAt' value={data.releasedAt} placeholder='ReleasedAt'  className="form-control" />
            </div>
           <button type="submit" onClick={(e)=> { e.preventDefault(); submit() }} className="btn btn-outline-primary">Submit</button>
        </form>
     </div>   
    </>
  )
}

export default AddBook