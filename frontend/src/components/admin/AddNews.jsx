import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Stack, CircularProgress } from '@mui/material';
import axios from 'axios';

const AddNews = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'news', // Default type is 'news'
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prevState) => ({
        ...prevState,
        image: files[0],
      }));
      setPreviewUrl(URL.createObjectURL(files[0])); // Show the preview image
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('type', formData.type);
    if (formData.image) formDataToSubmit.append('image', formData.image);

    try {
      await axios.post('http://localhost:5000/api/news/add', formDataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('News/Announcement created successfully!');

      // Reset the form after successful submission
      setFormData({
        title: '',
        description: '',
        type: 'news',
        image: null,
      });

      // Clear the image preview
      setPreviewUrl(null);
    } catch (error) {
      console.error('Error creating news/announcement:', error);
      alert('Failed to create news/announcement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add News/Announcement
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          fullWidth
          required
          sx={{ mb: 2 }}
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          multiline
          rows={4}
          fullWidth
          required
          sx={{ mb: 2 }}
          value={formData.description}
          onChange={handleChange}
        />
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button
            variant={formData.type === 'news' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setFormData((prevState) => ({ ...prevState, type: 'news' }))}
          >
            News
          </Button>
          <Button
            variant={formData.type === 'announcement' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setFormData((prevState) => ({ ...prevState, type: 'announcement' }))}
          >
            Announcement
          </Button>
        </Stack>

        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Add Image (Optional)
        </Typography>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          style={{ marginBottom: '16px' }}
        />

        {previewUrl && <img src={previewUrl} alt="Preview" width="100%" height="auto" style={{ marginBottom: '16px' }} />}

        <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
        </Button>
      </form>
    </Box>
  );
};

export default AddNews;
