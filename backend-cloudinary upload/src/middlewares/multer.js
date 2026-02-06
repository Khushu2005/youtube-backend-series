const cloudinary = require('cloudinary').v2;
const CloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage;
const multer = require('multer');

// Configuration
cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage Engine
const storage = new CloudinaryStorage({
cloudinary: cloudinary,

params: {folder: 'My_Simple_Uploads', // Cloudinary pe is naam ka folder banega

allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],}
});

const upload = multer({ storage: storage });

module.exports = upload;