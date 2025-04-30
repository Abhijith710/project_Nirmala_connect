import React, { useState } from 'react';
import { Box, Typography, Container, Card, CardContent, Dialog, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';
import img5 from '../../assets/img5.jpg';
import img6 from '../../assets/img6.jpg';
import CloseIcon from '@mui/icons-material/Close';

// Replace the galleryImages with the imported images
const galleryImages = [img1, img2, img3, img4, img5, img6];

const GallerySection = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [openLightbox, setOpenLightbox] = useState(false); // State to control lightbox visibility
  const [currentImage, setCurrentImage] = useState(''); // State to store the current image

  const handleImageClick = (imageUrl) => {
    setCurrentImage(imageUrl); // Set the image for the lightbox
    setOpenLightbox(true); // Open the lightbox modal
  };

  const handleCloseLightbox = () => {
    setOpenLightbox(false); // Close the lightbox
  };

  const handleViewMoreClick = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <section id="gallery">
      <Container sx={{ py: { xs: 8, sm: 12 } }}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }} // Change to false to trigger every time it comes into view
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 'bold',
              mb: 6,
              color: '#222',
              textTransform: 'uppercase',
            }}
          >
            Gallery
          </Typography>
        </motion.div>

        {/* Gallery Grid */}
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 2,
            paddingBottom: 3,
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory', // Ensure smooth scroll behavior with snapping
          }}
        >
          {galleryImages.map((imgUrl, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -100 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: false }} // Continuous animation on scroll
              transition={{ duration: 0.6, delay: index * 0.1 }}
              key={index}
            >
              <Box
                component="img"
                src={imgUrl}
                alt={`Gallery ${index + 1}`}
                sx={{
                  width: '300px',
                  height: 250,
                  objectFit: 'cover',
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: 'transform 0.3s ease',
                  scrollSnapAlign: 'center', // Ensures each image is centered during scroll
                  '&:hover': {
                    transform: 'scale(1.05)',
                    cursor: 'pointer',
                  },
                }}
                onClick={() => handleImageClick(imgUrl)} // Open lightbox on click
              />
            </motion.div>
          ))}
        </Box>

        {/* View More Card */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Card
            sx={{
              maxWidth: 300,
              cursor: 'pointer',
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6,
              },
            }}
            onClick={handleViewMoreClick} // Handle click to redirect
          >
            <CardContent sx={{ textAlign: 'center', backgroundColor: '#f5f5f5' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                View More
              </Typography>
              <Typography variant="body2" sx={{ color: '#777' }}>
                Explore more images from our gallery.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>

      {/* Lightbox Modal */}
      <Dialog open={openLightbox} onClose={handleCloseLightbox} maxWidth="md" fullWidth>
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Box
            component="img"
            src={currentImage}
            alt="Lightbox Image"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Ensure the image fills the modal and retains aspect ratio
              borderRadius: 2,
            }}
          />
          <IconButton
            onClick={handleCloseLightbox}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: '#fff',
              zIndex: 10,
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      </Dialog>
    </section>
  );
};

export default GallerySection;
