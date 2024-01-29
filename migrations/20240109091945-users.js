'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING(100),
        allowNull: false
    },
    password:{
        type: Sequelize.STRING(100),
        allowNull: false
    },
    role:{
        type: Sequelize.STRING(50)
    },
    firstname:{
        type: Sequelize.STRING(100)
    },
    lastname:{
        type: Sequelize.STRING(100)
    },
    phonenumber:{
        type: Sequelize.STRING(100)
    },
    paymentstatus:{
        type: Sequelize.STRING(100)
    },
    amount:{
        type: Sequelize.INTEGER
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
    });
  },

  async down (queryInterface, Sequelize) {
  
    // await queryInterface.dropTable('users');
   
  }
};
