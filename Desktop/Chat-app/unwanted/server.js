const cluster = require("node:cluster")
const os = require("os")
const express = require("express")

const totalCpus = os.cpus().length;

if(cluster.isPrimary){
    for(let i = 1; i<=totalCpus;i++){
        cluster.fork()
    }
}else{
    const app = express()
    app.get("/" , (req , res)=>{
        return res.json({ message: "We are learning Node js "})
    })
    app.listen(8000 , ()=>{ console.log("Server is running on PORT:8000")})
}