import logo from "./logo.svg";
import "./App.css";
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Home } from "./Home/Home";
import { Navbar } from "./Home/Navbar";
import { createContext, useReducer, useState } from "react";
import { Cart } from "./Cart/Cart";
import { initialState,reducer } from "./reducer/Usereucer";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      {/* <Navbar /> */}
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};
export const UserContext = createContext();
function App() {
  const [isAuthenticated, isUserisAuthenticated] = useState();
  const [logout, setLogout] = useState(false);
  
  const [state, dispatch]= useReducer(reducer, initialState)

  return (
    <div className="App">
      <UserContext.Provider value={{state, dispatch}}>
        <Navbar />
        <Routes>
          <Route
            path="/login"
            element={<Login isUserisAuthenticated={isUserisAuthenticated} />}
          />

          <Route path="/" element={<Home />} />

          <Route
            path="/cart"
            element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            /* if isAuthenticated is true then open cart page */
          >
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
