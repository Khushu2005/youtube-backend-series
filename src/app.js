const express = require('express');
const cookieParser = require('cookie-parser');


const userRoutes = require("../src/routes/user.routes")


const app = express();


app.use(express.json());
app.use(cookieParser());
app.get('/dashboard', (req, res) => {
    res.json({
        message: "Welcome to Dashboard",
        secretData: "Oho bina login kre aagye ho !!", 
        user: "Admin Access Granted"
    });
});

app.use('/api/auth',userRoutes)
module.exports = app;