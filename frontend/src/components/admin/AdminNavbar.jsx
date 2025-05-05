// src/components/Admin/AdminNavbar.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaUserCircle } from 'react-icons/fa';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('/admin/profile');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: '#1976D2',
        padding: '12px 20px',
        borderRadius: '0 0 10px 10px',
        color: '#FFFFFF',
      }}
    >
      {/* Left: Logo and Title */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <FaGraduationCap size={24} style={{ marginRight: '10px' }} />
        <h1 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Nirmala Connect</h1>
      </div>

      {/* Right: Profile and Logout */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <FaUserCircle
          size={26}
          onClick={handleProfile}
          style={{ cursor: 'pointer' }}
          title="Profile"
        />
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 14px',
            backgroundColor: '#F57C00',
            border: 'none',
            borderRadius: '6px',
            color: '#FFFFFF',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
