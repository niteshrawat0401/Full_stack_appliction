const { Router } = require("express");
const User = require("../models/user");

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
  return res.status(201).send({ message: "Vaild User" });
});

module.exports = authRouter;
