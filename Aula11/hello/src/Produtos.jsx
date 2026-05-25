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

function Produtos( setUser) {
  
  useEffect(() => {
    console.log("Produtos")
  }, [  ])

  return (
    <>
    <div className='top'  >
     <Menu page={"Produtos"}/>
      <div className='layout'>
          <h1> Create Produtos</h1>  

         

      </div>

    </div>

    </>
  )
}

export default Produtos
