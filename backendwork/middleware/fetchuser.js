const jwt=require("jsonwebtoken");



const fetchuser=(req,res,next)=>{

    const token=req.header("auth-token");

    if(!token){
        res.status(401).send({error:"please provide valid token"})
    }

    try {
        
        const data=jwt.verify(token,"thisismyjwttokenwebappihopeyoulike")
        console.log(data)
    
        req.user=data;
    
         next();
    } catch (error) {
        res.status(401).send({error:"please provide valid token"})
    }

}

module.exports=fetchuser;