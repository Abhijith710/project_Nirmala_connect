import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';

const EditModal = ({ open, handleClose, user, onChange, onSubmit }) => {
  if (!user) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Full Name"
          name="fullName"
          value={user.fullName || ''}
          onChange={onChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={user.email || ''}
          onChange={onChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={user.phoneNumber || ''}
          onChange={onChange}
          fullWidth
          margin="normal"
        />
        <TextField
  label="Address"
  name="address"
  value={user.address || ''}
  onChange={onChange}
  fullWidth
  margin="normal"
/>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary" variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
