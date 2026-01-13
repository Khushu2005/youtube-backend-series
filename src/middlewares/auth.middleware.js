
const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
    
    try {
// Step 1: Check if token exists in cookies 
const token = req.cookies.token;

if (!token) {
return res.status(401).json({ 
success: false,
 message: "Login to Access"  });
        }


// Step 2: Verify the token (Is it real or fake?)
const decoded = jwt.verify(token, process.env.JWT_SECRET);


// Step 3: Save user info for future use
req.user = decoded;


// Step 4: yaha p hum access dete hai us bnde ko jiske pass token hoga 
next(); 

} catch (error) {
res.status(401).json({ 
success: false,
message: "Invalid Token or Session Expired " 
        });
    }
};

module.exports = isAuthenticated;









