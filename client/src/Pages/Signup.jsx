import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./module.css/Signup.css"

let initObj = {
  userName: "",
  passWord: "",
  email: "",
  mobile: "",
};

export const Signup = () => {
  const [signData, setSignData] = useState(initObj);
  const navigate = useNavigate();
  const handleonChange = (e) => {
    const { name, value } = e.target;
    setSignData({ ...signData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/auth/signup`, signData)
      .then((res) => {
        console.log("data", res.data);

        setSignData(initObj);
        alert("Sign in Successfull");
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <div className="signup_main_cont">
      <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          
          <input className="inp1"
            type="text"
            name="userName"
            placeholder="UserName"
            value={signData.userName}
            onChange={handleonChange}
            required
          />
          <br />
          <input className="inp2"
            type="password"
            name="passWord"
            placeholder="Password"
            value={signData.passWord}
            onChange={handleonChange}
            required
          />
          <br />
          <input className="inp3"
            type="text"
            name="email"
            placeholder="Email"
            value={signData.email}
            onChange={handleonChange}
            required
          />
          <br />
          <input className="inp4"
            type="number"
            name="mobile"
            placeholder="Number"
            value={signData.mobile}
            onChange={handleonChange}
            required
          />
          <br />
          <input className="inp5" type="submit" value="Sign UP" />
        </form>
      </div>
    </div>
  );
};
