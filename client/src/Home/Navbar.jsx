import React from 'react'
import "./Navbar.css"
import {Link} from "react-router-dom"

export const Navbar = () => {
  return (
    <div>
        <div className='navbar_div'>
            <Link to={"/"}>Home</Link>
            <Link to={"/product"}>Product</Link>
            <Link to={"/cart"}>Cart</Link>
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Sign Up</Link>
        </div>
    </div>
  )
}
