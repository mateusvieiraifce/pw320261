const Produto = require("../models/Produto");

exports.findAll = async (req, res)=>{
    const all = await Produto.findAll();
    return res.send( {produto:all}, 200)
}

exports.findById = async (req,res)=>{

    const { id } = req.params

    const produto = await Produto.findByPk(id);

    if (!produto) {
        return res.status(404).send( {mg:"produto não encontrado"}, 404)
    }

    return res.send( {produtos:produto}, 200)
}

exports.create  =   async (req,res)=>{
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
}

exports.delete =  async (req,res)=>{
    
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
}

exports.upadate = async (req,res)=>{
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
}