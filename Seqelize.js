const { Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres', 
    host: 'localhost', 
    port: 5432, 
    username: 'postgres', 
    password: 'admin1234', 
    database: 'medrep',
});

try {
    sequelize.authenticate();
    console.log('Connection successful')
} catch(error){
    console.error('Unable to connect to database', error);
}

module.exports = {sequelize};