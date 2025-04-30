// import React, { useState, useEffect } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Container,
//   Grid,
//   useScrollTrigger,
//   Slide,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
// import MenuIcon from '@mui/icons-material/Menu';
// import SchoolIcon from '@mui/icons-material/School';
// import GroupsIcon from '@mui/icons-material/Groups';
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import { motion } from 'framer-motion';
// import heroImage from '../assets/hero.png'; // Add a relevant hero image in assets

// // Hide on scroll AppBar effect
// function HideOnScroll({ children }) {
//   const trigger = useScrollTrigger();
//   return (
//     <Slide appear={false} direction="down" in={!trigger}>
//       {children}
//     </Slide>
//   );
// }

// const LandingPage = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [navBg, setNavBg] = useState('transparent');

//   const handleDrawerToggle = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const handleScroll = () => {
//     setNavBg(window.scrollY > 50 ? '#ffffff' : 'transparent');
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const featureVariants = {
//     hidden: { opacity: 0, y: 60, scale: 0.8 },
//     visible: (i = 1) => ({
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         delay: i * 0.2,
//         duration: 0.8,
//         ease: 'easeOut',
//       },
//     }),
//   };

//   return (
//     <Box
//       sx={{
//         background: 'linear-gradient(90deg, #d53369 0%, #daae51 100%)',
//         color: '#fff',
//         fontFamily: 'Source Sans Pro, sans-serif',
//       }}
//     >
//       {/* Navbar */}
//       <AppBar
//         position="fixed"
//         elevation={4}
//         sx={{
//           backgroundColor: navBg,
//           color: navBg !== 'transparent' ? '#000' : '#fff',
//           transition: 'background-color 0.3s ease',
//         }}
//       >
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
//           {/* Logo/Text */}
//           <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
//             <AirplanemodeActiveIcon sx={{ mr: 1 }} />
//             Nirmala Connect
//           </Typography>

//           {/* Mobile Menu Icon */}
//           {isMobile ? (
//             <IconButton edge="end" color="inherit" onClick={handleDrawerToggle}>
//               <MenuIcon />
//             </IconButton>
//           ) : (
//             // Desktop Menu (Inline)
//             <Box sx={{ display: 'flex', gap: 2 }}>
//               <Button color="inherit">Home</Button>
//               <Button color="inherit">Features</Button>
//               <Button color="inherit">Events</Button>
//               <Button color="inherit">Help</Button>
//               <Button variant="contained" color="secondary" sx={{ borderRadius: 999 }}>
//                 Login
//               </Button>
//             </Box>
//           )}
//         </Toolbar>
//       </AppBar>

//       {/* Drawer (for mobile) */}
//       <Drawer
//         anchor="left"
//         open={drawerOpen}
//         onClose={handleDrawerToggle}
//         sx={{
//           '.MuiDrawer-paper': {
//             backgroundColor: '#fff',
//             color: '#000',
//             width: 250,
//           },
//         }}
//       >
//         <List>
//           <ListItem button>
//             <ListItemText primary="Home" />
//           </ListItem>
//           <ListItem button>
//             <ListItemText primary="Features" />
//           </ListItem>
//           <ListItem button>
//             <ListItemText primary="Events" />
//           </ListItem>
//           <ListItem button>
//             <ListItemText primary="Help" />
//           </ListItem>
//           <ListItem button>
//             <ListItemText primary="Login" sx={{ fontWeight: 'bold' }} />
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* Hero Section */}
//       <Box
//         sx={{
//           position: 'relative',
//           height: '100vh',
//           background: `url(${heroImage}) center center fixed`,
//           backgroundSize: 'cover',
//           backgroundAttachment: 'fixed',
//         }}
//       >
//         {/* Blurry Overlay */}
//         <Box
//           sx={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             backdropFilter: 'blur(8px)',
//             zIndex: 1,
//           }}
//         />

//         <Container maxWidth="lg" sx={{ pt: 16, pb: 8, zIndex: 2, position: 'relative' }}>
//         <Grid container spacing={4} alignItems="center">
//   {/* Left Text Section */}
//   <Grid item xs={12} md={6}>
//     <motion.div
//       initial={{ opacity: 0, y: 50, scale: 0.8 }}
//       whileInView={{ opacity: 1, y: 0, scale: 1 }}
//       viewport={{ once: false, amount: 0.6 }}
//       transition={{ duration: 1, ease: 'easeOut' }}
//     >
//       <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
//         Connect. Learn. Grow.
//       </Typography>
//       <Typography variant="h6" sx={{ mb: 4 }}>
//         A platform to connect students, faculty, and alumni of Nirmala College.
//       </Typography>
//       <Button variant="contained" sx={{ borderRadius: 999, fontWeight: 'bold', px: 4 }}>
//         Explore Now
//       </Button>
//     </motion.div>
//   </Grid>

//   {/* Right Image Section */}
//  <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
//   <motion.img
//     src={heroImage}
//     alt="College life"
//     style={{ width: '50%', borderRadius: '250px' }}
//     initial={{ opacity: 0, y: 80, scale: 0.8 }}  // Initial opacity and scale
//     whileInView={{ opacity: 1, y: 0, scale: 1 }} // When in view, fully visible
//     viewport={{ once: false, amount: 0.9 }} // Triggers when 90% of the element is visible
//     transition={{ duration: 1, ease: 'easeOut' }} // Smooth transition when scrolling
//     whileHover={{
//       scale: 1.10,
//       boxShadow: '10px 60px 24px rgba(0, 0, 0, 0.4)',
//       transition: {
//         duration: 0.4,
//         ease: 'easeInOut',
//       },
//     }}
//   />
// </Grid>

// </Grid>
//         </Container>
//       </Box>

// {/* Features Section */}
// <Container maxWidth="lg" sx={{ py: 10 }}>
//   <Grid container spacing={6} justifyContent="center">
//     {[
//       {
//         icon: <SchoolIcon fontSize="large" />,
//         title: 'For Students',
//         desc: 'Access course materials, stay updated, and grow your network.',
//       },
//       {
//         icon: <GroupsIcon fontSize="large" />,
//         title: 'For Faculty',
//         desc: 'Manage courses, communicate with students, and share resources.',
//       },
//       {
//         icon: <EmojiEventsIcon fontSize="large" />,
//         title: 'For Alumni',
//         desc: 'Reconnect with the college and contribute to the community.',
//       },
//     ].map((item, i) => {
//       const [rotateX, setRotateX] = useState(0);
//       const [rotateY, setRotateY] = useState(0);
//       const [shine, setShine] = useState(false);
//       const [hovered, setHovered] = useState(false);

//       const handleMouseMove = (e) => {
//         const rect = e.currentTarget.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;
//         const centerX = rect.width / 2;
//         const centerY = rect.height / 2;

//         // Increased tilt sensitivity
//         const rotateAmountX = (y - centerY) / 8;
//         const rotateAmountY = (x - centerX) / 8;

//         setRotateX(-rotateAmountX);
//         setRotateY(rotateAmountY);
//         setShine(true);
//       };

//       const handleMouseLeave = () => {
//         setRotateX(0);
//         setRotateY(0);
//         setShine(false);
//         setHovered(false);
//       };

//       const handleMouseEnter = () => {
//         setHovered(true);
//       };

//       return (
//         <Grid
//           item
//           xs={12}
//           md={4}
//           key={item.title}
//           sx={{ display: 'flex', justifyContent: 'center' }}
//         >
//           <motion.div
//             custom={i}
//             variants={featureVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: false, amount: 0.5 }}
//             style={{
//               width: '100%',
//               maxWidth: 320,
//               perspective: 1200,
//             }}
//           >
//             <motion.div
//               onMouseMove={handleMouseMove}
//               onMouseLeave={handleMouseLeave}
//               onMouseEnter={handleMouseEnter}
//               animate={{ rotateX, rotateY }}
//               transition={{ type: 'spring', stiffness: 200, damping: 20 }}
//               style={{
//                 position: 'relative',
//                 transformStyle: 'preserve-3d',
//                 borderRadius: '20px',
//                 padding: '24px',
//                 textAlign: 'center',
//                 background: '#ffffff11',
//                 overflow: 'hidden',
//                 border: '4px solid transparent',
//                 backgroundImage: hovered
//                   ? 'linear-gradient(#1b1b1b, #1b1b1b), linear-gradient(120deg, #00c6ff, #0072ff)'
//                   : 'none',
//                 backgroundOrigin: 'border-box',
//                 backgroundClip: hovered ? 'padding-box, border-box' : 'padding-box',
//                 animation: hovered ? 'moveBlueBorder 6s linear infinite, pulseGlow 2s ease-in-out infinite' : 'none',
//               }}
//               whileHover={{
//                 scale: 1.12,
//                 boxShadow: '0px 0px 30px rgba(0, 114, 255, 0.6)', // Blue glow
//               }}
//             >
//               {/* Shine effect */}
//               {shine && (
//                 <motion.div
//                   initial={{ left: '-75%' }}
//                   animate={{ left: '125%' }}
//                   transition={{ duration: 1.2, ease: 'easeInOut' }}
//                   style={{
//                     content: '""',
//                     position: 'absolute',
//                     top: 0,
//                     left: '-75%',
//                     width: '50%',
//                     height: '100%',
//                     background: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
//                     transform: 'rotate(25deg)',
//                     pointerEvents: 'none',
//                   }}
//                 />
//               )}

//               {/* Icon */}
//               <motion.div
//                 whileHover={{
//                   y: -8,
//                   transition: { type: 'spring', stiffness: 300 },
//                 }}
//                 style={{ display: 'inline-block' }}
//               >
//                 <IconButton color="secondary" size="large">
//                   {item.icon}
//                 </IconButton>
//               </motion.div>

//               <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold', color: '#fff' }}>
//                 {item.title}
//               </Typography>
//               <Typography variant="body1" sx={{ mt: 1, color: '#eee' }}>
//                 {item.desc}
//               </Typography>
//             </motion.div>
//           </motion.div>
//         </Grid>
//       );
//     })}
//   </Grid>
// </Container>

// {/* Animated border + pulse glow keyframes */}
// <style>
// {`
// @keyframes moveBlueBorder {
//   0% {
//     background-position: 0 0, 0 0;
//   }
//   100% {
//     background-position: 300% 0, 0 0;
//   }
// }

// @keyframes pulseGlow {
//   0% {
//     box-shadow: 0px 0px 15px rgba(0, 114, 255, 0.5);
//   }
//   50% {
//     box-shadow: 0px 0px 30px rgba(0, 114, 255, 0.9);
//   }
//   100% {
//     box-shadow: 0px 0px 15px rgba(0, 114, 255, 0.5);
//   }
// }
// `}
// </style>
// {/* Events Section */}
// <Container maxWidth="lg" sx={{ py: 10 }}>
//   <Typography
//     variant="h4"
//     align="center"
//     sx={{ fontWeight: 'bold', mb: 6, color: '#fff' }}
//   >
//     Upcoming Events
//   </Typography>
//   <Grid container spacing={4} justifyContent="center">
//     {[
//       {
//         title: 'Tech Symposium 2025',
//         date: 'May 20, 2025',
//         desc: 'Explore the latest innovations and network with tech leaders.',
//       },
//       {
//         title: 'Alumni Meet & Greet',
//         date: 'June 15, 2025',
//         desc: 'Reconnect and share your journey with fellow alumni.',
//       },
//       {
//         title: 'Cultural Fest 2025',
//         date: 'July 10, 2025',
//         desc: 'Celebrate the vibrant spirit of our college community.',
//       },
//     ].map((event, i) => (
//       <Grid item xs={12} md={3.5} key={event.title}>
//         <motion.div
//           initial={{ opacity: 0, y: 60 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: false, amount: 0.4 }}
//           transition={{ duration: 0.6, delay: i * 0.2 }}
//         >
//           <Box
//             sx={{
//               backgroundColor: '#ffffff11',
//               borderRadius: 4,
//               p: 3,
//               height: '100%',
//               backdropFilter: 'blur(8px)',
//               border: '2px solid #ffffff22',
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'space-between',
//               transition: 'transform 0.3s',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//                 boxShadow: '0px 8px 24px rgba(255,255,255,0.2)',
//               },
//             }}
//           >
//             <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
//               {event.title}
//             </Typography>
//             <Typography variant="body2" sx={{ mt: 1, color: '#ccc' }}>
//               {event.date}
//             </Typography>
//             <Typography variant="body2" sx={{ mt: 2, color: '#eee' }}>
//               {event.desc}
//             </Typography>
//           </Box>
//         </motion.div>
//       </Grid>
//     ))}

//     {/* See More Card */}
//     <Grid item xs={12} md={3.5}>
//       <motion.div
//         initial={{ opacity: 0, y: 60 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: false, amount: 0.4 }}
//         transition={{ duration: 0.6, delay: 0.6 }}
//       >
//         <Box
//           onClick={() => window.location.href = '/login'}
//           sx={{
//             backgroundColor: '#ffffff11',
//             borderRadius: 4,
//             p: 3,
//             height: '100%',
//             backdropFilter: 'blur(8px)',
//             border: '2px dashed #ffffff44',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             color: '#fff',
//             fontWeight: 'bold',
//             fontSize: '1.2rem',
//             cursor: 'pointer',
//             transition: 'transform 0.3s, background-color 0.3s',
//             '&:hover': {
//               backgroundColor: '#ffffff22',
//               transform: 'scale(1.05)',
//               boxShadow: '0px 8px 24px rgba(255,255,255,0.2)',
//             },
//           }}
//         >
//           See More →
//         </Box>
//       </motion.div>
//     </Grid>
//   </Grid>
// </Container>

//       {/* Footer */}
//       <Box sx={{ backgroundColor: '#1f2937', py: 4, mt: 8 }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={6}>
//               <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
//                 Nirmala Connect
//               </Typography>
//               <Typography variant="body2" sx={{ color: '#aaa' }}>
//                 Empowering education through connection and collaboration.
//               </Typography>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//                 <Button sx={{ color: '#fff' }}>Privacy</Button>
//                 <Button sx={{ color: '#fff' }}>Terms</Button>
//                 <Button sx={{ color: '#fff' }}>Contact</Button>
//               </Box>
//             </Grid>
//           </Grid>
//           <Typography variant="body2" align="center" sx={{ color: '#888', mt: 4 }}>
//             © {new Date().getFullYear()} Nirmala Connect. All rights reserved.
//           </Typography>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default LandingPage;

















import React from 'react';
import { Box } from '@mui/material';
import LandingPageNavbar from '../components/landingpage/LandingPageNavbar';
import HeroSection from '../components/landingpage/HeroSection';
import FeaturesSection from '../components/landingpage/FeaturesSection';
import EventsSection from '../components/landingpage/EventsSection';
import GallerySection from '../components/landingpage/GallerySection';
import FooterSection from '../components/landingpage/FooterSection';

const LandingPage = () => {
  return (
    <Box>
      <LandingPageNavbar />
      <HeroSection />
      <FeaturesSection />
      <EventsSection />
      <GallerySection />
      <FooterSection />
    </Box>
  );
};

export default LandingPage;
