const {Users} = require('./users.models');
const {Availability} = require('./availability.models')
const {Appointments} = require('./appointments.model')

Users.hasMany(Availability)
Users.hasMany(Appointments, { foreignKey: 'userId' })
Availability.belongsTo(Users)

Users.hasMany(Appointments, { foreignKey: 'repid', as: 'RepAppointments' });
Appointments.belongsTo(Users, { foreignKey: 'repid', as: 'Rep' });

module.exports ={Users, Appointments, Availability}