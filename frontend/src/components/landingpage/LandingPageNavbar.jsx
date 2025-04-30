import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent } from '@mui/material';
import LogoIcon from '@mui/icons-material/School'; 
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, useTheme, Slide, useScrollTrigger } from '@mui/material';
import React from 'react';

const HideOnScroll = React.forwardRef(function HideOnScroll(props, ref) {
  const { children } = props;
  const trigger = useScrollTrigger();

  if (!React.isValidElement(children)) {
    return children;
  }

  return (
    <Slide appear={false} direction="down" in={!trigger} ref={ref}>
      {React.cloneElement(children, { ref })}
    </Slide>
  );
});

const LandingPageNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navBg, setNavBg] = useState('transparent');
  const [openHelpDialog, setOpenHelpDialog] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleScroll = () => {
    setNavBg(window.scrollY > 50 ? '#1976D2' : 'transparent'); // Transparent initially, Medium Blue after scroll
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openHelpManual = () => {
    setOpenHelpDialog(true);
  };

  const closeHelpManual = () => {
    setOpenHelpDialog(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HideOnScroll>
   <AppBar
  position="fixed"
  elevation={0}
  sx={{
    backgroundColor: navBg === 'transparent' ? 'rgba(255, 255, 255, 0.1)' : '#1976D2',
    backdropFilter: navBg === 'transparent' ? 'blur(10px)' : 'none',
    WebkitBackdropFilter: navBg === 'transparent' ? 'blur(10px)' : 'none',
    color: '#FFFFFF',
    zIndex: 1301,
    transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
  }}
>

        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
              color: '#FFFFFF',
            }}
          >
            <LogoIcon sx={{ mr: 1, color: '#000000' }} />
            Nirmala Connect
          </Typography>

          {isMobile ? (
            <IconButton edge="end" onClick={handleDrawerToggle} sx={{ color: '#FFFFFF' }}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {/* Desktop Navbar */}
              <Button
                sx={{
                  color: '#FFFFFF',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }, // Light hover on transparent
                }}
                onClick={scrollToTop}
              >
                Home
              </Button>
              <Button
                sx={{
                  color: '#FFFFFF',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                }}
                onClick={() => scrollToSection('features')}
              >
                Features
              </Button>
              <Button
                sx={{
                  color: '#FFFFFF',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                }}
                onClick={() => scrollToSection('events')}
              >
                Events
              </Button>
              <Button
                sx={{
                  color: '#FFFFFF',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                }}
                onClick={() => scrollToSection('gallery')}
              >
                Gallery
              </Button>
              <Button
                sx={{
                  color: '#FFFFFF',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                }}
                onClick={openHelpManual}
              >
                Help
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#F57C00',
                  color: '#FFFFFF',
                  borderRadius: 999,
                  '&:hover': {
                    backgroundColor: '#E65100',
                  },
                }}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '.MuiDrawer-paper': {
            backgroundColor: '#FFFFFF',
            color: '#000000',
            width: 250,
          },
        }}
      >
        <List>
          <ListItem button onClick={scrollToTop}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => scrollToSection('features')}>
            <ListItemText primary="Features" />
          </ListItem>
          <ListItem button onClick={() => scrollToSection('events')}>
            <ListItemText primary="Events" />
          </ListItem>
          <ListItem button onClick={() => scrollToSection('gallery')}>
            <ListItemText primary="Gallery" />
          </ListItem>
          <ListItem button onClick={openHelpManual}>
            <ListItemText primary="Help" />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary="Login"
              sx={{ fontWeight: 'bold', color: '#F57C00' }}
            />
          </ListItem>
        </List>
      </Drawer>

      {/* Help Dialog */}
      <Dialog open={openHelpDialog} onClose={closeHelpManual} maxWidth="sm" fullWidth>
        <DialogContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            User Manual
          </Typography>
          <Typography variant="body1" sx={{ color: '#555' }}>
            Welcome to the Nirmala Connect platform! Here’s how you can make the most of it:
          </Typography>
          <ul>
            <li><Typography variant="body2">Browse the gallery for event photos and updates.</Typography></li>
            <li><Typography variant="body2">Access features like course enrollments and event registrations.</Typography></li>
            <li><Typography variant="body2">For any help, click the Help button to view this manual again.</Typography></li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeHelpManual}
            sx={{
              backgroundColor: '#F57C00',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#E65100',
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </HideOnScroll>
  );
};

export default LandingPageNavbar;
