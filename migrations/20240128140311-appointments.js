'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // 'users' table
            key: 'id' 
        },
        field: 'UserId'
    },
    firstname:
    {
        type: Sequelize.STRING(200)
    },
    lastname:
    {
        type: Sequelize.STRING(200)
    },
    repid:
    {
        type: Sequelize.INTEGER
    },
    status:{
        type: Sequelize.STRING(100)
    },
    
    appointmentDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    appointmentTime: {
        type: Sequelize.TIME,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

    })
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('appointments');
  }
};
