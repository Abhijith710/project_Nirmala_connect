import React, { useState } from 'react';
import {
  TextField, Button, Grid, Box, Typography, Fade
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const LoginForm = ({ selectedRole }) => {
  const navigate = useNavigate();
  const [adminCode, setAdminCode] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [alumniId, setAlumniId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = { role: selectedRole, password };

    switch (selectedRole) {
      case 'Admin':
        payload.adminId = adminCode;
        break;
      case 'Faculty':
        payload.facultyId = facultyId;
        break;
      case 'Student':
        payload.studentId = studentId;
        break;
      case 'Alumni':
        payload.alumniId = alumniId;
        break;
      default:
        return toast.error('Invalid role selected.');
    }

    try {
      const { data } = await axios.post('http://localhost:5000/api/login', payload);
      toast.success(`${selectedRole} logged in successfully`);
      console.log('Login success:', data);

      // Optional: Save token in localStorage/sessionStorage
      // localStorage.setItem('token', data.token);

      if (selectedRole === 'Admin') {
        navigate('/admin/dashboard');
      }
      // You can add redirects for other roles here if needed
      
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Login failed';
      toast.error(errMsg);
      console.error('Login error:', errMsg);
    }
  };

  return (
    <Fade in={Boolean(selectedRole)} timeout={600}>
      <Box
        sx={{
          marginTop: 4,
          backgroundColor: '#f9f9f9',
          padding: 4,
          borderRadius: '25px',
          boxShadow: 6,
          maxWidth: 500,
          mx: 'auto',
          mb: 6,
          border: '2px solid #e0e0e0'
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: 3,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#000000'
          }}
        >
          Login as {selectedRole}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="column">
            {selectedRole === 'Admin' && (
              <Grid item>
                <TextField
                  label="Admin ID"
                  variant="outlined"
                  fullWidth
                  required
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                />
              </Grid>
            )}

            {selectedRole === 'Faculty' && (
              <Grid item>
                <TextField
                  label="Faculty ID (Department/ID)"
                  variant="outlined"
                  fullWidth
                  required
                  value={facultyId}
                  onChange={(e) => setFacultyId(e.target.value)}
                />
              </Grid>
            )}

            {selectedRole === 'Alumni' && (
              <Grid item>
                <TextField
                  label="Alumni ID"
                  variant="outlined"
                  fullWidth
                  required
                  value={alumniId}
                  onChange={(e) => setAlumniId(e.target.value)}
                />
              </Grid>
            )}

            {selectedRole === 'Student' && (
              <Grid item>
                <TextField
                  label="Student ID (Class/RollNo)"
                  variant="outlined"
                  fullWidth
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </Grid>
            )}

            <Grid item>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  borderRadius: '30px',
                  paddingY: 1.5,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#F57C00'
                  }
                }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Fade>
  );
};

export default LoginForm;
