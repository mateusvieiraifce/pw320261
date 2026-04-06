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