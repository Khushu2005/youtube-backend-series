const express = require('express');
const isAuthenticated = require('../middlewares/auth.middleware')

const {registerUser,loginUser ,logoutUser , getUserProfile,updateProfile}=require('../controllers/user.controllers')

const router = express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post('/logout',logoutUser)
router.get('/profile',isAuthenticated,getUserProfile)

router.put('/update',isAuthenticated,updateProfile)




module.exports = router;