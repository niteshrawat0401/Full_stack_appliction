import React from "react";
import { useState } from "react";

let initObj = {
  name: "",
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
  const handleSubmit = () => {};
  return (
    <div>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="UserName"
            id=""
            onChange={handleonChange}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id=""
            onChange={handleonChange}
            required
          />
          <br />
          <input
            type="text"
            name="email"
            placeholder="Email"
            id=""
            onChange={handleonChange}
            required
          />
          <br />
          <input
            type="number"
            name="number"
            placeholder="Number"
            id=""
            onChange={handleonChange}
            required
          />
          <br />
          <input type="submit" value="Sign UP" name="" id="" required />
        </form>
      </div>
    </div>
  );
};
