const {Appointments, Users} = require('../models/associations');
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
            },
            include: [{
                model: Users,
                as: 'Rep',
                attributes: ['id', 'firstname', 'lastname'] // Include only necessary rep details
            }]
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
                  }
            }
            ,
                  include: [{
                    model: Users,
                    attributes: ['firstname', 'lastname'] 
                }]
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

exports.complete = async(req, res)=>{
    try{
        const {id} = req.body;
        const completeAppointment = await Appointments.findByPk(id);

        if(!completeAppointment){
            return res.status(404).json({
                error: "Appointment not found"
            })
        }

        await completeAppointment.update({status:'compelete'});

        return res.status(200).json({
            message: "Appointment completed"
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            error:'Internal Server Error'
        })
    }
}


exports.reschedule = async(req, res)=>{
    try{
        const {id, newDate} = req.body;
        const rescheduleAppointment = await Appointments.findByPk(id);

        if(!rescheduleAppointment){
            return req.status(404).json({
                error: "Appointment not found"
            })
        }

        await rescheduleAppointment.update({status:"rescheduled", appointmentDate: newDate})
        return res.status(200).json({
            message: "Appointment Rescheduled!"
        })


    }catch(error){
        console.log(error)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

exports.getReschedules = async(req, res)=>{
    try{
        const { userId} = req.body

        const findRes = await Appointments.findAll({
            where:{
                userId,
                status:"rescheduled"
            }
        });

        return res.status(200).json({
            findRes
        })

    }catch(error){
        console.log(error)
    }
}


// Consultant overdues
exports.getoverdues = async(req, res)=>{
    try{
        const {userId} = req.body
        const ovedues = await Appointments.findAll({
            where:{
                userId,
                status: 'overdue'
            }
        });

        return res.status(200).json({
            ovedues
        })

    } catch (error){
        console.log(error)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}