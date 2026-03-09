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



app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    console.log("ola muno")
    res.status(200).json({mg:"ola mundo aula o3"})
} )

app.get('/formulario', (req,res)=>{
    console.log("ola muno")
    res.sendFile(path.join(__dirname, '/templates/index.html'));
    //res.status(200).json({mg:"ola mundo aula o3"})
})

app.post('/formulario', (req,res)=>{

    const { nome, email, mensagem } = req.body;

    if (nome.trim() === '' || email.trim() === '' || mensagem.trim() === '') {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    if (nome.length > 50) {
        return res.status(400).json({ error: 'O nome deve ter no máximo 50 caracteres.' });
    }

    if (email.length > 50) {
        return res.status(400).json({ error: 'O email deve ter no máximo 50 caracteres.' });
    }

    if (mensagem.length > 500) {
        return res.status(400).json({ error: 'A mensagem deve ter no máximo 500 caracteres.' });
    }

    const db = new Database('formulario.db');
    console.log(`Nome: ${nome}, Email: ${email}, Mensagem: ${mensagem}`);
    db.prepare(`
        INSERT INTO mensagens (nome, email, mensagem)
        VALUES (?, ?, ?)
    `).run(nome, email, mensagem);
    res.sendFile(path.join(__dirname, '/templates/index.html'));
    //res.status(200).json({mg:"ola mundo aula o3"})
})


app.post('/user/create', async (req,res)=>{
     
    const { nome, email, mensagem} = req.body;
    //console.log(nome);
    try {
    const user = await Usuario.create({ nome:nome, email: email, 
        mensagem: mensagem})
    res.send( {mg:"chegou", user:user}, 200)
    }catch(error){
        console.log(error)
    }
    res.send( {mg:"error",}, 200)
} )

app.get("/user/all", async (req, res)=>{

    const all = await Usuario.findAll();
    return res.send( {usuarios:all}, 200)
})

app.get("/user/all/:id", async (req, res)=>{

    const { id } = req.params

    const all = await Usuario.findByPk(id);
    return res.send( {usuarios:all}, 200)
})

app.listen(3000,()=>{

   sequelize.sync().then( e =>{
    console.log("sincronizado com suesso")
   } ).catch( error =>{
      console.log("erro ao criar")
   })

    const db = new Database('formulario.db');

    db.prepare(`
        CREATE TABLE IF NOT EXISTS mensagens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            mensagem TEXT NOT NULL
        )
    `).run();

    console.log("rodando na porta 3000")
})