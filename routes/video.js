const express = require("express")
const videoModel = require("../models/video");
const router = express.Router();
const authentication = require('../middleware/authentication')

router.post("/uploadvideo", authentication , async (req, res) => {
    try {
        const { title, discription, thumbnail, video } = req.body;
        const newVideo = await videoModel.create({
            user: req.user._id,
            title,
            discription,
            thumbnail,
            video
        });
        return res.status(200).json({ message: "Your video is uploaded" , video: newVideo });
    } catch (error) {
        return res.status(500).json({ Error : "Internal server error" });
    }
});

router.get("/getallvideos" , async(req , res)=>{
    const allVideos = await videoModel.find({}).populate('user' , "channelName channelLogo userName " )
    if(allVideos == ""){
        return res.status(200).json({ message : "Zero video" })
    }
    return res.json({ videos : allVideos})
});

router.get("/getVideo/:id" , async(req , res)=>{
    try {
        const id = req.params.id;
        const findVideo = await videoModel.findById(id).populate("user" , "channelName userName channelLogo createdAt")
        return res.status(200).json({ video : findVideo })
    } catch (error) {
        return res.status(500).json({ Error : "Internal Server Error"});
    }
})
router.get("/getallvideosbyuserId/:userId" , async(req ,res)=>{
    try {
        const userId = req.params.userId;
        const findedVideo = await videoModel.find({user : userId}).populate("user" , "channelName channelLogo userName createdAt about");
        return res.status(200).json({ videos : findedVideo })
    } catch (error) {
        return res.status(500).json({ Error : "Internal Server Error" })
    }
})

module.exports = router;