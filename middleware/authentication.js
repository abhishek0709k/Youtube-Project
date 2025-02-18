const express = require("express")
const jwt = require("jsonwebtoken")
const secretCode = "$uperM@n"
const userModel = require("../models/user")
const authentication = async(req, res, next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({ error : "You are logout"})
        }else{
            const checkToken = jwt.verify(token , secretCode);
            req.user = await userModel.findOne({ userName : checkToken.userName }).select("-password")
            next();
        }
    } catch (error) {
        return res.status(400).json({ message : "Server Error" })
    }
    
}

module.exports = authentication;