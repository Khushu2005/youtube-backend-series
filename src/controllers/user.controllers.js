const userModel = require('../models/user.model');
const bcrypt =require('bcrypt')

async function registerUser (req,res){

try {

// data from frontent 
const { username, email, password } = req.body;

        
// line 2 : validation
if (!username || !email || !password) {
return res.status(400).json({ message: "Cannot proceed with  Empty feilds" });
}


// line 3: check if user already exists
const userExists =await userModel.findOne({  email  });
if (userExists) {
 return res.status(400).json({ message: "User already Exists" });
        }

const hashedpassword = await bcrypt.hash(password, 10)


// line 4: create user
const user = await userModel.create({ username, email, password : hashedpassword});

     
// line 5: send response
res.status(201).json({
message: "User Registered Successfully!",
data: user
});

    } 
catch (error) {
        
res.status(500).json({ 
error: error.message});
}
};

async function loginUser (req,res){

try {
//fetching from frontend
const { email, password } = req.body;

// finding user with email
const user = await userModel.findOne({ email });

// if user not found return error
if (!user) {
 return res.status(400).json({ message: "No user found " });}

// comparing password
 const isPasswordMatched = await bcrypt.compare(password, user.password);
        
//  if password not matched return error
if (!isPasswordMatched) {
 return res.status(400).json({ message: "Invalid credentials " });}

//   if all ok send response
res.status(200).json({
message: "Login Successful ",
user: user });

 } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports={registerUser , loginUser}