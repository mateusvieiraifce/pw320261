const TipoProduto = require("../models/TipoProduto");


exports.findAll = async (req, res)=>{
    const all = await TipoProduto.findAll();
    return res.send( {TipoProduto:all}, 200)
}

exports.findByid =  async (req, res)=>{

    const { id } = req.params

    const user = await TipoProduto.findByPk(id);

    if (!user) {
        return res.status(404).send( {mg:"Tipo produto não encontrado"}, 404)
    }

    return res.send( {TipoProduto:user}, 200)
}

exports.create = async (req,res)=>{
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
}

exports.delete = async (req, res)=>{

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
}

exports.update = async (req,res)=>{
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
} 