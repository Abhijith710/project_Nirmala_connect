import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const DeletedUsers = () => {
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeletedUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/deleted');
      setDeletedUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching deleted users:', error);
      setLoading(false);
    }
  };

  const handleActivate = async (role, id) => {
    try {
      await axios.put(`http://localhost:5000/api/users/activate/${role}/${id}`);
      fetchDeletedUsers(); // Refresh list
    } catch (error) {
      console.error('Error activating user:', error);
    }
  };

  useEffect(() => {
    fetchDeletedUsers();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Deleted Users</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deletedUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleActivate(user.role, user.facultyId || user.alumniId)}
                    >
                      Activate
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {deletedUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">No deleted users found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default DeletedUsers;
