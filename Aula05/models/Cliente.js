const {DataTypes} = require('sequelize');

const {sequelize} = require('../config/index');

const Cliente = sequelize.define("Cliente",{
    id: { type: DataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true
        },
    nome:{ type:DataTypes.STRING(100),
            allowNull:false,
        },
    endereco:{ type:DataTypes.STRING(100),
            allowNull:false,
        },
    telefone:{ type:DataTypes.STRING(20),
            allowNull:false,
        }
});

module.exports = Cliente;