import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import {TextField}  from '@mui/material'
import './App.css'
import './Dash.css'
import { Link } from 'react-router'
import Menu from './Menu'

function Dashboard() {
  

  return (
    <>
    <div className='top' >
     <Menu/>
      <div className='layout'>
          <h1> DASHBOARD</h1>  

      </div>

    </div>

    </>
  )
}

export default Dashboard
