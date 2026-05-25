import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Alert, TextField } from '@mui/material'
import './App.css'
import './Dash.css'
import { Form, Link } from 'react-router'
import Menu from './Menu'
import { useEffect } from 'react'
import api from './service/api'

function User(setUser) {

  const [list, setList] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [id, setId] = useState(null)

  

  async function loadUser() {

    const result = await api.get("/usuario/all").then(
      (res) => {
        setList(res.data.usuarios)
        console.log(res.data.usuarios);

      }
    )

  }

  useEffect(() => {
    loadUser();
  }, [])

  const saveUser = async (event) => {
    event.preventDefault();
    const user = {
      nome: name,
      email:email,
      senha: senha,
      mensagem:"vazlio"
    };
    console.log(user);

     let url = "/usuario/create"
    if (id == null){
      const save = await api.post(url, JSON.stringify(user)).then(
      (response) => {
        if (response.status == 200) {
          loadUser()    
        }
      }
    ).catch((error) => {
      console.log(error);
    })
      
    } else {
      
      api.put("usuario/update/"+id, JSON.stringify(user)).then(
      (response) => {
        alert("aqui");
        
        if (response.status == 200) {
        loadUser()    
           
        }

      }
    ).catch((error) => {
      console.log(error);

    });
    }
    

    
  }

  async function apagar(id) {

    if (confirm("Deseja realmente excluir?")){

      api.delete("usuario/delete/"+id).then((repo)=>{
        loadUser();
        alert("Item Apagado com suceso")
      }).catch( (error)=>{

        console.log(error)
        alert("Erro ao apagar!!")
      })
    //  alert(id);
    }
    
  }

  async function editar(id) {

     api.get("usuario/byid/"+id).then((rest)=>{
      const usera = rest.data.usuarios;
      console.log(usera)
      setEmail(usera.email)
      setName(usera.nome)
      setSenha(usera.senha)
      setId(usera.id)


     } ).catch( (error) => {


     })

    alert(id)
    
  }

  return (
    <>
      <div className='top'  >
        <Menu page={"Users"} />
        <div className='layout'>
          <h1>Usuários</h1>

          <form onSubmit={saveUser}>
            <TextField id="login" label="Email" onChange={(e) =>{
              setEmail(e.target.value)
            } } required type="email" style={{ marginBottom: 10 }}
             value={email} ></TextField>
            <br></br>
            <TextField id="login" label="Nome" onChange={(e)=>{
              setName(e.target.value)
            }} required type="text" style={{ marginBottom: 10 }} value={name}
            ></TextField>

            <br></br>
            <TextField id="login" label="Senha" required onChange={ (e)=>{
              setSenha(e.target.value)
            }} type="password" style={{ marginBottom: 10 }} value={senha}
            ></TextField>

            <input type='hidden' name = "id" value={id} />

            <br></br>

            <button
              type="submit"
              className="counter"
            >
              Salvar
            </button>

          </form>

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>{item.email}</td>
                  <td> <a href='#' onClick={ ()=>{
                      apagar(item.id);

                  } }> Excluir </a> </td>
                  <td> <a href='#'  onClick={ ()=>{
                    editar(item.id) 
                  }} > Editar </a>  </td>
                </tr>
              ))}
            </tbody>
          </table>


        </div>

      </div>

    </>
  )
}

export default User
