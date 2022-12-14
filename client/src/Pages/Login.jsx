import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import "./style.module.css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import eyeimg1 from "./eyeimage/eyeimg1.jpeg";
import eyeimg2 from "./eyeimage/eyeimg2.jpeg";

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

export const Login = ({ isUserisAuthenticated }) => {
  const [loginData, setLoginData] = useState(initData);
  const [alert, setAlert] = useState(false);
  const [invalidalert, setInvalidalert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handlechanaged = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  // post login
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/auth/login`, loginData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem(
          "pvtroute",
          JSON.stringify({
            isUserisAuthenticated: true,
            userid: res.data._id,
            token: res.data.token,
            userName: loginData.userName,
          })
        );
        setLoginData({ ...initData });
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          navigate("/");

          isUserisAuthenticated(true);
        }, 2000);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setInvalidalert(true);
          setTimeout(() => {
            setInvalidalert(false);
          }, 3000);
        }
      });
  };

  return (
    <div>
      <div className="login_main_container">
        <form onSubmit={handleLogin}>
          <h2
            style={{ fontWeight: "bold", paddingTop: "2rem", fontSize: "21px" }}
          >
            Login
          </h2>
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
          <div className="show_hide_password_div">
            <input
              className="inpu2"
              type={showPassword ? "text" : "password"}
              name="passWord"
              placeholder="Password"
              value={loginData.passWord}
              onChange={handlechanaged}
              required
            />
            <span
              className="show_hide_password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <img src={eyeimg2} alt="eyehide" />
              ) : (
                <img src={eyeimg1} alt="eyeshow" />
              )}
            </span>
          </div>
          <br />
          <input className="inpu3" type="submit" value="Login" />
        </form>
        <div style={{ paddingTop: "2px", marginTop: "8px" }}>
          <span>Create a new account </span>
          <Link style={{ color: "blue", fontSize: "16px" }} to={"/signup"}>
            Sign up
          </Link>
        </div>

        <div style={{ marginTop: "3.2rem" }}>
          {alert ? (
            <Alert
              style={{ height: "5rem" }}
              status="success"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="150px"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Successfull Login
              </AlertTitle>
            </Alert>
          ) : (
            <h1></h1>
          )}
        </div>
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
// 9582031421
