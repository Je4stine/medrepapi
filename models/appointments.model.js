const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize} = require('../Seqelize');



class Appointments extends Model{}

Appointments.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id' 
        },
        field: 'UserId'
    },
    firstname:
    {
        type: DataTypes.STRING(200)
    },
    lastname:
    {
        type: DataTypes.STRING(200)
    },
    repid:
    {
        type: DataTypes.INTEGER
    },
    status:{
        type: DataTypes.STRING(100),
        defaultValue: 'pending'
    },
    
    appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    appointmentTime: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    tableName: "appointments",
    sequelize

});

const { Users } = require('./users.models');
Appointments.belongsTo(Users)


module.exports = {Appointments}