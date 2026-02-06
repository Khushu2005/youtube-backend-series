const Image = require('../models/Image');

const uploadToDb = async (req, res) => {
try {
if (!req.file) {
return res.status(400).json({ message: "Not uploaded" }); }


const newImage = new Image({
url: req.file.path,        // Cloudinary ka secure URL
public_id: req.file.filename // Cloudinary ki unique ID
});

await newImage.save();

        // 3. Success Response
res.status(200).json({
 message: "mage  saved in db ",
data: newImage
});
} catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
};

module.exports = { uploadToDb };