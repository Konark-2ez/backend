const express = require("express")
const { connection } = require("./config/db")
const cors = require("cors")
const {userRoute} = require("./routes/user.routes")
const {noteRouter} = require("./routes/note.routes")
const {auth} = require("./middleware/auth.middleware")
const app = express()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Home Page")
})

//to hit user route
app.use("/user",userRoute)

//to authorize 
app.use(auth)

//to hit note route
app.use("/note",noteRouter)


app.listen(4500,async()=>{
    try {
        await connection
      console.log("Connected to DB")
      console.log("Running");
    } catch (error) {
        
    }
})