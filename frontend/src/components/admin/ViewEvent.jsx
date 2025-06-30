import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewEvent = () => {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // For managing dialog state
  const [selectedEvent, setSelectedEvent] = useState(null); // For storing the selected event to be edited
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    guest: '',
    description: '',
    poster: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events/viewevents');
      setEvents(res.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/events/delete/${id}`);
      setEvents(events.filter((e) => e._id !== id));
    } catch (error) {
      console.error('Delete Error:', error);
      alert('Failed to delete event');
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      date: new Date(event.date).toISOString().split('T')[0], // Format date for input type="date"
      time: event.time,
      venue: event.venue,
      guest: event.guest,
      description: event.description,
      poster: event.poster,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
    setFormData({
      title: '',
      date: '',
      time: '',
      venue: '',
      guest: '',
      description: '',
      poster: null,
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        data.append(key, value); // Append only non-null values
      }
    });
    try {
      const res = await axios.put(`http://localhost:5000/api/events/update/${selectedEvent._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure it's sent as form-data
        },
      });
  
      if (res.status === 200) {
        setEvents(events.map(event => event._id === selectedEvent._id ? res.data.event : event));
        handleCloseDialog();
        alert('Event updated successfully!');
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error('Submit Error:', error);
      alert('Failed to update event');
    }
  };
  

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const getPosterUrl = (poster) => {
    if (!poster) return 'https://png.pngtree.com/png-clipart/20230802/original/pngtree-booklet-flyer-icon-vector-picture-image_7831085.png';
    if (poster.startsWith('http')) return poster;
    return `http://localhost:5000/uploads/${poster}`;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Events
      </Typography>

      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event._id}>
            <Card sx={{ display: 'flex', flexDirection: 'row', boxShadow: 3, width: '100%', height: '100%' }}>
              {/* Left Section: Image + Venue/Date/Time */}
              <Box
                sx={{
                  width: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  bgcolor: '#f7f7f7',
                  p: 2,
                  borderRadius: 2
                }}
              >
                <CardMedia
                  component="img"
                  image={getPosterUrl(event.poster)}
                  alt={event.title}
                  sx={{
                    height: 180,
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: 2
                  }}
                />

                <Box mt={2}>
                  <Typography variant="body2"><strong>Venue:</strong> {event.venue}</Typography>
                  <Typography variant="body2"><strong>Date:</strong> {formatDate(event.date)}</Typography>
                  <Typography variant="body2"><strong>Time:</strong> {formatTime(event.time)}</Typography>
                </Box>
              </Box>

              {/* Right Section: Title, Guest, Description, Buttons */}
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h5" gutterBottom>{event.title}</Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  <strong>Guests:</strong> {event.guest}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {event.description}
                </Typography>

                {/* Buttons */}
                <Stack direction="row" spacing={2} mt={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(event)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Event Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmitEdit}>
            <TextField
              label="Event Title"
              name="title"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Date"
              type="date"
              name="date"
              fullWidth
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Time"
              type="time"
              name="time"
              fullWidth
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Venue"
              name="venue"
              fullWidth
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Guest"
              name="guest"
              fullWidth
              value={formData.guest}
              onChange={(e) => setFormData({ ...formData, guest: e.target.value })}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Description"
              name="description"
              multiline
              rows={4}
              fullWidth
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              sx={{ mb: 2 }}
            />

            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Add Poster
            </Typography>
            <input
              type="file"
              name="poster"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, poster: e.target.files[0] })}
              style={{ marginBottom: '16px' }}
            />

            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
              <Button type="submit" color="primary">Save Changes</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ViewEvent;
