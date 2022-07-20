import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavbarComponent from './NavbarComponent'
import parse from 'html-react-parser'

const FogusBlogComponent = () => {
    const [blog,setBlog] = useState('')
    const params = useParams()

    useEffect(()=>{
        axios
            .get(`${import.meta.env.VITE_API}/blog/${params.slug}`) 
            .then(res=>{
                setBlog(res.data)
            })
            .catch(err=>alert(err))
    },[])

    return (
        <div className='container p-5'>
            <NavbarComponent/>
            {blog &&
                <div>
                    <h1>{blog.title}</h1>
                    <div className='pt-3'>{parse(blog.content.substring(0,250))}</div>
                    <br/>
                    <p className='text-muted'>ผู้เขียน: {blog.author} , เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
                </div>
            }
        </div>
    )
}

export default FogusBlogComponent