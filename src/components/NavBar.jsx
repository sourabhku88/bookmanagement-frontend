import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavBar = () => {
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
           <ToastContainer/>
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/'}>Book Managment  <span style={{'fontSize':'12px'}}> {localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).name} </span>  </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav ms-auto " >
                        {localStorage.getItem('token') === null ? 
                        <>
                            <li className="nav-item f500"> <Link className="nav-link" to="/login">Login</Link> </li>
                            <li className="nav-item f500"> <Link className="nav-link" to="/signup">SignUp</Link> </li>
                        </> 
                        : 
                        <>
                           <li className="nav-item f500"> <Link className="nav-link " aria-current="page" to="/">Home</Link> </li>
                           <li className="nav-item f500"> <Link className="nav-link " aria-current="page" to="/addbook">Add Book</Link> </li>
                           <li className="nav-item f500"> <Link className="nav-link "onClick={()=> {localStorage.clear(); window.location.reload()} } > Logout </Link> </li>
                        </>
                        }
                    </ul>
                    </div>
            </div>
        </nav>
    </>
  )
}

export default NavBar