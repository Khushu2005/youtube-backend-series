const express = require('express');
const {createNote} = require('../controllers/notes.controllers')

const isAuthenticated = require('../middlewares/auth.middleware')

const router = express.Router();

//create notes

router.post('/create',isAuthenticated,createNote)


module.exports = router