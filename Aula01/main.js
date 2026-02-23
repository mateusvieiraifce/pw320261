const express = require('express')
const app = express();

app.use(express.json())

app.get('/',(req,res)=>{
    console.log("ola muno")
    res.status(200).json({mg:"ola mundo"})
} )

app.post('/somar', (req,res)=>{
    const body = req.body;
    const result = body.a + body.b
    res.status(200).json({
        resultado: result
    })
})

app.post('/subtrair', (req,res)=>{
    const body = req.body;
    const result = body.a - body.b
    res.status(200).json({
        resultado: result
    })
})

app.post('/multiplicar', (req,res)=>{
    const body = req.body;
    const result = body.a * body.b
    res.status(200).json({
        resultado: result
    })
})


app.post('/dividir', (req,res)=>{
    const body = req.body;
    if (body.b == 0){
    res.status(200).json({
        resultado: "nao pode dividir por 0"
    })    
    }

    const result = body.a / body.b
    res.status(200).json({
        resultado: result
    })
})


app.listen(3000,()=>{
    console.log("rodando na porta 3000")
})