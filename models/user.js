const { Schema , model } = require("mongoose")

const userSchema = new Schema({
    channelName : {
        type : String,
        required : true,
    },
    userName : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    about : {
        type : String,
        required : true,
    },
    channelLogo : {
        type : String,
        required : true,
    },
    salt : {
        type : String,
        required : true,
    }
} , {timestamps : true});

const userModel = model("user" , userSchema);

module.exports = userModel;