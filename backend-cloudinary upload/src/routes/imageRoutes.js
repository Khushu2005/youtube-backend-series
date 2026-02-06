const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multer');
const { uploadToDb } = require('../controllers/image.controllers');


router.post('/upload-image', upload.single('file'), uploadToDb);

module.exports = router;