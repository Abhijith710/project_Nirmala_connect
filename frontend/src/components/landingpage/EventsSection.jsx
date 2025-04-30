import React from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // <-- Import this for the bouncing arrow

const EventsSection = () => {
  const navigate = useNavigate();

  const events = [
    { title: 'Annual College Fest', date: 'May 10, 2025' },
    { title: 'Alumni Meet', date: 'June 15, 2025' },
    { title: 'Faculty Workshop', date: 'July 5, 2025' },
  ];

  return (
    <Container id="events"
      maxWidth="false"
      disableGutters
      sx={{
        pt: 10, // <<< increased from py: 10 to pt: 16 (more padding top)
        pb: 10, // padding bottom remains nice
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '80vh',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 8,
          textAlign: 'center',
          color: '#333',
          letterSpacing: 1,
        }}
      >
        Upcoming Events
      </Typography>

      <Grid container spacing={6} justifyContent="center">
        {events.map((event, index) => (
          <Grid item xs={12} md={4} key={event.title} sx={{ display: 'flex', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: index * 0.2,
                ease: 'easeOut',
              }}
              viewport={{ once: false, amount: 0.5 }}
              whileHover={{
                y: -10,
                scale: 1.05,
                boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.15)',
                backgroundColor: '#ffffff',
                transition: { duration: 0.3 },
              }}
              style={{
                width: '100%',
                maxWidth: 320,
                background: '#f9fafc',
                padding: '30px',
                borderRadius: '20px',
                border: '1px solid #dce1e7',
                textAlign: 'center',
                transition: 'all 0.3s ease',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  mb: 2,
                }}
              >
                {event.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#555',
                  mb: 4,
                }}
              >
                {event.date}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#6a11cb',
                  backgroundImage: 'linear-gradient(315deg, #6a11cb 0%, #2575fc 74%)',
                  color: '#fff',
                  borderRadius: '999px',
                  textTransform: 'none',
                  px: 4,
                  py: 1,
                  fontWeight: 'bold',
                  boxShadow: '0px 4px 12px rgba(106, 17, 203, 0.4)',
                  '&:hover': {
                    backgroundImage: 'linear-gradient(315deg, #2575fc 0%, #6a11cb 74%)',
                    boxShadow: '0px 6px 15px rgba(106, 17, 203, 0.6)',
                  },
                }}
              >
                Read More
              </Button>
            </motion.div>
          </Grid>
        ))}

        {/* See More Card with Bouncing Arrow */}
        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: 'easeOut',
            }}
            viewport={{ once: false, amount: 0.5 }}
            whileHover={{
              y: -10,
              scale: 1.05,
              boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.15)',
              backgroundColor: '#ffffff',
              transition: { duration: 0.3 },
            }}
            onClick={() => navigate('/login')}
            style={{
              width: '100%',
              maxWidth: 320,
              background: '#f0f2f5',
              padding: '30px',
              borderRadius: '20px',
              border: '2px dashed #b0b8c1',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#555',
                mb: 2,
              }}
            >
              See More Events
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#777',
              }}
            >
              Login to explore all events
            </Typography>

            {/* Bouncing Arrow */}
            <motion.div
              animate={{
                y: [0, -5, 0], // up and down motion for the bouncing effect
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#6a11cb', // Arrow color to match the gradient theme
              }}
            >
              <ArrowForwardIcon fontSize="large" />
            </motion.div>
          </motion.div>
        </Grid>

      </Grid>
    </Container>
  );
};

export default EventsSection;
