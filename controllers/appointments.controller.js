const {Appointments} = require('../models/associations');


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
        const { userId} = req.body
        
        const getData = await Appointments.findAll({
            where:{
                userId
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

        const allRepAppointment = await Appointments.findAll({
            where:{
                repid
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