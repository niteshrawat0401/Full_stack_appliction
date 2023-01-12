const userprofile = require("../models/user");
const { Router } = require("express");

const userRouter = Router();

userRouter.post("/:userid/student", (req, res) => {
  const { userid } = req.params;
  const { name, gender, age, testname, subject, marks, date } = req.body;
  const userPro = new userprofile({
    name,
    gender,
    age,
    testname,
    subject,
    marks,
    date,
    userid: userid,
  });
  userPro.save((err, success) => {
    try {
      return res
        .status(201)
        .send({ message: "Product Added", userPro: success["_doc"] });
    } catch (error) {
      return res.status(500).send({ message: "Error Something" });
    }
  });
});

userRouter.get("/:userid/student", async (req, res) => {
  const query = req.query;
  const userPro = await userprofile.find(query);
  res.send(userPro);
});

userRouter.delete("/:userid/student/:studentId", async (req, res) => {
  const userid = req.params.userid;
  const productId = req.params.studentId;
  const product = await userprofile
    .deleteOne({ _id: productId, userid: userid })
    .then((result) => {
      return res.status(201).send({ message: "Deleted Successfully" });
    })
    .catch((err) => {
      return res.status(401).send({ message: "Something went Wrong" });
    });
});

module.exports = userRouter;
