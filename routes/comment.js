const express = require("express");
const commentModel = require("../models/comment");
const router = express.Router();
const authentication = require('../middleware/authentication')
router.post("/usercomment" , authentication , async(req , res)=>{
    try {
        const { video , comment } = req.body;
        const newComment = await commentModel.create({
            user : req.user._id,
            comment,
            video  
        })
        return res.status(200).json({ message : "Comment Added" , Comment : newComment})
    } catch (error) {
        return res.status(500).json({ message : "Internal Server Error" })
    }
})

router.get("/getcommentbyvideoId/:videoId" , async(req ,res)=>{
    const videoId = req.params.videoId;
    const findComment = await commentModel.find({video : videoId}).populate("user" , "channelName channelLogo userName")
    return res.status(200).json({ Comment : findComment })
})

module.exports = router;