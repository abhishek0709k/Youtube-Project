const { createHmac , randomBytes } = require("node:crypto")
const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const userModel = require("../models/user")
const secretCode = "$uperM@n"
const cookieOptions = {
    httpOnly : true,
    secure: false,    // Ensures the cookie is only sent over HTTPS
    sameSite: 'Lax'
}
router.post("/signup" , async(req , res)=>{
    try {
        const { channelName , userName , password , about , channelLogo} = req.body;
    const isExist = await userModel.findOne({ userName })
    if(isExist){
        return res.status(400).json({ error : "UserName already exist Please try with another userName"})
    }
    const salt = randomBytes(32).toString('hex')
    const hashedPassword = createHmac("sha256" , salt).update(password).digest('hex')
    await userModel.create({
        userName,
        channelName,
        password : hashedPassword,
        about,
        channelLogo,
        salt ,
    })
    res.status(200).json({ message : "User registered Successfully"})
    } catch (error) {
        console.log("error" , error)
    }
    
})
router.post("/login" , async(req , res)=>{
    const { userName , password } = req.body;
    const user = await userModel.findOne({ userName });
    if(!user){
        res.status(400).json({ error :  "User not found" })
    }
    const hashPassword = user.password;
    const salt = user.salt;
    const hashedPassword = createHmac("sha256" , salt).update(password).digest('hex');
    if(hashedPassword !== hashPassword){
        res.status(400).json({ error : "Password is incorrect "})
    }
    const token = jwt.sign({ userName : user.userName , password : user.password } , secretCode)
    res.cookie('token' , token , cookieOptions); 
    return res.status(200).json({ message : "Logged in successfully", token , user})

})
router.post("/logout" , (req , res)=>{
    res.clearCookie("token" , cookieOptions).json({ message : "Logged out successfully" })
})
module.exports = router;