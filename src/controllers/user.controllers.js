const userModel = require('../models/user.model');

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


// line 4: create user
const user = await userModel.create({ username, email, password });

     
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

module.exports={registerUser}