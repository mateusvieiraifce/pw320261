const {DataTypes} = require('sequelize');

const {sequelize} = require('../config/index');

const Usuario = sequelize.define("Usuario",{
    id: { type: DataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true
        },
    nome:{ type:DataTypes.STRING(100),
            allowNull:false,
        },
    email:{ type:DataTypes.STRING(100),
            allowNull:false,
        },
    mensagem:{ type:DataTypes.STRING(100),
            allowNull:false,
        }
});

module.exports = Usuario;