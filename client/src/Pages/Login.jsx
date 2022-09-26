import React from "react";
import { useState } from "react";
import axios from "axios";

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
        setLoginData(initData);
        alert("Sucessfull login");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <div>
        <form action="" onSubmit={handleLogin}>
          <input
            type="text"
            name="userName"
            placeholder="UserName"
            value={loginData.userName}
            onChange={handlechanaged}
            required
          />
          <br />
          <input
            type="password"
            name="passWord"
            placeholder="Password"
            value={loginData.passWord}
            onChange={handlechanaged}
            required
          />
          <br />
          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
};
