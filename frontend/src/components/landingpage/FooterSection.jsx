import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Box, Typography, Container, Link, Stack, IconButton, Modal } from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School'; // Temporary logo

const FooterSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleOpenModal = (contentType) => {
    setModalContent(contentType);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalContent('');
  };
// Modal background color based on content
const getModalBackground = () => {
  switch (modalContent) {
    case 'about':
      return 'linear-gradient(135deg, #43cea2,rgb(98, 176, 124))'; // Greenish
    case 'privacy':
      return 'linear-gradient(135deg, #36d1dc, #5b86e5)'; // Bluish
    case 'terms':
      return 'linear-gradient(135deg, #a18cd1,rgb(48, 37, 162))'; // Purple-pink
    default:
      return '#333'; // fallback
  }
};

  // Modal Content Mapping
  const getModalContent = () => {
    switch (modalContent) {
      case 'about':
        return 'Nirmala Connect is a platform connecting Students, Faculty, and Alumni to foster collaboration and growth.';
      case 'privacy':
        return 'Your data privacy is important to us. We ensure your information is secure and never shared without consent.';
      case 'terms':
        return 'By using Nirmala Connect, you agree to abide by our terms of service and community guidelines.';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1c1c1c, #0f0f0f)',
          color: '#ccc',
          pt: 5,
          pb: 3,
          borderTop: '1px solid #444',
        }}
      >
        <Container maxWidth="lg">
          {/* Main Footer Content */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              textAlign: { xs: 'center', sm: 'left' },
              mb: 4,
            }}
          >
            {/* Left: Nirmala Connect Logo */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', sm: 'flex-start' },
                mb: { xs: 3, sm: 0 },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <SchoolIcon sx={{ fontSize: 32, color: '#00c6ff', mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 20, color: '#fff' }}>
                  Nirmala Connect
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontSize: 14, color: '#aaa' }}>
                Connecting Students, Teachers & Alumni.
              </Typography>
            </Box>

            {/* Center-Left: Go To Links */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', sm: 'center' },
                mb: { xs: 3, sm: 0 },
              }}
            >
              <Typography variant="h6" sx={{ fontSize: 16, mb: 1, color: '#fff' }}>
                Go To
              </Typography>
              <ScrollLink to="nirmala-connect" smooth={true} duration={600} spy={true} offset={-70} style={linkStyle}>
  Nirmala Connect
</ScrollLink>
<ScrollLink to="features" smooth={true} duration={600} spy={true} offset={-70} style={linkStyle}>
  Features
</ScrollLink>
<ScrollLink to="events" smooth={true} duration={600} spy={true} offset={-70} style={linkStyle}>
  Events
</ScrollLink>
<ScrollLink to="gallery" smooth={true} duration={600} spy={true} offset={-70} style={linkStyle}>
  Gallery
</ScrollLink>
            </Box>

            {/* Center-Right: Notices */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', sm: 'center' },
                mb: { xs: 3, sm: 0 },
              }}
            >
              <Typography variant="h6" sx={{ fontSize: 16, mb: 1, color: '#fff' }}>
                Notices
              </Typography>
              <Link 
  onClick={() => handleOpenModal('about')} 
  underline="hover" 
  sx={{ cursor: 'pointer', ...linkStyle }}
>
                About Us
              </Link>
              <Link onClick={() => handleOpenModal('privacy')} underline="hover" sx={{ cursor: 'pointer', ...linkStyle }}>
                Privacy Policy
              </Link>
              <Link onClick={() => handleOpenModal('terms')} underline="hover" sx={{ cursor: 'pointer', ...linkStyle }}>
                Terms of Service
              </Link>
            </Box>

            {/* Right: Social Icons */}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                flex: 1,
                justifyContent: { xs: 'center', sm: 'flex-end' },
                alignItems: 'center',
              }}
            >
              <IconButton
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener"
                sx={iconButtonStyle}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener"
                sx={iconButtonStyle}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                href="mailto:someone@example.com"
                sx={iconButtonStyle}
                aria-label="Email"
              >
                <EmailIcon />
              </IconButton>
            </Stack>
          </Box>

          {/* Bottom: Copyright */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 14 }, color: '#aaa' }}>
              © 2025 Nirmala Connect. All rights reserved.
            </Typography>
          </Box>

      {/* Modal for Notices */}
<Modal open={openModal} onClose={handleCloseModal} closeAfterTransition>
  <Box
    sx={{
      outline: 'none',
      backdropFilter: 'blur(6px)', // Blurred background
      backgroundColor: 'rgba(0,0,0,0.3)',
      width: '100%',
      height: '100%',
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.8 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: getModalBackground(),
        borderRadius: '16px',
        padding: '32px',
        width: '80%',
        maxWidth: '420px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        overflow: 'hidden',
      }}
    >
      {/* Close Button */}
      <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
        <IconButton onClick={handleCloseModal} sx={{ color: '#fff' }}>
          ✕
        </IconButton>
      </Box>

      {/* Modal Heading */}
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 600, color: '#fff' }}>
        {modalContent === 'about' && 'About Us'}
        {modalContent === 'privacy' && 'Privacy Policy'}
        {modalContent === 'terms' && 'Terms of Service'}
      </Typography>

      {/* Modal Content */}
      <Typography variant="body2" sx={{ color: '#f5f5f5', textAlign: 'center' }}>
        {getModalContent()}
      </Typography>
    </motion.div>
  </Box>
</Modal>


        </Container>
      </Box>
    </motion.div>
  );
};

// --- Styling Constants ---
const linkStyle = {
  color: '#ccc',
  fontSize: 14,
  mb: 0.5,
  '&:hover': {
    color: '#00c6ff',
  },
};

const iconButtonStyle = {
  color: '#ccc',
  '&:hover': {
    color: '#00c6ff',
  },
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '80%', sm: 400 },
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default FooterSection;
