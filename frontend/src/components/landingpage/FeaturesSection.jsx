import React, { useState } from 'react';
import { Container, Grid, Typography, IconButton } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FeaturesSection = () => {
  const navigate = useNavigate();  // Hook for programmatic navigation
  const features = [
    {
      icon: <SchoolIcon fontSize="large" />,
      title: 'For Students',
      desc: 'Access course materials, stay updated, and grow your network.',
    },
    {
      icon: <GroupsIcon fontSize="large" />,
      title: 'For Faculty',
      desc: 'Manage courses, communicate with students, and share resources.',
    },
    {
      icon: <EmojiEventsIcon fontSize="large" />,
      title: 'For Alumni',
      desc: 'Reconnect with the college and contribute to the community.',
    },
  ];

  const handleCardClick = () => {
    navigate('/login');  // Redirect to login page
  };

  return (
    <Container
      id="features"
      maxWidth="false"
      disableGutters
      sx={{
        pt: 40, // increased from py: 10 to pt: 16 (more padding top)
        pb: 5, // padding bottom remains nice
        background: '#F0E68C', // NEW Stunning dark theme
        minHeight: '100vh',
      }}
    >
      {/* Keyframes */}
      <style>
        {`
          @keyframes moveBlueBorder {
            0% { background-position: 0 0, 0 0; }
            100% { background-position: 300% 0, 0 0; }
          }
          @keyframes pulseGlow {
            0% { box-shadow: 0px 0px 15px rgba(0, 114, 255, 0.5); }
            50% { box-shadow: 0px 0px 30px rgba(0, 114, 255, 0.9); }
            100% { box-shadow: 0px 0px 15px rgba(0, 114, 255, 0.5); }
          }
          @keyframes sparkle {
            0% { opacity: 0; transform: translateX(-75%) rotate(25deg); }
            50% { opacity: 1; }
            100% { opacity: 0; transform: translateX(125%) rotate(25deg); }
          }
        `}
      </style>

      <Grid container spacing={6} justifyContent="center">
        {features.map((item, i) => {
          const [rotateX, setRotateX] = useState(0);
          const [rotateY, setRotateY] = useState(0);
          const [hovered, setHovered] = useState(false);

          const handleMouseMove = (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateAmountX = (y - centerY) / 8;
            const rotateAmountY = (x - centerX) / 8;
            setRotateX(-rotateAmountX);
            setRotateY(rotateAmountY);
          };

          const handleMouseLeave = () => {
            setRotateX(0);
            setRotateY(0);
            setHovered(false);
          };

          const handleMouseEnter = () => {
            setHovered(true);
          };

          return (
            <Grid item xs={12} md={4} key={item.title} sx={{ display: 'flex', justifyContent: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { delay: i * 0.2, duration: 0.8, ease: 'easeOut' }
                }}
                viewport={{ once: false, amount: 0.5 }}
                style={{ width: '100%', maxWidth: 320, perspective: 1200 }}
                onClick={handleCardClick} // Clicking the card redirects to login page
              >
                <motion.div
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseEnter={handleMouseEnter}
                  animate={{ rotateX, rotateY }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  style={{
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    borderRadius: '20px',
                    padding: '24px',
                    textAlign: 'center',
                    background: '#1976D2',
                    border: '4px solid transparent',
                    backgroundImage: hovered
                      ? 'linear-gradient(#1b1b1b, #1b1b1b), linear-gradient(120deg, #00c6ff, #0072ff)'
                      : 'none',
                    backgroundOrigin: 'border-box',
                    backgroundClip: hovered ? 'padding-box, border-box' : 'padding-box',
                    animation: hovered ? 'moveBlueBorder 6s linear infinite, pulseGlow 2s ease-in-out infinite' : 'none',
                    transition: 'all 0.4s ease',
                    overflow: 'hidden',
                    cursor: 'pointer', // Indicates that the card is clickable
                  }}
                  whileHover={{
                    scale: 1.12,
                  }}
                >
                  {/* Sparkling Shine Effect */}
                  <motion.div
                    animate={{
                      left: ['-75%', '125%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'loop',
                      ease: 'easeInOut',
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      width: '50%',
                      height: '100%',
                      background: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                      transform: 'rotate(25deg)',
                      pointerEvents: 'none',
                      opacity: hovered ? 1 : 0.5,
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      y: -8,
                      transition: { type: 'spring', stiffness: 300 },
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    <IconButton color="secondary" size="large">
                      {item.icon}
                    </IconButton>
                  </motion.div>

                  <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold', color: '#fff' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1, color: '#ddd' }}>
                    {item.desc}
                  </Typography>
                </motion.div>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default FeaturesSection;
