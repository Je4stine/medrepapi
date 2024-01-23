const bcrypt = require('bcrypt');
const { Users } = require('../models/users.models');

exports.signup = async (req, res)=>{
    const { email, password, firstname, lastname, role, phonenumber} = req.body;
    try{
        const existUser = await Users.findOne({
            where: {email:email}
        })

        if(existUser){
           return res.status(409).json({message: "User with that email already exists in the System"})
        }

        const convertPwd = (await bcrypt.hash(password, 10)).toString();
        const addUser = await Users.create({
            email,
            password: convertPwd,
            firstname, lastname, role, phonenumber
        });

        res.json({message:'User added successfully'});

    } catch(error){
        console.log(error)
        res.status(500).json({message:'Internal server error'})
    }
};

exports.signin = async (req, res)=>{
    const { email, password} = req.body;

    try{
        const userExist = await Users.findOne({
            where: {
                email
            }
        });

    if(!userExist)
    {
        return res.status(401).json({error: "Invalid email address"})
    }
    console.log(userExist)

    const validPassword = bcrypt.compareSync(password, userExist.password);
    console.log(validPassword)

    if(!validPassword)
    {
        return res.status(401).json({error:"Invalid password"})
    }


    res.status(200).json({message : "Login success"})

    } catch (error){
        console.log(error)
        res.status(500).json({ message: 'Internal server error'})
    }
};


exports.reset = async (req, res)=>{
    const { email, password, newPassword} = req.body;
    try{
        
        const user = await Users.findOne({
            where:  { email: email },
        })

        if(!user){
            res.status(401).json({ message: 'User not found'})
        }

        const checkPassword = await bcrypt.compareSync( password, user.password);

        if(!checkPassword){
            res.status().json({ error: "Current password invalid"})
        };

        const hashPass = (await bcrypt.hash(newPassword,10)).toString();

        await Users.update({
            password: hashPass
        },
        {
            where: {id: user.id}
        });

        res.json({ message: 'Password changed successfully'})

    }catch(error)
    {
        res.status(500).json({message : "Internal server error"})
    }
}