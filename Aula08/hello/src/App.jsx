import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import {TextField}  from '@mui/material'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [nome, setNome] = useState("")
  const [senha, setSenha] = useState("")

  const handldeSalvar = async (event)=>{
    event.preventDefault();
    const   body =   {
            email:nome,
            senha:senha
      };
 
   
   const response = await fetch('http://dig-huntress-arming.ngrok-free.dev/v1/usuario/login',
  {
      method: 'POST', // Define o método como POST
     // mode:"no-cors",
      headers: {
        
        'Content-Type': 'application/json', // Avisa o servidor que estamos enviando JSON
        'ngrok-skip-browser-warning': '69420' // Necessário se estiver usando o plano gratuito do ngrok
      },
      body: JSON.stringify({ "email": nome, "senha": senha }) 
  } 
  ).catch((e)=>{
    console.log(e);
  })
   if (response){
      console.log(response)
   }

    ///chamar o back end
    alert(nome + senha)
  }

  return (
    <>
    <form onSubmit={handldeSalvar}>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>IFCE</h1>
          <TextField id="login" label="Nome" required type="email" value={nome} style={{ marginBottom:10}} onChange={(e)=>{
            setNome(e.target.value)
          }}  ></TextField>
          <br clear="all"/>
           <TextField id="senha" label="Senha" required type="password" value={senha} onChange={(e)=>{
            setSenha(e.target.value)
          }}  ></TextField>

         
         
        </div>
        <button
          type="submit"
          className="counter"
        >
         Entrar
        </button>
      </section>

      <div className="ticks"></div>

    </form>
    </>
  )
}

export default App
