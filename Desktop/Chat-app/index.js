const http = require("http")
const express = require("express")
const path = require("path")
const { Server } = require("socket.io")
const app = express()
const server = http.createServer(app);
const io = new Server(server)
const { createHmac , randomBytes } = require("crypto")
const mongoose = require('mongoose')
const userModel = require('./models/user')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const commentModel = require("./models/comment")
const secret = "$uperM@n"
mongoose.connect('mongodb://127.0.0.1:27017/chat-app-user').then(()=>{ console.log("mongoDB connected successfully") })


app.use(express.static(path.resolve("./public")))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.urlencoded({ extended: true }));

app.set("view engine" , "ejs")
app.set("views" , path.join(__dirname, 'views'))


io.on("connection" , (socket)=>{
    socket.on('userMessage' , (message)=>{
        io.emit("message" , message)
    })
})

app.get("/" , (req , res)=>{
    return res.sendFile(path.join(__dirname, "public", "home.html"))
})
app.get("/chat" , (req , res)=>{
    return res.sendFile(path.join(__dirname, "public", "chat.html"))
})
app.get("/application-info" , (req , res)=>{
    return res.sendFile(path.join(__dirname, "public", "application.html"))
})
app.get("/AboutMe" , (req , res)=>{
    return res.sendFile(path.join(__dirname , "public" , "lists.html"))
})
app.get("/contactMe" , (req , res)=>{
    return res.sendFile(path.join(__dirname , "public" , "contactMe.html"))
})
app.get('/signup' , (req , res)=>{
    res.render('signup')
})

app.post('/user/signup' , async(req , res)=>{
    const { firstName , email , password } = req.body;
    const salt = randomBytes(32).toString('hex')
    const hashedPassword = createHmac('sha256' , salt).update(password).digest('hex')
    await userModel.create({
        firstName : firstName,
        email : email,
        password : hashedPassword,
        salt : salt,
    })
    return res.redirect('/')
})

app.get("/login" , (req , res)=>{
    return res.render("login")
})
app.post("/user/login" , async(req , res)=>{
    const { email , password } = req.body
    const user = await userModel.findOne({ email })
    if(!user) throw new Error("user not found ")
    const salt = user.salt
    const hashPassword = createHmac('sha256' , salt).update(password).digest('hex');
    if(hashPassword != user.password){ throw new Error("Incorrect email or password")}
    const token = jwt.sign({ email : user.email , password : user.password } , secret)
    res.json({ token })
})
app.post("/sendComment" , async(req , res)=>{
    const { email , password , message } = req.body
    const user = await userModel.findOne({ email })
    if(!user) throw new error("user not found");
    const salt = user.salt
    const hashPassword = createHmac('sha256' , salt).update(password).digest('hex');
    if(hashPassword != user.password){ throw new Error("Incorrect email or password")}
    await commentModel.create({
        email,
        password : hashPassword,
        userMessage : message,
    })
    return res.redirect('/')
})
server.listen(8000 , ()=>{
    console.log("Server running on PORT:8000")
})
