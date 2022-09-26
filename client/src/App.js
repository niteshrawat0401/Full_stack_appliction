import logo from './logo.svg';
import './App.css';
import { Signup } from './Pages/Signup';
import { Login } from './Pages/Login';
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      
      {/* <Signup/>
      <Login/> */}
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
