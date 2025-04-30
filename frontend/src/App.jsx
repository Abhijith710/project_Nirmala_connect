import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Newspage from './pages/Newspage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/news" element={<Newspage />} />

        {/* Add more routes below as needed */}
      </Routes>

      {/* Toast container for global notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
