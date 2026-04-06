const express = require('express')
const app = express();
const {DataTypes} = require('sequelize');
const {sequelize} = require('./config/index');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    console.log("ola muno")
    res.status(200).json({mg:"ola mundo aula o3"})
} )

const userController = require("./controllers/UsuarioController");
const tipoController = require("./controllers/TipoProdutoController");
const produtoController = require("./controllers/ProdutoController");
const fornecedorController = require("./controllers/FornecedorController")
const clienteController = require("./controllers/ClienteController")


app.post('/user/create', userController.create)
app.get("/user/all", userController.findAll);
app.get("/user/byid/:id", userController.findById)
app.get("/user/delete/:id", userController.delete)
app.post('/user/update/:id', userController.update )

//FORNECEDOR
app.post("/fornecedor/create", fornecedorController.create);
app.get("/fornecedor/all", fornecedorController.getAll);
app.get("/fornecedor/:id", fornecedorController.getById);
app.delete("/fornecedor/delete/:id", fornecedorController.delete);
app.put("/fornecedor/:id", fornecedorController.update);

app.post('/produto/create', produtoController.create)
app.get("/produto/all", ´produtoController.findAll)
app.get("/produto/byid/:id", produtoController.findById)
app.get("/produto/delete/:id",produtoController.delete)
app.post("/produto/update/:id", produtoController.upadate)

app.post('/cliente/create', clienteController.create);
app.get("/cliente/all",clienteController.findAll);
app.get("/cliente/byid/:id", clienteController.findById);
app.get("/cliente/delete/:id", clienteController.delete)
app.post('/cliente/update/:id', clienteController.update )

app.post('/tipoproduto/create',tipoController.create)
app.get("/tipoproduto/all",tipoController.findAll)
app.get("/tipoproduto/byid/:id",tipoController.findByid)
app.get("/tipoproduto/delete/:id", tipoController.delete)
app.post('/tipoproduto/update/:id', tipoController.update)

app.listen(3000,()=>{

   sequelize.sync().then( e =>{
    console.log("sincronizado com suesso")
   } ).catch( error =>{
      console.log("erro ao criar")
   })

    console.log("rodando na porta 3000")
})
