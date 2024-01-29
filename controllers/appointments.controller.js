const {Appointments} = require('../models/associations');
const moments = require('moment');
const {Op,Sequelize} = require('sequelize')


exports.createAppointment = async(req, res)=>{
    try{
        const {userId, firstname, lastname, repid,appointmentDate, appointmentTime} = req.body

        const Appointment = await Appointments.create({
            userId, firstname, lastname, repid,appointmentDate, appointmentTime
        })

        return res.status(200).json({
            message: "Appointment created successfully!"
        })

    }
    catch (error){
        console.log(error)
        res.status(500).json({
            error: "Internal server error"
        })
    }
};

exports.getAppointments = async(req, res)=>{
    try{
        const { userId} = req.body;

        const today = new Date().toISOString().slice(0, 10);
        
        const getData = await Appointments.findAll({
            where:{
                userId,
                appointmentDate: {
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('DATE', Sequelize.col('appointmentDate')), today)
                    ]
                  },
            }
        });


        return res.status(200).json({
            data: getData
        })

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            error: "Internal Server Error",
        })
    }
};

exports.getRepAppointments = async(req, res)=>{
    try{
        const {repid} = req.body;
        const today = new Date().toISOString().slice(0, 10);
        
        const allRepAppointment = await Appointments.findAll({
            where:{
                repid,
                appointmentDate: {
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('DATE', Sequelize.col('appointmentDate')), today)
                    ]
                  },
            }
        });



        return res.status(200).json({
            appointments: allRepAppointment
        })

    }
    catch (error){
        console.log(error)
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
}