const express = require('express')
const app = express();
const {DataTypes} = require('sequelize');
const {sequelize} = require('./config/index');
const Usuario = require('./models/Usuario');

const Produto = sequelize.define("Produto",{
    id: { type: DataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true
        },
    nome:{ type:DataTypes.STRING(100),
            allowNull:false,
        },
    preco:{ type:DataTypes.FLOAT,
            allowNull:false,
        },
    descricao:{ type:DataTypes.STRING(100),
            allowNull:false,
        }
});

const Cliente = sequelize.define("Cliente",{
    id: { type: DataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true
        },
    nome:{ type:DataTypes.STRING(100),
            allowNull:false,
        },
    endereco:{ type:DataTypes.STRING(100),
            allowNull:false,
        },
    telefone:{ type:DataTypes.STRING(20),
            allowNull:false,
        }
});

const TipoProduto = sequelize.define("TipoProduto",{
    id: { type: DataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true
        },
      
    descricao:{ type:DataTypes.STRING(100),
            allowNull:false,
        }
});


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    console.log("ola muno")
    res.status(200).json({mg:"ola mundo aula o3"})
} )

const userController = require("./controllers/UsuarioController");

app.post('/user/create', userController.create)
app.get("/user/all", userController.findAll);
app.get("/user/byid/:id", userController.findById)
app.get("/user/delete/:id", userController.delete)
app.post('/user/update/:id', userController.update )

//FORNECEDOR
const fornecedorController = require("./controllers/FornecedorController")

app.post("/fornecedor/create", fornecedorController.create);
app.get("/fornecedor/all", fornecedorController.getAll);
app.get("/fornecedor/:id", fornecedorController.getById);
app.delete("/fornecedor/delete/:id", fornecedorController.delete);
app.put("/fornecedor/:id", fornecedorController.update);

app.post('/produto/create', async (req,res)=>{
    //console.log(nome)
    try {
        const {nome, preco, descricao} = req.body;
        const produto = await Produto.create({nome:nome, preco:preco, descricao:descricao})
    res.send( {mg:"salvo com sucesso", produto:produto}, 200)
    }catch(error){
        console.log(error)
        res.send( {mg:error}, 404)
    }
   // res.send( {mg:"error",}, 200)
})

app.get("/produto/all", async (req,res)=>{

    const all = await Produto.findAll();
    return res.send( {produtos:all}, 200)
    
})

app.get("/produto/byid/:id", async (req,res)=>{

    const { id } = req.params

    const produto = await Produto.findByPk(id);

    if (!produto) {
        return res.status(404).send( {mg:"produto não encontrado"}, 404)
    }

    return res.send( {produtos:produto}, 200)
})

app.get("/produto/delete/:id", async (req,res)=>{
    
    try {
        const { id } = req.params

        const produto = await Produto.findByPk(id);

        if (!produto) {
        return res.status(404).send( {mg:"produto não encontrado"}, 404)
        }
        await produto.destroy();
    
    return res.send( {mg:"produto deletado com sucesso"}, 204)}catch(error){
        return res.status(404).send( {mg:error}, 404)
    }
})
app.post("/produto/update/:id", async (req,res)=>{
    //console.log(nome);
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);

        if (!produto) {
            return res.status(404).send( {mg:"produto não encontrado"});
        }
        const { nome, preco, descricao} = req.body;
        const pd = await produto.update({nome:nome, preco:preco, descricao:descricao},{ where: {id:id} });
    res.send( {mg:"salvo com sucesso", produto:produto}, 200)
    }catch(error){
        console.log(error)
        res.status(404).send( {mg:error}, 404)
    }   
})

app.post('/cliente/create', async (req, res) => {
    try {
        const { nome, endereco, telefone } = req.body;

        const user = await Cliente.create({
            nome,
            endereco,
            telefone
        });

        return res.status(201).send({
            msg: "cliente criado com sucesso",
            user
        });

    } catch (error) {
        return res.status(500).send({
            msg: "erro interno",
            error: error.message
        });
    }
});

app.get("/cliente/all", async (req, res)=>{

    const all = await Cliente.findAll();
    return res.send( {clientes:all}, 200)
});

app.get("/cliente/byid/:id", async (req, res)=>{

    const { id } = req.params

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
        return res.status(404).send( {mg:"cliente não encontrado"}, 404)
    }

    return res.send( {clientes:cliente}, 200)
})

app.get("/cliente/delete/:id", async (req, res)=>{

    try {
        const { id } = req.params

        const cliente = await Cliente.findByPk(id);
        
        if (!cliente) {
            return res.status(404).send( {mg:"cliente não encontrado"}, 404)
        }
        await cliente.destroy();

    return res.send( {mg:"cliente deletado com sucesso"}, 204)}catch(error){
        return res.status(404).send( {mg:error}, 404)
    }
})

app.post('/cliente/update/:id', async (req,res)=>{
    //console.log(nome);
    try {
        const { id } = req.params;
        const clientev = await Cliente.findByPk(id);
        
        if (!clientev) {
            return res.status(404).send( {mg:"cliente não encontrado"});
        }
        const { nome, endereco, telefone} = req.body;
        const cliente = await clientev.update({ nome:nome, endereco:endereco, telefone:telefone}, 
        { where: { id: id } });
    res.send( {mg:"salvo com sucesso", cliente:cliente}, 200)
    }catch(error){
        //console.log(error)
        res.status(404).send( {mg:error}, 404)
    }
} )

app.post('/tipoproduto/create', async (req,res)=>{
    //console.log(nome);
    try {
        const { descricao} = req.body;
        const user = await TipoProduto.create({ descricao:descricao
        })
    res.send( {mg:"salvo com sucesso", TipoProduto:user}, 200)
    }catch(error){
        //console.log(error)
        res.send( {mg:error}, 404)
    }
    res.send( {mg:"error",}, 200)
} )

app.get("/tipoproduto/all", async (req, res)=>{

    const all = await TipoProduto.findAll();
    return res.send( {TipoProduto:all}, 200)
})
app.get("/tipoproduto/byid/:id", async (req, res)=>{

    const { id } = req.params

    const user = await TipoProduto.findByPk(id);

    if (!user) {
        return res.status(404).send( {mg:"usuario não encontrado"}, 404)
    }

    return res.send( {TipoProduto:user}, 200)
})

app.get("/tipoproduto/delete/:id", async (req, res)=>{

    try {
        const { id } = req.params

        const user = await TipoProduto.findByPk(id);
        
        if (!user) {
            return res.status(404).send( {mg:"produto não encontrado"}, 404)
        }
        await user.destroy();

    return res.send( {mg:"usuario deletado com sucesso"}, 204)}catch(error){
        return res.status(404).send( {mg:error}, 404)
    }
})

app.post('/tipoproduto/update/:id', async (req,res)=>{
    //console.log(nome);
    try {
        const { id } = req.params;
        const userv = await TipoProduto.findByPk(id);
        
        if (!userv) {
            return res.status(404).send( {mg:"tipo  não encontrado"});
        }
        const { descricao } = req.body;
        const user = await userv.update({ descricao}, { where: { id: id } });
    res.send( {mg:"salvo com sucesso", user:user}, 200)
    }catch(error){
        //console.log(error)
        res.status(404).send( {mg:error}, 404)
    }
} )

app.listen(3000,()=>{

   sequelize.sync().then( e =>{
    console.log("sincronizado com suesso")
   } ).catch( error =>{
      console.log("erro ao criar")
   })

    console.log("rodando na porta 3000")
})
