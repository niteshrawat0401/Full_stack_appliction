const {Router}= require("express");
const User = require("../models/user")

const authRouter= Router();

//Sign up
authRouter.post("/signup",(req,res)=>{
    const userData= new User(req.body);
    userData.save((error,sucess)=>{
        if(error){
            return res.status(500).send({message:"Somethng Error"});
        }
        return res.status(201).send({message: "Sign up Sucessfull",userData: sucess["_doc"]})
    })
})

authRouter.post("/login",(req,res)=>{
    const {userName, password}= req.body;
    const vaildUser= User.find({userName,password});
    if(vaildUser.length<1 || !vaildUser){
        return res.status(401).send({message: "Invalid credentials"});
    }
    return res.status(201).send({message: "Vaild User"});

})

module.exports= authRouter