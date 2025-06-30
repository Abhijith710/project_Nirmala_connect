import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
} from '@mui/material';
import axios from 'axios';

const ViewNews = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/news');
      setNewsList(res.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const getImageUrl = (image) => {
    if (!image) {
      return 'https://cdn-icons-png.flaticon.com/512/2965/2965878.png';
    }
    if (image.startsWith('http')) return image;
    return `http://localhost:5000/uploads/${image}`;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        News & Announcements
      </Typography>

      <Grid container spacing={3}>
        {newsList.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
              
              {/* Image Section with Controlled Height */}
              <CardMedia
                component="img"
                image={getImageUrl(item.image)}
                alt={item.title}
                sx={{
                  height: 180,
                  width: '100%',
                  objectFit: 'cover',
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                }}
              />

              {/* Content Section */}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom noWrap>
                  {item.title}
                </Typography>

                <Chip
                  label={item.type === 'announcement' ? 'Announcement' : 'News'}
                  color={item.type === 'announcement' ? 'warning' : 'info'}
                  size="small"
                  sx={{ mb: 1 }}
                />

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewNews;
