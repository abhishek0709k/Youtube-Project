const { mongoose ,  Schema , model } = require("mongoose")

const videoSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    discription : {
        type : String,
    },
    video : {
        type : String,
        required : true,
    },
    thumbnail : {
        type : String,
        required : true,
    },
    videoType : {
        type : String,
        default : 'all',
    },
    like : {
        type : String,
        default : 0,
    },
    dislike : {
        type : String,
        default : 0,
    }
} , {timestamps : true});

const videoModel = model("video" , videoSchema);

module.exports = videoModel;