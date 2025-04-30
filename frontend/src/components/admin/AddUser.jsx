// src/components/admin/AddUser.jsx

import React, { useState } from 'react';
import {
  Box, TextField, Button, MenuItem, Select, InputLabel,
  FormControl, Typography, Card, CardContent, Grid
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddUser = () => {
  const [role, setRole] = useState('');

  const [facultyDetails, setFacultyDetails] = useState({
    role: '',
    department: '',
    subjectsTaught: '',
    facultyId: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    address: '',
    joiningDate: '',
    profilePicture: null,
    password: '',
    confirmPassword: ''
  });

  const [alumniDetails, setAlumniDetails] = useState({
    alumniId: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    graduationYear: '',
    gender: '',
    address: '',
    jobField: '',
    jobTitle: '',
    company: '',
    linkedInProfile: '',
    profilePicture: null,
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e, formType) => {
    const { name, value, files } = e.target;
    const fieldValue = files ? files[0] : value;

    if (formType === 'faculty') {
      setFacultyDetails({ ...facultyDetails, [name]: fieldValue });
    } else {
      setAlumniDetails({ ...alumniDetails, [name]: fieldValue });
    }
  };

  const handleSubmit = async (e, formType) => {
    e.preventDefault();
    const formData = new FormData();

    if (formType === 'faculty') {
      for (const key in facultyDetails) {
        if (key !== 'confirmPassword') {
          formData.append(key, facultyDetails[key]);
        }
      }

      try {
        const res = await axios.post(
          'http://localhost:5000/api/users/register/faculty',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        toast.success(res.data.message || 'Faculty registered successfully!');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error registering faculty');
      }
    }

    if (formType === 'alumni') {
      for (const key in alumniDetails) {
        if (key !== 'confirmPassword') {
          formData.append(key, alumniDetails[key]);
        }
      }

      try {
        const res = await axios.post(
          'http://localhost:5000/api/users/register/alumni',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        toast.success(res.data.message || 'Alumni registered successfully!');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error registering alumni');
      }
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add User
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Card
            sx={{ cursor: 'pointer', border: role === 'Faculty' ? '2px solid #3f51b5' : '1px solid #ccc' }}
            onClick={() => setRole('Faculty')}
          >
            <CardContent>
              <Typography variant="h6">Faculty</Typography>
              <Typography variant="body2">Add a faculty member</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card
            sx={{ cursor: 'pointer', border: role === 'Alumni' ? '2px solid #3f51b5' : '1px solid #ccc' }}
            onClick={() => setRole('Alumni')}
          >
            <CardContent>
              <Typography variant="h6">Alumni</Typography>
              <Typography variant="body2">Add an alumni member</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {role === 'Faculty' && (
        <form onSubmit={(e) => handleSubmit(e, 'faculty')}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={facultyDetails.role}
              onChange={(e) => handleInputChange(e, 'faculty')}
              label="Role"
              fullWidth
              required
              name="role"
            >
              <MenuItem value="Teacher">Teacher</MenuItem>
              <MenuItem value="Office Staff">Office Staff</MenuItem>
              <MenuItem value="Worker">Worker</MenuItem>
            </Select>
          </FormControl>

          <TextField label="Department" name="department" value={facultyDetails.department} onChange={(e) => handleInputChange(e, 'faculty')} fullWidth sx={{ mb: 2 }} required />

          {facultyDetails.role === 'Teacher' && (
            <TextField label="Subjects Taught" name="subjectsTaught" value={facultyDetails.subjectsTaught} onChange={(e) => handleInputChange(e, 'faculty')} fullWidth sx={{ mb: 2 }} required />
          )}

          <TextField label="Faculty ID" name="facultyId" value={facultyDetails.facultyId} onChange={(e) => handleInputChange(e, 'faculty')} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Full Name" name="fullName" value={facultyDetails.fullName} onChange={(e) => handleInputChange(e, 'faculty')} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Email" name="email" value={facultyDetails.email} onChange={(e) => handleInputChange(e, 'faculty')} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Phone Number" name="phoneNumber" value={facultyDetails.phoneNumber} onChange={(e) => handleInputChange(e, 'faculty')} fullWidth sx={{ mb: 2 }} required />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Gender</InputLabel>
            <Select name="gender" value={facultyDetails.gender} onChange={(e) => handleInputChange(e, 'faculty')} label="Gender" fullWidth required>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          <TextField label="Address" name="address" value={facultyDetails.address} onChange={(e) => handleInputChange(e, 'faculty')} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Joining Date" type="date" name="joiningDate" value={facultyDetails.joiningDate} onChange={(e) => handleInputChange(e, 'faculty')} fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} required />

          <Button variant="contained" component="label" sx={{ mb: 2 }}>
            Upload Profile Picture
            <input type="file" name="profilePicture" onChange={(e) => handleInputChange(e, 'faculty')} hidden />
          </Button>

          <TextField label="Password" type="password" name="password" value={facultyDetails.password} onChange={(e) => handleInputChange(e, 'faculty')} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Confirm Password" type="password" name="confirmPassword" value={facultyDetails.confirmPassword} onChange={(e) => handleInputChange(e, 'faculty')} fullWidth sx={{ mb: 2 }} required />

          <Button type="submit" variant="contained" color="primary">Add Faculty</Button>
        </form>
      )}

      {role === 'Alumni' && (
        <form onSubmit={(e) => handleSubmit(e, 'alumni')}>
          <TextField label="Alumni ID" name="alumniId" value={alumniDetails.alumniId} onChange={(e) => handleInputChange(e, 'alumni')} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Full Name" name="fullName" value={alumniDetails.fullName} onChange={(e) => handleInputChange(e, 'alumni')} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Email" name="email" value={alumniDetails.email} onChange={(e) => handleInputChange(e, 'alumni')} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Phone Number" name="phoneNumber" value={alumniDetails.phoneNumber} onChange={(e) => handleInputChange(e, 'alumni')} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Graduation Year" name="graduationYear" type="number" value={alumniDetails.graduationYear} onChange={(e) => handleInputChange(e, 'alumni')} fullWidth sx={{ mb: 2 }} required />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Gender</InputLabel>
            <Select name="gender" value={alumniDetails.gender} onChange={(e) => handleInputChange(e, 'alumni')} label="Gender" fullWidth required>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          <TextField label="Address" name="address" value={alumniDetails.address} onChange={(e) => handleInputChange(e, 'alumni')} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Job Field" name="jobField" value={alumniDetails.jobField} onChange={(e) => handleInputChange(e, 'alumni')} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Job Title" name="jobTitle" value={alumniDetails.jobTitle} onChange={(e) => handleInputChange(e, 'alumni')} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Company" name="company" value={alumniDetails.company} onChange={(e) => handleInputChange(e, 'alumni')} fullWidth sx={{ mb: 2 }} required />
          <TextField label="LinkedIn Profile" name="linkedInProfile" value={alumniDetails.linkedInProfile} onChange={(e) => handleInputChange(e, 'alumni')} fullWidth sx={{ mb: 2 }} />

          <Button variant="contained" component="label" sx={{ mb: 2 }}>
            Upload Profile Picture
            <input type="file" name="profilePicture" onChange={(e) => handleInputChange(e, 'alumni')} hidden />
          </Button>

          <TextField label="Password" type="password" name="password" value={alumniDetails.password} onChange={(e) => handleInputChange(e, 'alumni')} fullWidth sx={{ mb: 2 }} required />
          <TextField label="Confirm Password" type="password" name="confirmPassword" value={alumniDetails.confirmPassword} onChange={(e) => handleInputChange(e, 'alumni')} fullWidth sx={{ mb: 2 }} required />

          <Button type="submit" variant="contained" color="primary">Add Alumni</Button>
        </form>
      )}
    </Box>
  );
};

export default AddUser;
