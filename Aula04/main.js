const express = require('express')
const path = require('path');
const app = express();
const Database = require('better-sqlite3');
const {Sequelize, DataTypes} = require('sequelize');
const { isPrimary } = require('cluster');

const sequelize = new Sequelize("pw3","root","", {
    host:"localhost",
    dialect:'mysql'
});

const Usuario = sequelize.define("Usuario",{
    id: { type: DataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true
        },
    nome:{ type:DataTypes.STRING(100),
            allowNull:false,
        },
    email:{ type:DataTypes.STRING(100),
            allowNull:false,
        },
    mensagem:{ type:DataTypes.STRING(100),
            allowNull:false,
        }
});

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

const Fornecedor = sequelize.define("Fornecedor", {
    id: { type: DataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true
        },
    nome:{ type:DataTypes.STRING(100),
            allowNull:false,
        },
    cnpj:{ type:DataTypes.STRING(100),
            allowNull:false,
        }
})

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


app.post('/user/create', async (req,res)=>{
    //console.log(nome);
    try {
        const { nome, email, mensagem} = req.body;
        const user = await Usuario.create({ nome:nome, email: email, 
        mensagem: mensagem})
    res.send( {mg:"salvo com sucesso", user:user}, 200)
    }catch(error){
        //console.log(error)
        res.send( {mg:error}, 404)
    }
    res.send( {mg:"error",}, 200)
} )

app.get("/user/all", async (req, res)=>{

    const all = await Usuario.findAll();
    return res.send( {usuarios:all}, 200)
})

app.get("/user/byid/:id", async (req, res)=>{

    const { id } = req.params

    const user = await Usuario.findByPk(id);

    if (!user) {
        return res.status(404).send( {mg:"usuario não encontrado"}, 404)
    }

    return res.send( {usuarios:user}, 200)
})

app.get("/user/delete/:id", async (req, res)=>{

    try {
        const { id } = req.params

        const user = await Usuario.findByPk(id);
        
        if (!user) {
            return res.status(404).send( {mg:"usuario não encontrado"}, 404)
        }
        await user.destroy();

    return res.send( {mg:"usuario deletado com sucesso"}, 204)}catch(error){
        return res.status(404).send( {mg:error}, 404)
    }
})


app.post('/user/update/:id', async (req,res)=>{
    //console.log(nome);
    try {
        const { id } = req.params;
        const userv = await Usuario.findByPk(id);
        
        if (!userv) {
            return res.status(404).send( {mg:"usuario não encontrado"});
        }
        const { nome, email, mensagem} = req.body;
        const user = await userv.update({ nome:nome, email: email, 
        mensagem: mensagem}, { where: { id: id } });
    res.send( {mg:"salvo com sucesso", user:user}, 200)
    }catch(error){
        //console.log(error)
        res.status(404).send( {mg:error}, 404)
    }
} )

//FORNECEDOR
app.post("/fornecedor/create", async (req,res)=>{
     
    const { nome, cnpj } = req.body;
    try {
    const fornecedor = await Fornecedor.create({ nome:nome, cnpj:cnpj})
    res.send( {mg:"chegou", fornecedor:fornecedor}, 200)
    }catch(error){
        console.log(error)
    }
    res.send( {mg:"error"}, 200)
} )

app.get("/fornecedor/all", async (req, res)=>{

    const all = await Fornecedor.findAll();
    return res.send( {fornecedor:all}, 200)
})

app.get("/fornecedor/all/:id", async (req, res)=>{

    const { id } = req.params

    const all = await Fornecedor.findByPk(id);
    return res.send( {fornecedor:all}, 200)
})

app.delete("/fornecedor/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const fornecedor = await Fornecedor.findByPk(id);

        if (!fornecedor) {
            return res.status(404).send({mg: "Fornecedor não encontrado"}, 404)
        }
        await fornecedor.destroy();
        return res.send({mg: "Fornecedor deletado com sucesso"}, 204)
    }catch(error) {}});



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

app.post("/fornecedor/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const fornecedor = await Fornecedor.findByPk(id);

        if (!fornecedor) {
            return res.status(404).send({mg: "Fornecedor não encontrado"}, 404)
        }

        const { nome, cnpj } = req.body;
        const fornecedor_update = await fornecedor.update(
            { nome: nome, cnpj: cnpj}, {where: { id: id}}
        );
        res.send({ mg: "Alterado com sucesso", fornecedor_update:fornecedor_update}, 200)
    }catch(error){
        res.status(404).send({mg:error}, 404)
    }}
);
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
