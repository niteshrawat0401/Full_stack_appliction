import logo from "./logo.svg";
import "./App.css";
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Home/Home";
import { Navbar } from "./Home/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
