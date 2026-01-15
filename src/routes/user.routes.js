const express = require('express');
const isAuthenticated = require('../middlewares/auth.middleware')

const {registerUser,loginUser ,logoutUser , getUserProfile}=require('../controllers/user.controllers')

const router = express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get('/logout',logoutUser)
router.get('/profile',isAuthenticated,getUserProfile)





module.exports = router;