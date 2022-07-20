import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavbarComponent from './NavbarComponent'
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getUser,getToken } from '../services/autherize'

const EditComponent = () => {
    const [state,setState] = useState({
        title: '',
        author: '',
        slug: ''
    })
    const [content,setContent] = useState('')
    const {title,author,slug} = state
    const navigate = useNavigate()
    const params = useParams()

    

    const submitContent = (e) =>{
        if (e.replace(/<(.|\n)*?>/g, '').trim().length === 0 && !e.includes("<img")) {
            setContent("")
        } else {
            setContent(e)
            console.log(e);
        }
    }

    useEffect(()=>{

        if(!getUser()){
            navigate("../login", { replace: true })
        } else {
            axios
                .get(`${import.meta.env.VITE_API}/blog/${params.slug}`) 
                .then(res=>{
                    const {title,content,author,slug} = res.data
                    setState({title,author,slug})
                    setContent(content)
                })
                .catch(err=>alert(err))
                }
    },[])

    const inputValue = name => event =>{
        console.log(name,event.target.value);
        setState({...state,[name]:event.target.value})
    }

    const submitForm = (e) =>{
        e.preventDefault()
        axios
        .put(`${import.meta.env.VITE_API}/blog/${slug}`,{title,content,author},{headers:{authorization:`Bearer ${getToken()}`}})
        .then(res=>{
            Swal.fire({
                icon: 'success',
                title: 'แจ้งเตือน',
                text: 'อัพเดตข้อมูลเรียบร้อย',
            })
            const {title,content,slug} = res.data
            setState({...state,title,author,slug})
            setContent(content)
            navigate(`../blog/${slug}`, { replace: true })
        })
        .catch(err=>{
            Swal.fire({
                icon: 'error',
                title: 'แจ้งเตือน',
                text: err.response.data.error,
            }) 
        })
    } 

    const showUpdateForm = () =>(
        <form onSubmit={submitForm}>
                <div className='form-group'>
                    <label>ชื่อบทความ</label>
                    <input className='form-control' type="text" value={title} onChange={inputValue("title")}/>
                </div>
                <div className='form-group'>
                    <label>รายละเอียด</label>
                    <ReactQuill
                        value={content}
                        onChange={submitContent}
                        className='pb-5 mb-3'
                    />
                </div>
                <div className='form-group'>
                    <label>ผู้แต่ง</label>
                    <input className='form-control' type="text" value={author} onChange={inputValue("author")}/>
                </div>
                <br />
                <input className='btn btn-primary' type="submit" value='อัพเดต' />
                
            </form>
    )

    return (
        <div className='container p-5'>
            <NavbarComponent/>
            <h1>แก้ไขบทความ</h1>
            {showUpdateForm()}
        </div>
    )
}

export default EditComponent