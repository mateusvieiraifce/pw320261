const express = require('express')
const path = require('path');
const app = express();
const Database = require('better-sqlite3');
const {Sequelize, DataTypes} = require('sequelize');
const { isPrimary } = require('cluster');

const sequelize = new Sequelize("pw3","root","root", {
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

app.listen(3000,()=>{

   sequelize.sync().then( e =>{
    console.log("sincronizado com suesso")
   } ).catch( error =>{
      console.log("erro ao criar")
   })

    console.log("rodando na porta 3000")
})