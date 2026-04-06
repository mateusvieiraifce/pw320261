const {sequelize} = require('../config/index');
const {DataTypes} = require('sequelize');

const TipoProduto = sequelize.define("TipoProduto",{
    id: { type: DataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true
        },
      
    descricao:{ type:DataTypes.STRING(100),
            allowNull:false,
        }
});

module.exports = TipoProduto;
