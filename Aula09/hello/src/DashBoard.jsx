import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import {TextField}  from '@mui/material'
import './App.css'
import './Dash.css'
import { Link } from 'react-router'
import Menu from './Menu'
import User from './User'
import { useEffect } from 'react'

function Dashboard() {
  const [pag, setPag] = useState("Dashboard")

  useEffect(() => {
    console.log("Dashboard")
  }, [])

  function renderContent(){
    if(pag === "Dashboard"){
      return (
        <div className='layout'>
          <h1> DASHBOARD</h1>  
        </div>
      )
    }
    if(pag === "Users"){
      console.log("Users")
      return ( <User/>)
    }
  }
  return (
    <>
    <div className='top' >
     <Menu page={pag}/>
     {renderContent()}
    </div>

    </>
  )
}

export default Dashboard
