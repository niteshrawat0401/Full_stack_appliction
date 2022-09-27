import logo from "./logo.svg";
import "./App.css";
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";
import { Routes, Route,Navigate,Outlet } from "react-router-dom";
import { Home } from "./Home/Home";
import { Navbar } from "./Home/Navbar";
import DataProvider from "./Context/DataProvider";
import { useState } from "react";

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
  return (
    <div className="App">
      <Navbar />
      <DataProvider>
      <Routes>
      <Route
              path="/"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              {/* if isAuthenticated is true then open home page */}
              <Route path="/" element={<Home />} />
            </Route>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login isUserisAuthenticated={isUserisAuthenticated}/>} />
      </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
