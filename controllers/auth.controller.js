const bcrypt = require('bcrypt');
const { Users } = require('../models/users.models');
const { validationResult } = require('express-validator');

exports.signup = async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role, firstname, lastname, phonenumber } = req.body;

     try {
    // Check if the user already exists
    const existingUser = await Users.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }


    const hashedPassword = (await bcrypt.hash(password, 10)).toString();


    const newUser = await Users.create({
      email,
      password: hashedPassword,
      role,
      firstname,
      lastname,
      phonenumber,
    });

    const userResponse = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      phonenumber: newUser.phonenumber,
    };

    return res.status(201).json(userResponse);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
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


    res.status(200).json({email:userExist.email, firstname:userExist.firstname, lastname: userExist.lastname, phonenumber: userExist.phonenumber, role: userExist.role })

    } catch (error){
        console.log(error)
        res.status(500).json({ error: 'Internal server error'})
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