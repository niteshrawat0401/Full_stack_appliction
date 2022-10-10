import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./theme";

export const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();
  let pvtroute = JSON.parse(localStorage.getItem("pvtroute"));

  const logout = () => {
    localStorage.removeItem("pvtroute");
    navigate("/login");
  };

  function dark() {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div>
        <div className="navbar_div">
          <>
            <Link to={"/"}>Home</Link>
            <Link to={"/product"}>Product</Link>
            <Link to={"/cart"}>Cart</Link>
            {pvtroute === null ? (
              <h3 onClick={() => navigate("/login")}>Login in</h3>
            ) : (
              <h3 onClick={logout}>
                Lorout<span>{pvtroute.username}</span>
              </h3>
            )}
            <button onClick={dark}>Dark Theme</button>
          </>
        </div>
      </div>
    </ThemeProvider>
  );
};
