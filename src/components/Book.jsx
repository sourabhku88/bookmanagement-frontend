import axios from 'axios';
import moment from "moment";
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../components/NavBar'

const BackendUrl = 'https://project-bookmanagment-production.up.railway.app';

const Book = () => {
    const params = useParams();
    const model = useRef()
    const [data, setData] = useState({});
    const [reviews, setReviews] = useState([]);
    const [reviewID , setRevviewID] = useState('');
    const [reviewData, setReviewData] = useState({reviewedBy:'' , rating:'',review:'',});

    const modelShow = _ => model.current.click();
    const changeHandler = e => setReviewData({...reviewData, [e.target.name] : e.target.value});

    const getBook = async _ =>{
        try {
            const res = await axios(`${BackendUrl}/books/${params.id}`,{headers: {'x-api-key': localStorage.getItem('token')}})
            setData(res.data.data);
            setReviews(res.data.reviews);
        } catch (error) {
            console.log(error);
        }
    }
    const submit = _ =>{
        reviewData.rating = +reviewData.rating;
        axios.put(`${BackendUrl}/books/${params.id}/review/${reviewID}`,reviewData,{headers: {'x-api-key': localStorage.getItem('token')}}).then(res => {
            toast.success(res.data.message);
            setData({reviewedBy:'' , rating:'',review:'',});
            getBook()
        }).catch(err =>{ 
            console.log(err);
            toast.error(err.response.data.message);
        });
    }
    const deleteReview = async id =>{
        try{
            const {data} = await axios.delete(`${BackendUrl}/books/${params.id}/review/${id}`,{headers: {'x-api-key': localStorage.getItem('token')}});
            toast.success(data.message);
            getBook();
        }catch(err) {
            toast.error(err.response.data.message);
            console.log(err)
        }
    }
    useEffect(() => {
        getBook();
    }, [])
    
  return (
    <>
       <NavBar/>
       <div className="book container">  
       <ToastContainer/>
       {/* -----------------------------------Book Detail---------------------------------------- */}
       <h1 className='text-center my-3'>Book details</h1>
       <div className="card mb-3 shadow p-3 bg-body rounded">
        <img src="https://source.unsplash.com/1200x1200/?Book,HTML" style={{'width':'100%','height':'350px'}} className="card-img-top" alt="Not found"/>
            <div className="card-body">
                <h4 className="card-title">{data.title}</h4>
                <h6 className="card-title">{data.excerpt}</h6>
                <p className="card-text">{data.ISBN}</p>
                <p className="card-text">{data.category}</p>
                {[data.subcategory].map(ele =>  <p  className="card-text" key={Date.now()}> {ele} </p>)}
                <p className="card-text"><small className="text-muted">{moment(data.releasedAt).utc().format('YYYY-MM-DD')}</small></p>
            </div>
        </div>
        {/* ------------------------------------review--------------------------------------------------------- */}
        <div className="reviwewers">
        { reviews.length === 0 ? <h2 className='text-center text-danger'> No Review  </h2> : 
            reviews.map((ele ,index)=> {
            return (
                        <div className="shadow p-3 mb-3 bg-body rounded" key={Date.now()} >
                            <div className="person">
                                <h6>{ele.reviewedBy}</h6> 
                                <span className={ele.rating > 3 ? "badge bg-success" :"badge bg-warning text-dark"}> Ratting {ele.rating} </span>
                            </div>
                                <p className="text-muted mt-2 f100" >{ele.review}</p>
                                <p className="card-text text-end"><small className="text-muted">{moment(ele.reviewedAt).fromNow()}</small></p>
                                {JSON.parse(localStorage.getItem('user'))._id === String(ele.userId) ? 
                            <>
                            <button type="button" onClick={()=>{setRevviewID(ele._id)}} ref={model}  data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@mdo" className="btn btn-outline-warning btn-sm mx-2">Update</button>
                            <button type="button" onClick={()=>{deleteReview(ele._id)}} className="btn btn-outline-danger btn-sm">Delete</button>
                            </>
                           : ''}
                        </div>
                   )})}
        </div>
       </div>
       {/* -----------------------------------Model------------------------------- */}
       <div className="modal fade" id="exampleModal1" tabIndex="-2" aria-labelledby="exampleModalLabel1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Update Review</h5>
                    <button type="button" className="btn-outline-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body"> 
                    <form>
                    <div className="mb-3">
                        <input type="text" placeholder='Name'  onChange={changeHandler} value={reviewData.reviewedBy} name='reviewedBy'  className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input type="number" placeholder='Rating Ex- 1 to 5' onChange={changeHandler} value={reviewData.rating} name='rating' className="form-control" />
                    </div>
                    <div className="mb-3">
                        <textarea className="form-control" onChange={changeHandler} value={reviewData.review} name='review' placeholder='Message ....'></textarea>
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-outline-primary" onClick={()=> {submit()}} data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@mdo" > Send  </button>
                </div>
                </div>
            </div>
            </div>
    </>
  )
}

export default Book