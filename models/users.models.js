const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize} = require('../Seqelize');

class Users extends Model{}

Users.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    role:{
        type: DataTypes.STRING(50)
    },
    firstname:{
        type: DataTypes.STRING(100)
    },
    lastname:{
        type: DataTypes.STRING(100)
    },
    phonenumber:{
        type: DataTypes.STRING(100)
    }
},
{
    tableName:"users",
    sequelize
});

module.exports = { Users };