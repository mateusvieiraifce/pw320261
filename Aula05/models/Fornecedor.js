const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/index');

const Fornecedor = sequelize.define("Fornecedor", {
    id: { type: DataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true
        },
    nome:{ type:DataTypes.STRING(100),
            allowNull:false,
        },
    cnpj:{ type:DataTypes.STRING(100),
            allowNull:false,
            unique:true
        }
})

module.exports = Fornecedor;