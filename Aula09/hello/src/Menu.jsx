import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import {TextField}  from '@mui/material'
import './App.css'
import { Link } from 'react-router'

function Menu() {
  

  return (
    <>
   
      <div className='sidebar' style={{ width:"200px" }}>
        <h2>Menu</h2>
        <Link to="/">Login</Link>
        <Link to="/dashboard" >Dashboard</Link>
         <Link to="/user/create" >User</Link>
      </div>
   
    </>
   
  )
}

export default Menu
