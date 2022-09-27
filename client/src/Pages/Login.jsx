import React from "react";
import { useState } from "react";
import axios from "axios";
import "./module.css/Login.css";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

let initData = {
  userName: "",
  passWord: "",
};

export const Login = () => {
  const [loginData, setLoginData] = useState(initData);
  const [alert, setAlert] = useState(false);
  const [invalidalert, setInvalidalert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

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
        setLoginData({ ...initData });
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setInvalidalert(true);
          setTimeout(() => {
            setInvalidalert(false);
          }, 2000);
        }
      });
  };

  return (
    <div>
      <div className="login_main_container">
        <form onSubmit={handleLogin}>
          <h3>Login</h3>
          <input
            className="inpu1"
            type="text"
            name="userName"
            placeholder="UserName"
            value={loginData.userName}
            onChange={handlechanaged}
            required
          />
          <br />
          <input
            className="inpu2"
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
        {alert ? (
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Successfull Login
            </AlertTitle>
          </Alert>
        ) : (
          <h1></h1>
        )}
        {invalidalert ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Incorrect Credentials</AlertTitle>
          </Alert>
        ) : (
          <h1></h1>
        )}
      </div>
    </div>
  );
};
