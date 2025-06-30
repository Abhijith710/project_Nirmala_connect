import React from 'react';
import { Box, Container, Grid, Button, Typography } from '@mui/material';
import img from '../../assets/img.png'; // Make sure the path is correct
import { motion } from 'framer-motion';
import LogoIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';


const HeroSection = () => {
    const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');  // Redirect to login page
  };
  return (
    <Box
      id="nirmala-connect"
      sx={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(-45deg, #F0E68C, #FFFFFF, #F0E68C, #FFFFFF)',
        backgroundSize: '400% 400%',
        animation: 'gradientFlow 15s ease infinite',
      }}
    >
      {/* Gradient animation */}
      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes falling {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .snowflake {
          position: absolute;
          top: -10px;
          color:rgb(0, 0, 0); /* Adjust color */
          font-size: 1.5em; /* Adjust size */
          animation: falling linear infinite;
          z-index: 2;
        }
      `}</style>

      {/* Animated snowflakes with LogoIcon */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${12 + Math.random() * 10}px`,
              opacity: Math.random(),
            }}
          >
            <LogoIcon sx={{ fontSize: 'inherit' }} /> {/* Display LogoIcon */}
          </span>
        ))}
      </Box>

      {/* Blur overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(4px)',
          zIndex: 1,
        }}
      />

      {/* Main content */}
      <Container maxWidth="lg" sx={{ pt: 16, pb: 8, zIndex: 3, position: 'relative' }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  color: '#1976D2',
                }}
              >
                Connect. Learn. Grow.
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  color: '#000000',
                }}
              >
                Welcome to Nirmala Connect — where students, faculty, and alumni come together as one vibrant community! It's more than just a platform; it's a space to share experiences, inspire one another, and grow both personally and professionally. Whether you're looking to find mentors, reconnect with old friends, or make new memories, Nirmala Connect is here to keep the spirit of Nirmala College alive, wherever life takes you.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#F57C00',
                  color: '#FFFFFF',
                  borderRadius: 999,
                  fontWeight: 'bold',
                  px: 4,
                  '&:hover': {
                    backgroundColor: '#E65100',
                  },
                }}
                onClick={handleClick}
              >
                Explore Now
              </Button>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            {/* Add motion effects to the image to "pop" while scrolling */}
            <motion.img
              src={img}
              alt="College life"
              style={{
                width: '100%',
                maxWidth: '1000px', // Limit maximum width
                borderRadius: '50px',
                display: 'block', // Ensure the image is displayed as a block
              }}
              initial={{ opacity: 0, y: 80, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.7 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              whileHover={{
                scale: 1.10,
                boxShadow: '10px 60px 24px rgba(0, 0, 0, 0.4)',
                transition: {
                  duration: 0.4,
                  ease: 'easeInOut',
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
