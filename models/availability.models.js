const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize} = require('../Seqelize');


class Availability extends Model{}

Availability.init({
    id:{
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
    startTime:{
        type: DataTypes.DATE
    },
    endTime:{
        type: DataTypes.DATE
    }
    
},
{
    tableName:"availability",
    sequelize
});





module.exports = { Availability };