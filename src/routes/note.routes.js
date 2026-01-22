const express = require('express');
const {createNote, getNotes,deleteNote} = require('../controllers/notes.controllers')

const isAuthenticated = require('../middlewares/auth.middleware')

const router = express.Router();

//create notes

router.post('/create',isAuthenticated,createNote)
router.get('/get-all-notes',isAuthenticated,getNotes)


router.delete('/delete/:id',isAuthenticated,deleteNote)


module.exports = router