const {Schema,model} = require("mongoose");

const userSchema= new Schema({
    userName: String,
    passWord: String,
    email: String,
    mobile: Number
})

const User=model("User", userSchema);
module.exports= User;