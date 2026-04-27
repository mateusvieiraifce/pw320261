const Cliente = require("../models/Cliente");

exports.findAll = async (req, res)=>{
    const all = await Cliente.findAll();
    return res.send( {clientes:all}, 200)
}

exports.findById = async (req, res)=>{

    const { id } = req.params

    const user = await Cliente.findByPk(id);

    if (!user) {
        return res.status(404).send( {mg:"cliente não encontrado"}, 404)
    }

    return res.send( {clientes:user}, 200)
}

exports.delete = async (req, res)=>{

    try {
        const { id } = req.params

        const user = await Cliente.findByPk(id);
        
        if (!user) {
            return res.status(404).send( {mg:"ciente não encontrado"}, 404)
        }
        await user.destroy();

    return res.send( {mg:"cliente deletado com sucesso"}, 204)}catch(error){
        return res.status(404).send( {mg:error}, 404)
    }
}

exports.create = async (req,res)=>{
    //console.log(nome);
    try {
        const { nome, endereco, telefone} = req.body;
        const user = await Cliente.create({ nome:nome, endereco: endereco, 
        telefone: telefone})
    res.send( {mg:"salvo com sucesso", user:user}, 200)
    }catch(error){
        //console.log(error)
        res.send( {mg:error}, 404)
    }
    res.send( {mg:"error",}, 200)
} 


exports.update = async (req,res)=>{
    //console.log(nome);
    try {
        const { id } = req.params;
        const userv = await Cliente.findByPk(id);
        
        if (!userv) {
            return res.status(404).send( {mg:"cliente não encontrado"});
        }
        const { nome, endereco, telefone} = req.body;
        const user = await userv.update({ nome:nome, endereco: endereco, 
        telefone: telefone}, { where: { id: id } });
    res.send( {mg:"salvo com sucesso", user:user}, 200)
    }catch(error){
        //console.log(error)
        res.status(404).send( {mg:error}, 404)
    }
}

