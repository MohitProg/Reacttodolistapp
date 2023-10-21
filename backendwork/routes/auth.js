const router = require("express").Router()
const { body, validationResult } = require("express-validator")
const user = require("../modals/user")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fetchuser = require("../middleware/fetchuser")


// create a user using post "api/auth/"

router.post("/createuser", [

    body("name", "enter valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "enter at leat 5 character").isLength({ min: 5 })


], async (req, res) => {

    const error = validationResult(req)
    if (!error.isEmpty()) {
        success:false
        return res.status(400).json({ error: error.array() })
    }



    try {



        const email = await user.findOne({ email: req.body.email })
        console.log(email)



        if (email && email !== null) {
       
            return res.status(400).send({success:false,msg:"user is already exist"})



        } else {
            const salt = await bcryptjs.genSalt(10)


            const hashpass = await bcryptjs.hash(req.body.password, salt)
            console.log(hashpass)

            const newuser = new user({
                name: req.body.name,
                email: req.body.email,
                password: hashpass
            })


            await newuser.save();
            const authtoken = jwt.sign({ id: newuser.id }, "thisismyjwttokenwebappihopeyoulike")
            console.log(authtoken)

            return res.send({ success:true, authtoken })


        }

        // }



    } catch (error) {

        console.log(error)
        res.status(500).send({msg:"some error occured"})

    }



})



// authenticate user /api/auth/login

router.post("/login", [


    body("email", "enter a valid email").isEmail(),
    body("password", "check your password").exists()


], async (req, res) => {

    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
        let sucess = false
    }



   


        try {

            const { email, password } = req.body
            const emailcheck = await user.findOne({ email: email })

            if (!emailcheck) {
                return res.status(400).send({ success:false, msg: "invalid incredentials" })
             
            }

            const passwordcampare = await bcryptjs.compare(password, emailcheck.password)
            if (!passwordcampare) {
                return res.status(400).send({ success:false, msg: "invalid incredentials" })
            
            }


            const authtoken = jwt.sign({ id: emailcheck.id }, "thisismyjwttokenwebappihopeyoulike")
          
            return res.send({success:true, msg:"login successfully", authtoken })
        } catch (error) {
            console.log(error)
            let success=false
            res.status(500).send({success:false,msg:"some error occured"})
        }














})


// get user using post method  


router.post("/getuser", fetchuser, async (req, res) => {
    try {

        console.log(req.user)

        const userId = req.user.id;
        console.log(userId)

        const getuser = await user.findById(userId).select("-password");

        res.send(getuser)


    } catch (error) {

        console.log(error)
        res.status(500).send("some error occure")
    }
})

module.exports = router;