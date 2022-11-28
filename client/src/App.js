import logo from "./logo.svg";
import "./App.css";
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Home } from "./Home/Home";
import { Navbar } from "./Home/Navbar";
import { useState } from "react";
import { Cart } from "./Cart/Cart";
import { Detail } from "./Pages/Detail";
import { Show } from "@chakra-ui/react";

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

function App() {
  const [isAuthenticated, isUserisAuthenticated] = useState();
  const [logout, setLogout] = useState(false);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={<Login isUserisAuthenticated={isUserisAuthenticated} />}
        />

        <Route path="/" element={<Home />} />

        <Route
          path="/show"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
          /* if isAuthenticated is true then open cart page */
        >
          <Route path="/show" element={<Show/>} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
