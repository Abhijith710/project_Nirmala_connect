// src/pages/AdminDashboard.jsx

import React, { useState } from 'react';
import { Box } from '@mui/material';
import AdminNavbar from '../components/admin/AdminNavbar';
import AdminSidebar from '../components/admin/AdminSidebar';

// Importing all admin features (dummy for now, real components later)
import AddEvent from '../components/admin/AddEvent';
// import EditEvent from '../components/admin/EditEvent';
// import DeleteEvent from '../components/admin/DeleteEvent';
import AddUser from '../components/admin/AddUser';
// import RemoveUser from '../components/admin/RemoveUser';
 import UserList from '../components/admin/UserList';
import Header from '../components/News/NewsPage';
import NewsPage from '../components/News/NewsPage';
import DeletedUsers from '../components/admin/DeletedUsers';
import TrafficAnalytics from '../components/admin/TrafficAnalytics';
import ViewEvent from '../components/admin/ViewEvent';
import AddNewsOrAnnouncement from '../components/admin/AddNews';
import AddNews from '../components/admin/AddNews';
import ViewNews from '../components/admin/ViewNews';
// import AddNews from '../components/admin/AddNews';
// import EditNews from '../components/admin/EditNews';
// import DeleteNews from '../components/admin/DeleteNews';
// import TrafficAnalytics from '../components/admin/TrafficAnalytics';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('');

  const renderSection = () => {
    switch (selectedSection) {
      case 'AddEvent':
        return <AddEvent />;
      case 'ViewEvent':
        return <ViewEvent />;
      case 'AddUser':
        return <AddUser />;
      case 'UserList':
        return <UserList />;
        case 'DeletedUserList':
          return <DeletedUsers />;
      case 'AddNews':
        return <AddNews />;
      case 'ViewNews':
        return <ViewNews/>;
      default:
        return (
          <Box p={3}>
           <TrafficAnalytics />;
          </Box>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top Navbar */}
      <AdminNavbar />

      {/* Main Content */}
      <Box sx={{ display: 'flex', flex: 1, marginTop: '64px' }}> {/* 64px = height of AppBar */}
        {/* Sidebar */}
        <Box sx={{ width: '250px', bgcolor: '#f5f5f5', height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
          <AdminSidebar selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
        </Box>

        {/* Main Section */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {renderSection()}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
