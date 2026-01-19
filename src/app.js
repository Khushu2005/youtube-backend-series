const express = require('express');
const cookieParser = require('cookie-parser');

// routes export
const userRoutes = require("../src/routes/user.routes")
const noteRoute = require('../src/routes/note.routes')

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/auth',userRoutes)
app.use('/api/note',noteRoute)


module.exports = app;