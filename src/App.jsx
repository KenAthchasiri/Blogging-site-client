import './App.css'
import NavbarComponent from './components/NavbarComponent'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import parse from 'html-react-parser'
import { getUser,getToken } from './services/autherize'

function App() {
  const [blogs,setBlogs] = useState([])
  
  const fetchData = () =>{
    axios
      .get(`${import.meta.env.VITE_API}/blogs`)
      .then(res=>{
        setBlogs(res.data)
      })
      .catch(err=>alert(err))
  }

  const confirmDelete = (slug) =>{
    Swal.fire({
      icon: 'warning',
      title: 'คุณต้องการลบบทความหรือไม่ ?',
      showCancelButton: true
    }).then((result)=>{
      if(result.isConfirmed){
        deleteBlog(slug)
      } 
    })
  }

  const deleteBlog = (slug) =>{
    axios
        .delete(`${import.meta.env.VITE_API}/blog/${slug}`,{headers:{authorization:`Bearer ${getToken()}`}})
        .then(res=>{
          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: res.data.message
          })
          fetchData()
        })
        .catch(err=>console.log(err))
  }
  
  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div className='container p-5'>
      <NavbarComponent/>
      {blogs.map((res,i)=>{
        return (
          <div className='row' key={i} style={{borderBottom:'1px solid silver'}}>
            <div className='col pt-3 pb-2'>

              <Link to={`/blog/${res.slug}`}>
                <h2>{res.title}</h2>
              </Link>

              <div className='pt-3'>
                {parse(res.content.substring(0,250))}
              </div>

              <p className='text-muted'>
                ผู้เขียน: {res.author} , เผยแพร่ : {new Date(res.createdAt).toLocaleString()}
              </p>

              {getUser() && 
                <div>
                  <Link to={`/blog/edit/${res.slug}`}  className='btn btn-outline-warning'>แก้ไขบทความ</Link> &nbsp;
                  <button className='btn btn-outline-danger' onClick={()=>confirmDelete(res.slug)}>ลบบทความ</button>
                </div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default App
