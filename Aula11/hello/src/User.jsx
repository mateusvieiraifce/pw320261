import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Alert, Icon, IconButton, TextField } from '@mui/material'
import DeleteIcon  from '@mui/icons-material/Delete';
import EditIcon  from '@mui/icons-material/Edit';
import SaveIcon  from '@mui/icons-material/Save';
import './App.css'
import './Dash.css'
import { Form, Link } from 'react-router'
import Menu from './Menu'
import { useEffect } from 'react'
import api from './service/api'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function User(setUser) {

 
  const handleChange = (event, value) => {
    setPage(value);
    
  };

  const [list, setList] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [id, setId] = useState(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)



  async function loadUser() {
    const filter = {
      page: page,
      nome: name,
      email: email
    }

    const result = await api.post("/usuario/findbyparam",filter).then(
      (res) => {
        setList(res.data.usuarios)
        setTotal(res.data.total)
        console.log(res.data.usuarios);

      }
    )

  }

  useEffect(() => {
    loadUser();
  }, [page])

  const saveUser = async (event) => {
    event.preventDefault();
    const user = {
      nome: name,
      email: email,
      senha: senha,
      mensagem: "vazlio"
    };
    console.log(user);

    let url = "/usuario/create"
    if (id == null) {
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

      api.put("usuario/update/" + id, JSON.stringify(user)).then(
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

    if (confirm("Deseja realmente excluir?")) {

      api.delete("usuario/delete/" + id).then((repo) => {
        loadUser();
        alert("Item Apagado com suceso")
      }).catch((error) => {

        console.log(error)
        alert("Erro ao apagar!!")
      })
      //  alert(id);
    }

  }

  async function editar(id) {

    api.get("usuario/byid/" + id).then((rest) => {
      const usera = rest.data.usuarios;
      console.log(usera)
      setEmail(usera.email)
      setName(usera.nome)
      setSenha(usera.senha)
      setId(usera.id)


    }).catch((error) => {


    })

    //alert(id)

  }

  return (
    <>
      <div className='top' style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Menu page={"Users"} />
        <div className='layout' style={{ display: 'flex', flexDirection: 'column', width: '90%', marginRight: '20px', marginLeft: '20px', marginBottom: '20px' }}>
          <h1>Usuários</h1>

          <Box sx={{ height: 280, width: '98%', border: '1px solid black', padding: 2, marginRight:40 }}>

            <form onSubmit={saveUser}>
              <TextField id="login" label="Email" onChange={(e) => {
                setEmail(e.target.value)
              }} required type="email" style={{ marginBottom: 10 }}
                value={email} ></TextField>
              <br></br>
              <TextField id="login" label="Nome" onChange={(e) => {
                setName(e.target.value)
              }} required type="text" style={{ marginBottom: 10 }} value={name}
              ></TextField>

              <br></br>
              <TextField id="login" label="Senha" required onChange={(e) => {
                setSenha(e.target.value)
              }} type="password" style={{ marginBottom: 10 }} value={senha}
              ></TextField>

              <input type='hidden' name="id" value={id} />

              <br></br>

              <button
                type="submit"
                className="counter"
              >
                Salvar
                <IconButton aria-label="delete" size="small">
                  <SaveIcon />
                </IconButton>
              </button>

            </form>
          </Box>
          <Box sx={{ width: '100%', border: '1px solid black', marginTop: 2 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.nome}
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="delete" size="small" onClick={() => apagar(row.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="delete" size="small" onClick={() => editar(row.id)}>
                          <EditIcon />
                        </IconButton>

                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Pagination count={Math.ceil(total/5)} onChange={handleChange}/>


        </div>

      </div>

    </>
  )
}

export default User
