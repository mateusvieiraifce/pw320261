const express = require('express')
const path = require('path');
const app = express();
const Database = require('better-sqlite3');

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

app.listen(3000,()=>{

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