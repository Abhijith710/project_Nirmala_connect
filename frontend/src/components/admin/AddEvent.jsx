// src/components/admin/AddEvent.jsx

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from '@mui/material';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    guest: '',
    description: '',
    poster: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'poster') {
      const file = files[0];
      setFormData({ ...formData, poster: file });
      if (file) {
        setPreviewUrl(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        alert('Event added successfully!');
        setFormData({
          title: '',
          date: '',
          time: '',
          venue: '',
          guest: '',
          description: '',
          poster: null,
        });
        setPreviewUrl(null);
      } else {
        alert(result.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Submit Error:', error);
    }
  };

  return (
    <Grid container spacing={4} sx={{ p: 3 }}>
      {/* Form Section */}
      <Grid item xs={12} md={6}>
        <Box sx={{ bgcolor: '#fff', p: 3, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            Add New Event
          </Typography>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField label="Event Title" name="title" fullWidth required sx={{ mb: 2 }}
              value={formData.title} onChange={handleChange} />

            <TextField label="Date" type="date" name="date" fullWidth required sx={{ mb: 2 }}
              value={formData.date} onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: today }} />

            <TextField label="Time" type="time" name="time" fullWidth required sx={{ mb: 2 }}
              value={formData.time} onChange={handleChange}
              InputLabelProps={{ shrink: true }} />

            <TextField label="Venue" name="venue" fullWidth required sx={{ mb: 2 }}
              value={formData.venue} onChange={handleChange} />

            <TextField label="Guest" name="guest" fullWidth required sx={{ mb: 2 }}
              value={formData.guest} onChange={handleChange} />

            <TextField label="Description" name="description" multiline rows={4} fullWidth required sx={{ mb: 2 }}
              value={formData.description} onChange={handleChange} />

            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Add Poster
            </Typography>
            <input type="file" name="poster" accept="image/*" onChange={handleChange}
              style={{ marginBottom: '16px' }} />

            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add Event
            </Button>
          </form>
        </Box>
      </Grid>

      {/* Preview Section */}
      <Grid item xs={12} md={6}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Event Preview
          </Typography>
          <Card sx={{ display: 'flex', flexDirection: 'row', boxShadow: 3 }}>
            <Box sx={{ width: 250, display: 'flex', flexDirection: 'column', bgcolor: '#f7f7f7', p: 2 }}>
              <CardMedia
                component="img"
                image={previewUrl || 'https://png.pngtree.com/png-clipart/20230802/original/pngtree-booklet-flyer-icon-vector-picture-image_7831085.png'}
                alt="Poster Preview"
                sx={{ height: 160, width: '100%', objectFit: 'cover', borderRadius: 2 }}
              />
              <Box mt={2}>
                <Typography variant="body2"><strong>Venue:</strong> {formData.venue || '---'}</Typography>
                <Typography variant="body2"><strong>Date:</strong> {formData.date || '---'}</Typography>
                <Typography variant="body2"><strong>Time:</strong> {formData.time || '---'}</Typography>
              </Box>
            </Box>

            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>{formData.title || 'Event Title'}</Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                <strong>Guests:</strong> {formData.guest || '---'}
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {formData.description || 'Event description will appear here.'}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddEvent;
