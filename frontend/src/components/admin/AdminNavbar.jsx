// src/components/Admin/AdminNavbar.jsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LogoIcon from '@mui/icons-material/School'; // Same logo as landing page
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleProfile = () => {
    // Navigate to admin profile page (to be created later)
    navigate('/admin/profile');
  };

  const handleLogout = () => {
    // Clear any admin session here if you have
    navigate('/');
  };

  return (
    <AppBar position="fixed" elevation={4} sx={{ backgroundColor: '#ffffff', color: '#000000' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo and Name */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LogoIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Nirmala Connect
          </Typography>
        </Box>

        {/* Buttons */}
        <Box>
          <Button color="inherit" onClick={handleProfile}>
            Profile
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
