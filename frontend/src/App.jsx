import { useState } from 'react'
import React from 'react'
import './App.css'
import Navbar from './components/shared/Navbar'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import { ToastContainer } from 'react-toastify'

const appRouter=createBrowserRouter([
  {
    path: '/',
    element:<Home/>,
  },
  {
    path: '/login',
    element:<Login/>,
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  }

])

function App() {
  

  return (
    <>
  <ToastContainer/>
     <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
