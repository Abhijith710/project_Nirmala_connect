// src/components/admin/AdminSidebar.jsx

import React from 'react';
import { List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const AdminSidebar = ({ selectedSection, setSelectedSection }) => {
  const [openManageEvents, setOpenManageEvents] = React.useState(false);
  const [openManageUsers, setOpenManageUsers] = React.useState(false);
  const [openManageNews, setOpenManageNews] = React.useState(false);

  const handleToggleManageEvents = () => setOpenManageEvents(!openManageEvents);
  const handleToggleManageUsers = () => setOpenManageUsers(!openManageUsers);
  const handleToggleManageNews = () => setOpenManageNews(!openManageNews);

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
          <ListItemButton sx={{ pl: 4 }} onClick={() => setSelectedSection('DeletedUserList')}>
            <ListItemText primary="Deleted Users" />
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
          <ListItemButton sx={{ pl: 4 }} onClick={() => setSelectedSection('ViewEvent')}>
            <ListItemText primary="View Event" />
          </ListItemButton>
        </List>
      </Collapse>



      {/* Manage News */}
      <ListItemButton onClick={handleToggleManageNews}>
        <ListItemText primary="Manage News" />
        {openManageNews ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openManageNews} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => setSelectedSection('AddNews')}>
            <ListItemText primary="Add News" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => setSelectedSection('ViewNews')}>
            <ListItemText primary="View News" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

export default AdminSidebar;
