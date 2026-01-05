const usermodel = require('../models/user.model');

async function registerUser (req,res){

    res.status(201).json({
        message: "First api working"
    })
}

module.exports={
    registerUser
}