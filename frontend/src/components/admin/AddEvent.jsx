// src/components/admin/AddEvent.jsx

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit event data
    console.log('Event added:', { title, date, description });

    // Reset form after submission
    setTitle('');
    setDate('');
    setDescription('');
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Add New Event
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Event Title */}
        <TextField
          label="Event Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: 2 }}
          required
        />

        {/* Event Date */}
        <TextField
          label="Event Date"
          type="date"
          variant="outlined"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ marginBottom: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />

        {/* Event Description */}
        <TextField
          label="Event Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ marginBottom: 2 }}
          required
        />

        {/* Submit Button */}
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Add Event
        </Button>
      </form>
    </Box>
  );
};

export default AddEvent;
