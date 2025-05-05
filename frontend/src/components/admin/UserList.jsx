import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Button,
  Stack,
} from '@mui/material';
import EditModal from './EditModal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/users/all');
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setOpenEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const id = editUser.alumniId || editUser.facultyId;
    const role = editUser.role;
    try {
      await axios.put(`http://localhost:5000/api/users/update/${role}/${id}`, editUser);
      setOpenEditModal(false);
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId, role) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/delete/${role}/${userId}`);
      setUsers(users.filter((user) => user.alumniId !== userId && user.facultyId !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        All Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell>Role</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.alumniId || user.facultyId}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() =>
                        handleDelete(user.alumniId || user.facultyId, user.role)
                      }
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <EditModal
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
        user={editUser}
        onChange={handleInputChange}
        onSubmit={handleUpdate}
      />
    </Box>
  );
};

export default UserList;
