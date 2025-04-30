import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LogoIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';

const LoginPageNavbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar 
      position="fixed" 
      elevation={4} 
      sx={{ backgroundColor: '#ffffff', color: '#000000' }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo and App Name */}
        <Box 
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
          onClick={() => navigate('/')}
        >
          <LogoIcon sx={{ mr: 1, color: '#F57C00' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Nirmala Connect
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            sx={{
              color: '#000000',
              fontWeight: 'bold',
              '&:hover': {
                color: '#F57C00'
              }
            }}
            onClick={() => navigate('/')}
          >
            Home
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LoginPageNavbar;
