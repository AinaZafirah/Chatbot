import React from "react";
import Login from "./View/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./View/Register";
import ForgotPassword from "./View/ForgotPassword";
import Dashboard from "./View/Dashboard";
import ChatbotFrontEnd from "./View/ChatbotFrontEnd";
import LandingPage from "./View/Landing";
import Home from "./View/Home";
import About from "./View/About";
import Contact from "./View/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/PasswordReset" element={<ForgotPassword />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/Chatbot" element={<ChatbotFrontEnd />}></Route>
        <Route path="/Chatbot" element={<ChatbotFrontEnd />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
