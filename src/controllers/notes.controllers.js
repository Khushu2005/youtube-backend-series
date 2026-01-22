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

const getNotes = async (req, res) => {
  try {
   
    const notes = await noteModel.find({ userId: req.user.userId });

    res.status(200).json({
      message: "Notes Fetched",
      notes, 
      count: notes.length
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id; // 
    const userId = req.user.userId; // 


    const note = await noteModel.findOneAndDelete({
      _id: noteId,
      userId: userId
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found or you are not authorized" });
    }

    res.status(200).json({ message: "Note Deleted Successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createNote,
    getNotes,
    deleteNote
}