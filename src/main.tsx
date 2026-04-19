import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoomList from "./pages/RoomList";
import Profile from "./pages/Profile";
import RoomDetail from "./pages/RoomDetail"

createRoot(document.getElementById("root")).render(
  <Router>
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/roomList/:id" element={<RoomList />} />
        <Route path="/room/:id" element={<RoomDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  </Router>,
);
