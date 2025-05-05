// src/components/admin/AdminSidebar.jsx

import React from 'react';
import { List, ListItemButton, ListItemText, Collapse, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({ selectedSection, setSelectedSection }) => {
  const navigate = useNavigate();

  const [openManageEvents, setOpenManageEvents] = React.useState(false);
  const [openManageUsers, setOpenManageUsers] = React.useState(false);
  const [openManageNews, setOpenManageNews] = React.useState(false);

  const handleToggleManageEvents = () => setOpenManageEvents(!openManageEvents);
  const handleToggleManageUsers = () => setOpenManageUsers(!openManageUsers);
  const handleToggleManageNews = () => setOpenManageNews(!openManageNews);

  const handleNavigateToNews = () => {
    navigate('/news'); // Make sure "/news" is a valid route
  };

  return (
    <List component="nav" sx={{ width: '100%', maxWidth: 250 }}>
      
      {/* Manage Users */}
      <ListItemButton onClick={handleToggleManageUsers}>
        <ListItemText primary="Manage Users" />
        {openManageUsers ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openManageUsers} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => setSelectedSection('AddUser')}>
            <ListItemText primary="Add User" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => setSelectedSection('UserList')}>
            <ListItemText primary="User List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => setSelectedSection('RemoveUser')}>
            <ListItemText primary="Remove User" />
          </ListItemButton>
        </List>
      </Collapse>

      {/* Manage News */}
      <ListItemButton onClick={handleToggleManageNews}>
      <ListItemText
          primary="Manage News/Announcement"
          primaryTypographyProps={{ noWrap: true }} // Keeps it one line
        />
        {openManageNews ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openManageNews} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={handleNavigateToNews}>
            <ListItemText primary="Add News/Announcement" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigateToNews('EditNews')}>
            <ListItemText primary="Edit News" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => setSelectedSection('DeleteNews')}>
            <ListItemText primary="Delete News" />
          </ListItemButton>
        </List>
      </Collapse>

      {/* Manage Events */}
      <ListItemButton onClick={handleToggleManageEvents}>
        <ListItemText primary="Manage Events" />
        {openManageEvents ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openManageEvents} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => setSelectedSection('AddEvent')}>
            <ListItemText primary="Add Event" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => setSelectedSection('EditEvent')}>
            <ListItemText primary="Edit Event" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => setSelectedSection('DeleteEvent')}>
            <ListItemText primary="Delete Event" />
          </ListItemButton>
        </List>
      </Collapse>

      {/* Traffic Analytics */}
      <ListItemButton onClick={() => setSelectedSection('TrafficAnalytics')}>
        <ListItemText primary="Traffic Analytics" />
      </ListItemButton>
    </List>
  );
};

export default AdminSidebar;

