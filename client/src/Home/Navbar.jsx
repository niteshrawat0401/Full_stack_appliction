import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./theme";
import { UserContext } from "../App";

export const Navbar = ({ logout, initData }) => {
  const [theme, setTheme] = useState("light");
  const { state, dispatch } = useContext(UserContext);

  function dark() {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div>
        <div className="navbar_div">
          {state ? (
            <>
              <Link to={"/"}>Home</Link>
              <Link to={"/product"}>Product</Link>
              <Link to={"/cart"}>Cart</Link>
              <Link to={"/login"}>Logout</Link>
              <button onClick={dark}>Dark Theme</button>
            </>
          ) : (
            <>
              <Link to={"/"}>Home</Link>
              <Link to={"/product"}>Product</Link>
              <Link to={"/cart"}>Cart</Link>
              <Link to={"/login"}>Login</Link>
              <button onClick={dark}>Dark Theme</button>
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};
