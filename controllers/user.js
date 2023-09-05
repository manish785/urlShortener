const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const {setUser} = require('../service/auth');


module.exports.handleUserSignUp = async function(req, res){
    const {name, email, password, confirm_password} = req.body;
     
    if(password != confirm_password){
        return res.status(400).json({
            messsage: 'Password and Confirm Password is not matching'
        })
    }

    const user = await User.findOne({ email });
    if(user){
        return res.status(422).json({
            message : 'User already exists'
        })
    }
    else{
        await User.create({
            name,
            email,
            password
        });
        return res.status(201).json({
            message : 'User created successfully',
        })}
}



module.exports.handleUserLogin = async function(req, res){
    const { email, password } = req.body;
     
    const user = await User.findOne({ email, password });
    if(!user || !password){
        return res.status(422).json({
            message : 'Wrong Credentials'
        })
    }
    else{
        const token = setUser(user);
        res.cookie('uid', token);
        return res.status(201).json({
                    message : 'User Login  successfully',
        })
}
    // else{

    //     return res.status(201).json({
    //         message : 'User Login  successfully',
    //     })}
}