const { mongoose ,  Schema , model } = require("mongoose")

const commentSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    video : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "video",
        required : true,
    },
    comment : {
        type : String,
        required : true,
    },
    
} , {timestamps : true});

const commentModel = model("comment" , commentSchema);

module.exports = commentModel;