const express = require('express');
const {
    createNote, 
    getNotes,
    deleteNote,
    updateNote

} = require('../controllers/notes.controllers')

const isAuthenticated = require('../middlewares/auth.middleware')

const router = express.Router();

//create notes

router.post('/create',isAuthenticated,createNote)

//get notes
router.get('/get-all-notes',isAuthenticated,getNotes)

//delete notes 
router.delete('/delete/:id',isAuthenticated,deleteNote)

//update 
router.put('/update/:id',isAuthenticated,updateNote)




module.exports = router