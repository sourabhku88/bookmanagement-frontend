import React, { useRef, useState } from 'react'
import moment from "moment";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BackendUrl = 'https://project-bookmanagment-production.up.railway.app';

const Cart = ({_id , title , reviews , category , name ,releasedAt ,getBooks ,userId}) => {
    const [data, setData] = useState({excerpt:'' , ISBN:'',releasedAt:'',title:''});
    const [reviewData, setReviewData] = useState({reviewedBy:'' , rating:'',review:'',userId:''});
    const navigate = useNavigate();
    const ref = useRef('');
    const model2 = useRef('');

    const changeHandler = e => setData({...data, [e.target.name] : e.target.value});
    
    const changeHandler2 = e => setReviewData({...reviewData, [e.target.name] : e.target.value});
    
    const submit = _ =>{
        axios.put(`${BackendUrl}/books/${localStorage.getItem('id')}`,data,{headers: {'x-api-key': localStorage.getItem('token')}}).then(res => {
            localStorage.setItem('id','')
            toast.success(res.data.message);
            setData({excerpt:'' , ISBN:'',releasedAt:'',title:'',});
            getBooks();
        }).catch(err =>{ 
            console.log(err);
            toast.error(err.response.data.msg);
        });
    }
   
    const reviwe = _ => {
        reviewData.userId = JSON.parse(localStorage.getItem('user'))._id;
        axios.post(`${BackendUrl}/books/${localStorage.getItem('bookid')}/review`,reviewData).then(res => {
            localStorage.setItem('bookid','')
            toast.success(res.data.message);
            setReviewData({reviewedBy:'' , rating:'',review:'',});
            getBooks();
        }).catch(err =>{ 
            console.log(err);
            toast.error(err.response.data.message);
        });
    }

    const model = _ => ref.current.click();
    const model21 = _ => model2.current.click();
    
    const deleteBook = async (id) =>{
        try{
            const {data} = await axios.delete(`${BackendUrl}/books/${id}`,{headers: {'x-api-key': localStorage.getItem('token')}});
            toast.success(data.message);
            getBooks();
        }catch(err) {
            toast.error(err.response.data.message);
            console.log(err);
        }
    }
  return (
    <>
    {/* -----------------------------Model 1--------------------------------------------- */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title text-center" id="exampleModalLabel">Update book</h5>
                <button type="button" className="btn-outline-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form >
            <div className="mb-3">
                <input type="text" onChange={changeHandler} name='title' value={data.title} placeholder='Title'  className="form-control" />
            </div>
            <div className="mb-3">
                <input type="text "  onChange={changeHandler} name='excerpt' value={data.excerpt}  placeholder='Excerpt' className="form-control" />
            </div>
            <div className="mb-3">
                <input type="text" onChange={changeHandler} name='ISBN' value={data.ISBN} placeholder='ISBN Ex:- 978-3-16-148410-0'  className="form-control" />
            </div>
            <div className="mb-3">
                <input type="date" onChange={changeHandler} name='releasedAt' value={data.releasedAt} placeholder='ReleasedAt'  className="form-control" />
            </div>
        </form>
            </div>
            <div className="modal-footer">
                 <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                 <button type="button" onClick={() => submit()} className="btn btn-outline-primary">Update</button>
            </div>
            </div>
        </div>
        </div>
        {/* ---------------------------------model 2-------------------------------------------------------- */}
          <div className="modal fade" id="exampleModal1" tabIndex="-2" aria-labelledby="exampleModalLabel1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Give the feedback or ratting</h5>
                    <button type="button" className="btn-outline-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body"> 
                    <form>
                    <div className="mb-3">
                        <input type="text" placeholder='Name'  onChange={changeHandler2} value={reviewData.reviewedBy} name='reviewedBy'  className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input type="number" placeholder='Rating Ex- 1 to 5' onChange={changeHandler2} value={reviewData.rating} name='rating' className="form-control" />
                    </div>
                    <div className="mb-3">
                        <textarea className="form-control" onChange={changeHandler2} value={reviewData.review} name='review' placeholder='Message ....'></textarea>
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-outline-primary" onClick={()=> {reviwe() }} data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@mdo" > Send  </button>
                </div>
                </div>
            </div>
            </div>
        {/* ------------------------------------------data---------------------------------------------------------- */}
           <div className="card mb-3" style={{"maxWidth":"540px"}} key={_id}>
            <ToastContainer/>
                <div className="row g-0">
                    <div className="col-md-4" style={{'cursor':'pointer' }}  onClick={()=> navigate(`/book/${_id}`)}>
                    <img src="https://source.unsplash.com/1000x1400/?Book,HTML" className="img-fluid rounded-start " alt="Not Found"/>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body" >
                        <h5 className="card-title f500">{title}</h5>
                        <h6 className="card-text "> {category}</h6>
                        <span className="card-text"> by  <span className='f100 text-muted'> {name} </span> </span>
                        <p className="card-title mt-0"> Reviews <span className="badge bg-primary " >{reviews} </span> </p>
                        <p className="card-text"><small className="text-muted"> Released date {moment(releasedAt).utc().format('YYYY-MM-DD')}</small></p>
                        <div className="buton text-end ">
                   <button type="button" onClick={()=>{localStorage.setItem('bookid',_id)}}  ref={model2}   className=" btn-sm btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@mdo" >Review</button>
                {JSON.parse(localStorage.getItem('user'))._id === String(userId) ? 
                    <>
                    <button type="button" ref={ref} onClick={()=>{localStorage.setItem('id',_id)}}  data-bs-toggle="modal" data-bs-target="#exampleModal"  className="btn btn-outline-warning mx-2 btn-sm">Update</button>
                    <button type="button"onClick={()=> deleteBook(_id)} className="btn btn-outline-danger btn-sm">Delete</button>
                    </>
                 : ''}
                </div>
                    </div>
                    </div>
                </div>
                </div>
    </>
  )
}

export default Cart