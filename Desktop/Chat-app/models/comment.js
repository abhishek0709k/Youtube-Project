const { Schema , model } = require("mongoose");

const commentSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    userMessage : {
        type : String,
        required : true
    }
})

const commentModel = model("comment" , commentSchema);

module.exports = commentModel;