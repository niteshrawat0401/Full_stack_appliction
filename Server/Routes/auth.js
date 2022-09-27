const  {Router} = require("express")
const User = require("../models/user")
 const authRouter = Router()

//  signup
authRouter.post("/signup", (req,res)=>{
    const user = new User(req.body)
    user.save((err,success)=>{
        try{
              return res.status(201).send({message: "Signup successfully", token : 12345, user : success["_doc"]})
        // return res.status(201).send({message: "Signup successfully", user : success["_doc"]})
        }
        catch(err){
            return res.status(500).send({message: "Error Occurred"})
        }   
    })
})

//login
authRouter.post("/login", async(req,res)=>{
    const {userName, passWord} = req.body;
    const validUser = await User.find({userName, passWord});
    if(validUser.length <1 || !validUser ){
        return res.status(401).send({message: "Invalid Credentials"})
    }
    return res.status(201).send({message: "login successfully",token : 12345})
})

 module.exports = authRouter