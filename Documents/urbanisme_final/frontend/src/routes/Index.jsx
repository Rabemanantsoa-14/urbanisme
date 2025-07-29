import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demande from "../pages/liste/demande";
import Dashboard from "../pages/Dashboard";
import Carte from "../pages/Carte";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Notification from "../pages/Notifications";
import Profile from "../pages/Profile";


export default function AppRoutes() {
    const [formState, setFormState] = useState("login"); // "login", "register", "forgot"

    const handleSwitch = (to) => {
        setFormState(to);
    };
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/demande" element={<Demande />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/carte" element={<Carte />} />
                <Route path="/login" element={<Login onSwitch={() => handleSwitch("register")} onForgotPassword={() => handleSwitch("forgot")} />} />
                <Route path="/register" element={<Register onSwitch={() => handleSwitch("login")} />} />
                <Route path="/forgot-password" element={<ForgotPassword onBackToLogin={() => handleSwitch("login")} />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}