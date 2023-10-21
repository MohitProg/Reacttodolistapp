const express=require("express")
const dbconnection=require("./db/db")
const cors=require("cors")

const app=express();
app.use(express.json())
app.use(cors())

// data bas econnection 
dbconnection

app.use("/api/auth",require("./routes/auth"))
app.use("/api/note",require("./routes/note"))


app.listen(80,()=>{
    console.log("server is started")
})

