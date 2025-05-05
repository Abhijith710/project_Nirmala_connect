// src/components/admin/AddEvent.jsx

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'poster') {
      setFormData({ ...formData, poster: files[0] });
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
      } else {
        alert(result.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Submit Error:', error);
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Add New Event
      </Typography>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField label="Event Title" name="title" fullWidth required sx={{ mb: 2 }}
          value={formData.title} onChange={handleChange} />

        <TextField label="Date" type="date" name="date" fullWidth required sx={{ mb: 2 }}
          value={formData.date} onChange={handleChange} InputLabelProps={{ shrink: true }} />

        <TextField label="Time" type="time" name="time" fullWidth required sx={{ mb: 2 }}
          value={formData.time} onChange={handleChange} InputLabelProps={{ shrink: true }} />

        <TextField label="Venue" name="venue" fullWidth required sx={{ mb: 2 }}
          value={formData.venue} onChange={handleChange} />

        <TextField label="Guest" name="guest" fullWidth required sx={{ mb: 2 }}
          value={formData.guest} onChange={handleChange} />

        <TextField label="Description" name="description" multiline rows={4} fullWidth required sx={{ mb: 2 }}
          value={formData.description} onChange={handleChange} />
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
  Add Poster
</Typography>
        <input type="file" name="poster" accept="image/*" onChange={handleChange} style={{ marginBottom: '16px' }} />

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Add Event
        </Button>
      </form>
    </Box>
  );
};

export default AddEvent;
