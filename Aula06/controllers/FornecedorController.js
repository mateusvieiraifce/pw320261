const Fornecedor = require("../models/Fornecedor")

exports.create = async (req,res)=>{
     
    const { nome, cnpj } = req.body;

    try {
        const existeFornecedor = await Fornecedor.findOne({ where: { cnpj: cnpj } });
        if (existeFornecedor) {
            return res.send({mg:"CNPJ já cadastrado"}, 400)
        }
        const fornecedor = await Fornecedor.create({ nome, cnpj });
        return res.send( {mg:"Fornecedor criado com sucesso", fornecedor}, 200)
    }catch(error) {
        console.log(error)
    }
    res.send( {mg:"error"}, 500)
}

exports.getAll = async (req, res)=>{
    
    try {
        const all = await Fornecedor.findAll();
        if (all == []) {
            return res.send( {mg:"Sem fornecedores"}, 400)
        }
        return res.send( {fornecedor: all}, 200)
    }catch(error) {
        console.log(error)
    }
    res.send( {mg:"error"}, 500)
}

exports.getById = async (req, res)=>{    
    try {
        const { id } = req.params
        const fornecedor = await Fornecedor.findByPk(id);
        if (!fornecedor) {
            return res.send({mg: "Fornecedor não encontrado"}, 404)
        }
        return res.send( {fornecedor}, 200)
    }catch(error) {
        console.log(error)
    }
    res.send( {mg:"error"}, 500)
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const fornecedor = await Fornecedor.findByPk(id);

        if (!fornecedor) {
            return res.status(404).send({mg: "Fornecedor não encontrado"}, 404)
        }
        await fornecedor.destroy();
        return res.send({mg: "Fornecedor deletado com sucesso"}, 204)
    }catch(error) {
        console.log(error)
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const fornecedor = await Fornecedor.findByPk(id);
        
        if (!fornecedor) {
            return res.status(404).send( {mg:"Fornecedor não encontrado"});
        }
        const { nome, cnpj } = req.body;
        const fornecedor_update = await fornecedor.update({ nome: nome, cnpj: cnpj }, { where: { id: id } });
        return res.send( {mg:"salvo com sucesso", fornecedor: fornecedor_update }, 200)
    }catch(error){
        res.status(404).send( {mg:error}, 404)
    }
}