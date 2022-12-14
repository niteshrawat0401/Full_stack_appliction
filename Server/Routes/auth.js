const { Router } = require("express");
const User = require("../models/authuser");
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
  // console.log(vaildUser);
  if (vaildUser.length < 1 || !vaildUser) {
    return res.status(401).send({ message: "Invalid credentials" });
  }
  // token 1
  const token = jwt.sign(
    {
      userName,
    },
    "SECRET",
    {
      expiresIn: "1 hour",
    }
  );
  // token 2
  const refreshToken = jwt.sign(
    {
      userName,
    },
    "REFRESHPASSWORD",
    {
      expiresIn: "30days",
    }
  );
  let { _id } = vaildUser[0];
  return res
    .status(201)
    .send({
      message: "Vaild User",
      token: token,
      refreshToken: refreshToken,
      _id,
    });
});

authRouter.post("/newToken", (req, res) => {
  const refreshToken = req.headers["authorization"].split(" ")[0];

  const validation = jwt.verify(refreshToken, "REFRESHPASSWORD");
  
  if (validation) {
    const newPrimaryToken = jwt.sign({ userName }, "SECRET", {
      expiresIn: "1 hour",
    });
    return res.send({ token: newPrimaryToken });
  }
});

authRouter.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const token = req.headers["authorization"].split(" ")[1];
  try {
    const verification = jwt.verify(token, "SECRET");
    if (verification) {
      const user= await User.findOne({_id: id});
      res.send({ profile: "userprofile" });
    } else {
      return res.status(401).send("Unauthorrized");
    }
  } catch (error) {
    return res.status(401).send("Unauthorrized");
  }
});

module.exports = authRouter;
