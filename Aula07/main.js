const express = require('express')
const app = express();
const {DataTypes} = require('sequelize');
const {sequelize} = require('./config/index');
const jwt = require('jsonwebtoken')
const brcypt = require('bcrypt')
const SECRET = "pw32026"

const cors = require('cors')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Seu frontend
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
   res.header('Access-Control-Allow-Headers', 'Content-Type, ngrok-skip-browser-warning');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.options(/.*/, cors());
//app.options('', cors());
//app.options('*', cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

function verificaToken(req, res, next){
    const header = req.headers.authorization;
    
    if (!header){
        res.status(401).json({ms:"nao tem token"})
    } 

    const parte = header.split(' ');

    if (parte.length != 2 || parte[0]!=='Bearer'){
        res.status(401).json({ms:"formato invalio do token"})
    }

    const token = parte[1];
    console.log(token);
    try {
        const dados = jwt.verify(token, SECRET);
        req.usuario  = dados;
        next()
    }catch{
        res.status(401).json({ms:"Token invalido ou expirado"})
    }

}


app.get('/', verificaToken ,(req,res)=>{
    console.log("ola muno")
    res.status(200).json({mg:"ola mundo aula o3"})
} )

const userController = require("./controllers/UsuarioController");
const tipoController = require("./controllers/TipoProdutoController");
const produtoController = require("./controllers/ProdutoController");
const fornecedorController = require("./controllers/FornecedorController")
const clienteController = require("./controllers/ClienteController")


app.post('/v1/usuario/login', userController.login)
app.post('/v1/usuario/create', userController.create)
app.get("/v1/usuario/all",  userController.findAll);
app.get("/v1/usuario/byid/:id", userController.findById)
app.delete("/v1/usuario/delete/:id", userController.delete)
app.put('/v1/usuario/update/:id', userController.update )
app.post('/v1/usuario/findbyparam', userController.findByParm)


//FORNECEDOR
app.post("/v1/fornecedor/create", fornecedorController.create);
app.get("/v1/fornecedor/all", fornecedorController.getAll);
app.get("/v1/fornecedor/:id", fornecedorController.getById);
app.delete("/v1/fornecedor/delete/:id", fornecedorController.delete);
app.put("/v1/fornecedor/:id", fornecedorController.update);

app.post('/v1/produto/create', produtoController.create)
app.get("/v1/produto/all", produtoController.findAll)
app.get("/v1/produto/byid/:id", produtoController.findById)
app.get("/v1/produto/delete/:id",produtoController.delete)
app.post("/v1/produto/update/:id", produtoController.upadate)

app.post('/v1/cliente/create', clienteController.create);
app.get("/v1/cliente/all",clienteController.findAll);
app.get("/v1/cliente/byid/:id", clienteController.findById);
app.get("/v1/cliente/delete/:id", clienteController.delete)
app.post('/v1/cliente/update/:id', clienteController.update )

app.post('/v1/tipoproduto/create',tipoController.create)
app.get("/v1/tipoproduto/all",tipoController.findAll)
app.get("/v1/tipoproduto/byid/:id",tipoController.findByid)
app.get("/v1/tipoproduto/delete/:id", tipoController.delete)
app.post('/v1/tipoproduto/update/:id', tipoController.update)

app.listen(3000,()=>{

   sequelize.sync().then( e =>{
    console.log("sincronizado com suesso")
   } ).catch( error =>{
      console.log("erro ao criar")
   })

    console.log("rodando na porta 3000")
})
