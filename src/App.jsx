import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Snowfall from 'react-snowfall';

import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";

function App() {
  return (
    <><Snowfall />
    <BrowserRouter>
      <Routes>

        {/* Default Landing Page */}
        <Route path="/" element={<Login />} />

        {/* Signup Page */}
        <Route path="/register" element={<Register />} />

        {/* Welcome Page */}
        <Route path="/welcome" element={<Welcome />} />

      </Routes>
    </BrowserRouter></>
  );
}

export default App;