import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {RouterModel} from './route/RouterModel'

const MyRoute = () => {
    return (
        <div>
            <BrowserRouter>    
                <Routes>
                    {RouterModel.map((res,i)=>{
                        return <Route key={i} path={res.path} exact element={res.pageComponent}/>
                    })}
                </Routes>  
            </BrowserRouter>
        </div>
    )
}

export default MyRoute