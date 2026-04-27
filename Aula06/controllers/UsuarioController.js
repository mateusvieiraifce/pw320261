const { where, Op } = require("sequelize");
const Usuario = require("../models/Usuario");

exports.findAll = async (req, res) => {
    try {
        const all = await Usuario.findAll();
        return res.send({ usuarios: all }, 200)
    } catch (error) {
        return res.status(400).send({ mg: "Erro no banco de dados" }, 400)
    }
}

exports.findByParm = async (req, res) => {

    try {
        const { nome, email, page } = req.body;
        const limit = 5;
        const where = {};
        if (nome) {
            where.nome = {
                [Op.like]: `%${nome}%`
            }
        }
        if (email) {
            where.email = {
                [Op.like]: `%${email}%`
            }
        }
        const offset = (page - 1) * limit;

        const all = await Usuario.findAll({
            where: where,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
        return res.send({ usuarios: all }, 200)
    } catch (error) {
        console.log(error)
        return res.status(400).send({ mg: "Erro no banco de dados" }, 400)
    }
}

exports.findById = async (req, res) => {

    const { id } = req.params

    const user = await Usuario.findByPk(id);

    if (!user) {
        return res.status(404).send({ mg: "usuario não encontrado" }, 404)
    }

    return res.send({ usuarios: user }, 200)
}

exports.delete = async (req, res) => {

    try {
        const { id } = req.params

        const user = await Usuario.findByPk(id);

        if (!user) {
            return res.status(404).send({ mg: "usuario não encontrado" }, 404)
        }
        await user.destroy();

        return res.send({ mg: "usuario deletado com sucesso" }, 204)
    } catch (error) {
        return res.status(404).send({ mg: error }, 404)
    }
}

exports.create = async (req, res) => {
    try {
        const { nome, email, mensagem } = req.body;

        if (!nome || !email || !mensagem) {
            return res.status(400).send({ mg: "dados incompletos" }, 400)
        }
        const user = await Usuario.create({
            nome: nome, email: email,
            mensagem: mensagem
        })
        res.send({ mg: "salvo com sucesso", user: user }, 201)
    } catch (error) {
        //console.log(error)
        res.send({ mg: error }, 404)
    }
    res.send({ mg: "error", }, 200)
}


exports.update = async (req, res) => {
    //console.log(nome);
    try {
        const { id } = req.params;
        const userv = await Usuario.findByPk(id);

        if (!userv) {
            return res.status(404).send({ mg: "usuario não encontrado" });
        }
        const { nome, email, mensagem } = req.body;

        if (!nome || !email || !mensagem) {
            return res.status(400).send({ mg: "dados incompletos" }, 400)
        }

        const user = await userv.update({
            nome: nome, email: email,
            mensagem: mensagem
        }, { where: { id: id } });
        res.send({ mg: "salvo com sucesso", user: user }, 200)
    } catch (error) {
        //console.log(error)
        res.status(404).send({ mg: error }, 404)
    }
}