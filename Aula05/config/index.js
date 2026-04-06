const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("pw3","root","", {
    host:"localhost",
    dialect:'mysql'
});

module.exports = {
    sequelize,
}