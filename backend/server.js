const express=require("express")
const app=express()
const dotenv=require("dotenv")
dotenv.config({path:"./backend/config/config.env"})
const connectdb=require("./config/db")
const user_routes=require("./routes/user_routes")
const path=require("path")

connectdb()

app.use(express.json())

app.use("/api/users",user_routes)


const _dirname=path.resolve()
if(process.env.NODE_ENV==="production")
{
    app.use(express.static(path.join(_dirname,"/frontend/build")))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(_dirname,"frontend","build","index.html"))
    })
}
else{
    app.get("/",(req,res)=>{
        res.send("Hi")
    })
}



const PORT=process.env.PORT||5000
app.listen(PORT,()=>{console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)})