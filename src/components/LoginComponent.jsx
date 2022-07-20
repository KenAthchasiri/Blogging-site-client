import React from 'react'
import { useState,useEffect } from 'react'
import NavbarComponent from './NavbarComponent'
import axios from 'axios'
import Swal from 'sweetalert2'
import { authenticate, getUser } from '../services/autherize'
import { useNavigate } from 'react-router-dom'

const LoginComponent = () => {
    const [state,setState] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate()
    const {username,password} = state

    const inputValue = name => event =>{
        console.log(name,event.target.value);
        setState({...state,[name]:event.target.value})
    }

    const submitForm = (e) =>{
        e.preventDefault()
        axios
            .post(`${import.meta.env.VITE_API}/login`,{username,password})
            .then(res=>{
                console.log(res.data);
                Swal.fire({
                    icon: 'success',
                    title: 'เข้าสู่ระบบเรียบร้อย'
                })
                authenticate(res,()=>navigate("../", { replace: true }))
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
        if(getUser()){
            navigate("../", { replace: true })
        }
    },[]) 

    return (
        <div className='container p-5'>
            <NavbarComponent/>
            <h1>เข้าสู่ระบบ | Admin</h1>
            
            <form onSubmit={submitForm}>
                <div className='form-group'>
                    <label>Username</label>
                    <input className='form-control' type="text" value={username} onChange={inputValue("username")}/>
                </div>

                <div className='form-group'>
                    <label>Password</label>
                    <input className='form-control' type="password" value={password} onChange={inputValue("password")}/>
                </div>
                <br />
                <input className='btn btn-primary' type="submit" value='เข้าสู่ระบบ' />
            </form>

        </div>
    )
}

export default LoginComponent