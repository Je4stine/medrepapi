const {Availability, Users} = require('../models/associations')

exports.createAvailability = async(req, res)=>{
    
    try{
        const { userId , startTime, endTime} = req.body;

        const user = await Users.findByPk(userId);
        if (!user || user.role !== 'consultant') {
            return res.status(403).json({ error: 'Only consultants can create availability' });
        }

        console.log(user)
        const availability = await Availability.create({
            userId, startTime, endTime

        })

        console.log(availability)

        return res.status(201).json({
            message: 'Availability created'
        })


    }
    catch (error){
        console.log(error)
        res.status(500).json({
            error:'Internal server error'
        })
    }
}

exports.getVailabiltyByPk = async(req, res)=>{
    const {userId} = req.body
    try{
        const idAvailability = await Availability.findAll({
            where:{
                userId
            }
        })

        return res.status(200).json({idAvailability});

    }
    catch (error){
        console.log(error)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
};

exports.getAll = async(req, res)=>{
    try{
        const allAvailabilities = await Availability.findAll()
        return res.status(200).json({allAvailabilities})

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            error:"Internal server error"
        })
    }
}