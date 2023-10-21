const mongoose=require("mongoose")
const mongoUrl="mongodb+srv://mohit:sonu9908@cluster0.6uvip3r.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoUrl).then(()=>{
    console.log("databae is connected ")
}).catch((error)=>{
    console.log(error)
})


