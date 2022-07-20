import React from 'react'
import { Link } from 'react-router-dom'
import { getUser,logout } from '../services/autherize'
import { useNavigate } from 'react-router-dom'

const NavbarComponent = () => {
    const navigate = useNavigate()

    return (
        <nav>
            <ul className='nav nav-tabs'>

                <li className='nav-item pr-3 pt-3 pb-3'>
                    <Link className='nav-link' to="/">หน้าแรก</Link>
                </li>
                
                {getUser() && 
                    <li className='nav-item pr-3 pt-3 pb-3'>
                        <Link className='nav-link' to="/create">เขียนบทความ</Link>
                    </li>
                }
                
                {!getUser() ? (
                    <li className='nav-item pr-3 pt-3 pb-3'>
                        <Link className='nav-link' to="/login">เข้าสู่ระบบ</Link>
                    </li>
                ):(
                    <li className='nav-item pr-3 pt-3 pb-3'>
                        <button className='nav-link' onClick={()=>logout(()=>navigate("../", { replace: true }))}>ออกจากระบบ</button>
                    </li>
                    )
                }
            </ul>
        </nav>
    )
}

export default NavbarComponent