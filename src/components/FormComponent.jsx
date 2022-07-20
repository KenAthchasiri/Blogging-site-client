import React from 'react'
import { useState,useEffect } from 'react'
import NavbarComponent from './NavbarComponent'
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { getUser, getToken } from '../services/autherize'
import { useNavigate } from 'react-router-dom'

const FormComponent = () => {
    const [state,setState] = useState({
        title: '',
        author: getUser()
    })
    const [content,setContent] = useState('')
    const {title,author} = state
    const navigate = useNavigate()

    const inputValue = name => event =>{
        console.log(name,event.target.value);
        setState({...state,[name]:event.target.value})
    }

    const submitContent = (e) =>{
        if (e.replace(/<(.|\n)*?>/g, '').trim().length === 0 && !e.includes("<img")) {
            setContent("")
        } else {
            setContent(e)
        }
    }

    const submitForm = (e) =>{
        e.preventDefault()
        axios
            .post(`${import.meta.env.VITE_API}/create`,{title,content,author},{headers:{authorization:`Bearer ${getToken()}`}})
            .then(res=>{
                Swal.fire({
                    icon: 'success',
                    title: 'แจ้งเตือน',
                    text: 'บันทึกข้อมูลเรียบร้อย',
                })
                setState({
                    title: '',
                    author: ''
                })
                setContent('')
            })
            .catch(err=>{
                Swal.fire({
                    icon: 'error',
                    title: 'แจ้งเตือน',
                    text: err.response.data.error,
                })
            })
    }

    useEffect(()=>{
        if(!getUser()){
            navigate("../login", { replace: true })
        }
    },[]) 

    return (
        <div className='container p-5'>
            <NavbarComponent/>
            <h1>เขียนบทความ</h1>

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
                        placeholder='เขียนรายละเอียดบทความ'
                    />
                </div>
                <div className='form-group'>
                    <label>ผู้แต่ง</label>
                    <input className='form-control' type="text" value={author} onChange={inputValue("author")}/>
                </div>
                <br />
                <input className='btn btn-primary' type="submit" value='บันทึก' />
            </form>

        </div>
    )
}

export default FormComponent