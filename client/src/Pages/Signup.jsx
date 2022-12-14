import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./style.module.css/Signup.css";

let initialObj = {
  userName: "",
  passWord: "",
  email: "",
  mobile: "",
};

export const Signup = () => {
  const [signData, setSignData] = useState(initialObj);
  const navigate = useNavigate();
  const handleonChange = (e) => {
    const { name, value } = e.target;
    setSignData({ ...signData, [name]: value });
  };
  // .post data
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/auth/signup`, signData)
      .then((res) => {
        console.log("data", res.data);

        setSignData({ ...initialObj });
        alert("Sign In Successfull");
        navigate("/login");
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <div className="signup_main_cont">
        <h1 style={{ fontWeight: "bold",fontSize:"21px",paddingTop:"2rem" }}>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="inp1"
            type="text"
            name="userName"
            placeholder="UserName"
            value={signData.userName}
            onChange={handleonChange}
            required
          />
          <br />
          <input
            className="inp2"
            type="password"
            name="passWord"
            placeholder="Password"
            value={signData.passWord}
            onChange={handleonChange}
            required
          />
          <br />
          <input
            className="inp3"
            type="text"
            name="email"
            placeholder="Email"
            value={signData.email}
            onChange={handleonChange}
            required
          />
          <br />
          <input
            className="inp4"
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
        <div style={{ paddingTop: "2px",marginTop: "8px" }}>
          <span>Already have account </span>
          <Link style={{ color: "blue", fontSize: "15px" }} to={"/login"}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
