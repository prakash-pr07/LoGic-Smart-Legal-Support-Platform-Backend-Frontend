import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicHomePage from "./pages/PublicHomePage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
// Import your page components here, e.g.
// import PublicHomePage from "./pages/PublicHomePage";
// import LoginPage from "./pages/Login";
// import SignupPage from "./pages/Signup";

function App() {
  const user = null; // Replace with useContext or localStorage in real app

  const logout = () => {
    toast.success("Logged out successfully!");
    // remove token, clear state, etc.
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar user={user} logout={logout} />

        <Routes>
          {/* Add your routes here like: */}
          <Route path="/" element={<PublicHomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;

