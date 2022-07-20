//เก็บข้อมูล Token / username ลงใน session storage
export const authenticate = (res,next) =>{
    if(window !== 'undifined'){
        //เก็บขอมูลลง session storage
        sessionStorage.setItem('token',JSON.stringify(res.data.token))
        sessionStorage.setItem('user',JSON.stringify(res.data.username))
    }
    next()
}
//ดึงข้องมูล token เพื่อทำการซ่อนลิ้งเข้าสู่ระบบ
export const getToken = () =>{
    if(window !== 'undifined'){
        if(sessionStorage.getItem('token')){
            return JSON.parse(sessionStorage.getItem('token'))
        } else{
            return false
        }
    }
}
//ดึงข้องมูล user เพื่อทำการซ่อนลิ้งเข้าสู่ระบบ
export const getUser = () =>{
    if(window !== 'undifined'){
        if(sessionStorage.getItem('user')){
            return JSON.parse(sessionStorage.getItem('user'))
        } else{
            return false
        }
    }
}

export const logout = (next) =>{
    if(window !== 'undifined'){
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
    }
    next()
    location.reload()
    

}