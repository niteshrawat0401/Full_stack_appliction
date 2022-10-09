const { Router } = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authRouter = Router();

//Sign up
authRouter.post("/signup", (req, res) => {
  const userData = new User(req.body);
  userData.save((error, sucess) => {
    try {
      return res
        .status(201)
        .send({ message: "Sign up Sucessfull", userData: sucess["_doc"] });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  });
});

// login
authRouter.post("/login", async (req, res) => {
  const { userName, passWord } = req.body;
  const vaildUser = await User.find({ userName, passWord });
  if (vaildUser.length < 1 || !vaildUser) {
    return res.status(401).send({ message: "Invalid credentials" });
  }
  // token 1
  const token = jwt.sign({
    userName
  },
  "SECRET",{
    expiresIn: "1 hour"
  })
  // token 2
  const refreshToken = jwt.sign({
    userName
  },
  "REFRESHPASSWORD",{
    expiresIn : "30days"
  })
  let {_id} = vaildUser[0]
  return res.status(201).send({ message: "Vaild User", token : token, refreshToken: refreshToken,_id });
});

authRouter.post("/newToken", (req,res)=>{
  const refreshToken = req.headers["authorization"].split(" ")[0];
  const validation= jwt.verify(refreshToken, "REFRESHPASSWORD");
  if(validation){
    const newPrimaryToken = jwt.sign({userName}, "SECRET", {
      expiresIn : "1 hour"
    })
    return res. send({ token:newPrimaryToken})
  }
})

module.exports = authRouter;
