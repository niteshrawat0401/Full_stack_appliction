import React from "react";
import { useState } from "react";
import axios from "axios"

let initObj = {
  username: "",
  password: "",
  email: "",
  number: "",
};

export const Signup = () => {
  const [signData, setSignData] = useState(initObj);
  const handleonChange = (e) => {
    const { name, value } = e.target;
    setSignData({ ...signData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:8080/auth/signup`,signData)
    .then((res)=>{
      console.log("data",res.data)
      // setSignData(res.data)
    })
    .catch((e)=>console.log(e))
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="UserName"
            value={signData.username}
            onChange={handleonChange}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signData.password}
            onChange={handleonChange}
            required
          />
          <br />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={signData.email}
            onChange={handleonChange}
            required
          />
          <br />
          <input
            type="number"
            name="number"
            placeholder="Number"
            value={signData.number}
            onChange={handleonChange}
            required
          />
          <br />
          <input type="submit" value="Sign UP"/>
        </form>
      </div>
    </div>
  );
};
