import React from 'react'
import App from '../App'
import EditComponent from '../components/EditComponent'
import FogusBlogComponent from '../components/FogusBlogComponent'
import FormComponent from '../components/FormComponent'
import LoginComponent from '../components/LoginComponent'
import PageNotFound from '../components/PageNotFound'

export const RouterModel = [
    {
        path: '/',
        pageComponent: <App/>
    },
    {
        path: '/create',
        pageComponent: <FormComponent/>
    },
    {
        path: '/blog/:slug',
        pageComponent: <FogusBlogComponent/>
    },
    {
        path: '/blog/edit/:slug',
        pageComponent: <EditComponent/>
    },
    {
        path: '/login',
        pageComponent: <LoginComponent/>
    },
    {
        path: '*',
        pageComponent: <PageNotFound/>
    }
]


    

    


