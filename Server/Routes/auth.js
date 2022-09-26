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

module.exports= authRouter