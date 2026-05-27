import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import {TextField}  from '@mui/material'
import './App.css'
import { Link, useNavigate } from 'react-router'
import api from './service/api'

function Login() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0)
  const [nome, setNome] = useState("")
  const [senha, setSenha] = useState("")

  const handldeSalvar = async (event)=>{
    event.preventDefault();
    const   body =   {
            email:nome,
            senha:senha
      };
 
   
   const response = await api.post('/usuario/login',
    JSON.stringify({ "email": nome, "senha": senha }) 
   
  ).then((response)=>{
    console.log(response);
    console.log(response.data.token);
     navigate("/dashboard")
  }).catch( (e)  => {
    console.error('Erro na requisição:', e);
    const resp =  e
    if (resp.response && resp.response.data && resp.response.data.ms) {
      alert('Erro: ' + resp.response.data.ms);
    } else {
      alert('Ocorreu um erro desconhecido.');
    }
    console.log(resp.response.data.ms);
  })
  /*console.log(response);
   if (response.status === 200) {
    console.log("Requisição bem-sucedida!");
    const data = await response.json();
      
   }
   if (response.status === 404) {
  //  console.error('Erro na resposta:', response.status, response.statusText);
    const errorData = await response.json();
    alert('Erro: ' + errorData.ms);
    //console.error('Detalhes do erro:', errorData.ms);
  }

    ///chamar o back end
    //alert(nome + senha)(+*/
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

export default Login
