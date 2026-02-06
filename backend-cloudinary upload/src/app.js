const express = require('express');
const imageRoutes = require('./routes/imageRoutes')

const app = express();

app.use('/api', imageRoutes);

module.exports = app;