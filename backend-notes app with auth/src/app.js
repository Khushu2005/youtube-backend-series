const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// routes export
const userRoutes = require("../src/routes/user.routes")
const noteRoute = require('../src/routes/note.routes')

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());

//frontend connection 
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

//routes
app.use('/api/auth',userRoutes)
app.use('/api/note',noteRoute)


module.exports = app;