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
            model: 'users', // 'users' table
            key: 'id' // primary key 'id' of 'users' table
        }
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