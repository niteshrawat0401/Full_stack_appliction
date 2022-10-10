const userprofile = require("../models/user");
const {Router}=  require("express");

const userRouter = Router();

userRouter.post("/:userid/student", (req, res)=>{
    const userPro= new userprofile(req.body)
    userPro.save((err, success)=>{
        try {
            return res.status(201).send({message: "Product Added", userPro: success["_doc"]})
        } catch (error) {
            return res.status(500).send({message: "Error Something"})
        }
    })
})

userRouter.get("/:userid/student", async(req,res)=>{
    const query= req.query
    const userPro= new userprofile.find(query);
    res.send(userPro);
})

userRouter.delete("/:userid/student/:studentId", async(req,res)=>{
    const userid= req.params.userid
    const productId= req.params.studentId
    const product= await userprofile.deleteOne({_id: productId, userid: userid})
    .then(result =>{
        return res.status(201).send({message: "Deleted Successfully"})
    })
    .catch(err =>{
        return res.status(401).send({message: "Something went wrong"})
    })
})

module.exports= userRouter;