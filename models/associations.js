const {Users} = require('./users.models');
const {Availability} = require('./availability.models')
const {Appointments} = require('./appointments.model')

Users.hasMany(Availability)
Users.hasMany(Appointments)
Availability.belongsTo(Users)

module.exports ={Users, Appointments, Availability}