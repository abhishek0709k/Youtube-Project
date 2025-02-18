const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = process.env.PORT || 8000
const userRouter = require("./routes/user")
const videoRouter = require("./routes/video")
const commentRouter = require("./routes/comment")
const cookieParser = require("cookie-parser")
const cors = require('cors')
mongoose.connect("mongodb://127.0.0.1:27017/youtube-project").then(()=>{ console.log("mongoDB connected successfully")})
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true
}))

app.get("/" , (req , res)=>{
    return res.json({ message : "We are on the home page"})
})

app.use("/user" , userRouter)
app.use("/video" , videoRouter)
app.use('/comment' , commentRouter)

app.listen(port , ()=>{
    console.log(`server running on port https://localhost:${port}`)
})