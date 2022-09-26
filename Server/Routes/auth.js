const {Router}= require("express");
const User = require("../models/user")

const authRouter= Router;

//Sign up
authRouter.post("/signup",(req,res)=>{
    const userData= new User(req.body);
})