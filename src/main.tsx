import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoomList from "./pages/RoomList";
import Profile from "./pages/Profile";
import RoomDetail from "./pages/RoomDetail";
import AdminLayout from "./pages/Admin/AdminLayout";
import RoomAdmin from "./pages/Admin/RoomAdmin";
import UserAdmin from "./pages/Admin/UserAdmin";
import LocationAdmin from "./pages/Admin/LocationAdmin"
import BookingAdmin from "./pages/Admin/BookingAdmin"
// About Pages
import HowItWorks from "./pages/About/HowItWorks";
import News from "./pages/About/News";
import Investor from "./pages/About/Investor";
import Careers from "./pages/About/Careers";
// Community Pages
import Diversity from "./pages/Community/Diversity";
import Accessibility from "./pages/Community/Accessibility";
import Partnership from "./pages/Community/Partnership";
import GiftCards from "./pages/Community/GiftCards";
// Host Pages
import RentOut from "./pages/Host/RentOut";
import Experiences from "./pages/Host/Experiences";
import ResponsibleHosting from "./pages/Host/ResponsibleHosting";
import ResourceCenter from "./pages/Host/ResourceCenter";
// Support Pages
import HelpCenter from "./pages/Support/HelpCenter";
import Safety from "./pages/Support/Safety";
import Cancellation from "./pages/Support/Cancellation";
import ReportIssue from "./pages/Support/ReportIssue";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route
        path="*"
        element={
          <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/roomList/:id" element={<RoomList />} />
              <Route path="/room/:id" element={<RoomDetail />} />
              <Route path="/profile" element={<Profile />} />

              {/* About Routes */}
              <Route path="/about/how-it-works" element={<HowItWorks />} />
              <Route path="/about/news" element={<News />} />
              <Route path="/about/investor" element={<Investor />} />
              <Route path="/about/careers" element={<Careers />} />

              {/* Community Routes */}
              <Route path="/community/diversity" element={<Diversity />} />
              <Route path="/community/accessibility" element={<Accessibility />} />
              <Route path="/community/partnership" element={<Partnership />} />
              <Route path="/community/gift-cards" element={<GiftCards />} />

              {/* Host Routes */}
              <Route path="/host/rent-out" element={<RentOut />} />
              <Route path="/host/experiences" element={<Experiences />} />
              <Route path="/host/responsible-hosting" element={<ResponsibleHosting />} />
              <Route path="/host/resource-center" element={<ResourceCenter />} />

              {/* Support Routes */}
              <Route path="/support/help-center" element={<HelpCenter />} />
              <Route path="/support/safety" element={<Safety />} />
              <Route path="/support/cancellation" element={<Cancellation />} />
              <Route path="/support/report-issue" element={<ReportIssue />} />
            </Routes>

            <Footer />
          </div>
        }
      />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="users" element={<UserAdmin />} />
        <Route path="rooms" element={<RoomAdmin />} />
        <Route path="location" element={<LocationAdmin />} />
        <Route path="bookings" element={<BookingAdmin />} />
      </Route>
    </Routes>
  </Router>
);