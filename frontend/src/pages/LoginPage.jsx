import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import LoginPageNavbar from '../components/loginpage/LoginPageNavbar';
import RoleSelection from '../components/loginpage/RoleSelection';
import LoginForm from '../components/loginpage/LoginForm';

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState('');

  return (
    <>
      {/* Main Page Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF', // White background
        zIndex: -1,
      }} />

      {/* Navbar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <LoginPageNavbar />
      </motion.div>

      {/* Main Content */}
      <Container
        maxWidth="md"
        sx={{
          paddingTop: '120px',
          textAlign: 'center',
          minHeight: '100vh',
          color: '#000000', // Black text
        }}
      >
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: '#000000', // Primary heading text
            }}
          >
            Login to Continue
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#F57C00', // Highlighted sub-title
              mb: 4,
            }}
          >
            Please select your role
          </Typography>
        </motion.div>

        {/* Role Selection Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Box
            sx={{
              backgroundColor: '#F0E68C', // Khaki background for the card/box
              padding: 4,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <RoleSelection selectedRole={selectedRole} onRoleSelect={setSelectedRole} />
          </Box>
        </motion.div>

        {/* Form Section */}
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginTop: '30px' }}
          >
            <Box
              sx={{
                backgroundColor: '#F0E68C', // Khaki background for form too
                padding: 4,
                borderRadius: 3,
                boxShadow: 3,
              }}
            >
              <LoginForm selectedRole={selectedRole} />
            </Box>
          </motion.div>
        )}
      </Container>
    </>
  );
};

export default LoginPage;
