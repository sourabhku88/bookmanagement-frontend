import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import Cart from './Cart';
import NavBar from './NavBar';

const BackendUrl = 'https://project-bookmanagment-production.up.railway.app';

const Home = () => {
    const [books , setBooks] = useState([]);
    const [loading , setLoading] = useState(false);
    
    const getBooks = async () =>{
        try{
            setLoading(true);
            const {data} = await axios(`${BackendUrl}/books`,{headers: {'x-api-key': localStorage.getItem('token')}});
            setBooks(data.data);
            setLoading(false)
        }catch(err) {return console.log(err)}
    }
    
    useEffect(() => {
        getBooks()
    }, [])
    console.log();
  return (
    <> 
     {loading ? 
     <div className='d-flex justify-content-center align-items-center' style={{'height':'100vh'}}>
       <div className="spinner-grow text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
       </div>
    </div>
     
 : 
     <> 
        <NavBar/>
        <ToastContainer/>
        {localStorage.getItem('token') === null ?
        <div className=" home d-flex justify-content-around align-items-center flex-wrap ">
           <div className="text-center ">
           <h1> Please Login  </h1>
            <Link to={'/login'}>  <button type="submit"className="btn btn-outline-primary">Login</button>  </Link>
           </div>
        </div> 
        :
         <div className="d-flex justify-content-around align-items-center flex-wrap py-5 px-5" style={{'background':'rgb(238,174,202)',"background":"radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"}}>
         { books.map(ele => { return  <Cart key={ele._id} reviews={ele.reviews} userId = {ele.userId._id} releasedAt={ele.releasedAt} getBooks={getBooks} name={ele.userId.name}  title={ele.title}   _id={ele._id}   category={ele.category}/> })}
        </div>
        }
     </>
     }
    
        
    </>
  )
}

export default Home