import React, { useState } from 'react'
import "./Navbar.css"
import {Link} from "react-router-dom"
import {ThemeProvider} from "styled-components"
import {lightTheme,darkTheme,GlobalStyles} from "./theme"

export const Navbar = () => {
  const [theme,setTheme]= useState("light");

  function dark(){
    theme === "light" ? setTheme("dark") : setTheme("light")
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles/>
    <div>
        <div className='navbar_div'>
            <Link to={"/"}>Home</Link>
            <Link to={"/product"}>Product</Link>
            <Link to={"/cart"}>Cart</Link>
            <Link to={"/login"}>Login</Link>
            <button onClick={dark} >Dark Theme</button>
        </div>
    </div>
    </ThemeProvider>
  )
}
