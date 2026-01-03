const mongoose = require('mogoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: true,
        required: true
    }


},
    {
        timestamps: true
    }
)

const user = mongoose.model("user",userSchema);

module.exports = user