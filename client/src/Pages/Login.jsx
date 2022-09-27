import React from "react";
import { useState } from "react";
import axios from "axios";
import "./module.css/Login.css"

let initData = {
  userName: "",
  passWord: "",
};

export const Login = () => {
  const [loginData, setLoginData] = useState(initData);

  const handlechanaged = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/auth/login`, loginData)
      .then((res) => {
        console.log(res.data);
        setLoginData({...initData});
        alert("Sucessfull login");
      })
      .catch((e) =>{
        if(e.res.status === 401){
            alert("Invaild Credentials")
        }
      });
  };

  return (
    <div>
      <div className="login_main_container">
        <form onSubmit={handleLogin}>
          <h3>Login</h3>
          <input className="inpu1"
            type="text"
            name="userName"
            placeholder="UserName"
            value={loginData.userName}
            onChange={handlechanaged}
            required
          />
          <br />
          <input className="inpu2"
            type="password"
            name="passWord"
            placeholder="Password"
            value={loginData.passWord}
            onChange={handlechanaged}
            required
          />
          <br />
          <input className="inpu3" type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};
