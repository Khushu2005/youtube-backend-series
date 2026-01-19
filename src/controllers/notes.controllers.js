const noteModel = require('../models/notes.models');


const createNote = async(req,res)=>{
    try{
        const {title,content}=req.body;

        if(!title || !content){
            return res.status(400).json({ message: "Title and Content are required" });
        }

        const note = new noteModel({
            title,
            content,
            userId:req.user.userId
        });

        await note.save();

        res.status(200).json({
            message:"Note created succesfully!",
            note
        })
    }
    catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
    createNote
}