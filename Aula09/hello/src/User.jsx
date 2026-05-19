import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import {TextField}  from '@mui/material'
import './App.css'
import './Dash.css'
import { Link } from 'react-router'
import Menu from './Menu'
import { useEffect } from 'react'

function User( setUser) {
  
  useEffect(() => {
    console.log("User")
  }, [  ])

  return (
    <>
    <div className='top'  >
     <Menu page={"Users"}/>
      <div className='layout'>
          <h1> Create User</h1>  

           <TextField id="login" label="Nome" required type="email"  style={{ marginBottom:10}}  
          ></TextField>
           <TextField id="login" label="Senha" required type="email"  style={{ marginBottom:10}}  
          ></TextField>

      </div>

    </div>

    </>
  )
}

export default User
