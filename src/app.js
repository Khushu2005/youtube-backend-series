const express = require('express');

const userRoutes = require("../src/routes/user.routes")


const app = express();

app.use('/api/auth',userRoutes)
module.exports = app;