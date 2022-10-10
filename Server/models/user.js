const { Schema, model } = require("mongoose");

const userDataschema = new Schema({
  name: String,
  gender: {
    type: String,
    enum: ["Male", "Female", "other"],
  },
  age: Number,
  testname: String,
  subject: String,
  marks: Number,
  date: String,
  userid: String,
});

const userProfile = model("UserData", userDataschema);
module.exports = userProfile;
