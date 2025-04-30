import React from 'react';
import { Grid, Card, CardContent, CardActionArea, Typography } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';

// Custom Styled CardActionArea for Ripple Animation
const StyledCardActionArea = styled(CardActionArea)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '& .MuiTouchRipple-root': {
    color: '#F57C00',
  },
}));

const RoleSelection = ({ selectedRole, onRoleSelect }) => {
  const roles = [
    { name: 'Admin', icon: <AdminPanelSettingsIcon sx={{ fontSize: 50, color: '#F57C00' }} /> },
    { name: 'Faculty', icon: <PersonIcon sx={{ fontSize: 50, color: '#F57C00' }} /> },
    { name: 'Alumni', icon: <GroupsIcon sx={{ fontSize: 50, color: '#F57C00' }} /> },
    { name: 'Student', icon: <SchoolIcon sx={{ fontSize: 50, color: '#F57C00' }} /> },
  ];

  return (
    <Grid container spacing={4} justifyContent="center" sx={{ marginBottom: 4, marginTop: 2 }}>
      {roles.map((role) => (
        <Grid item xs={12} sm={6} md={3} key={role.name}>
          <Card
            onClick={() => onRoleSelect(role.name)}
            sx={{
              cursor: 'pointer',
              borderRadius: '40px',
              overflow: 'hidden',
              height: 200,
              width: '100%',
              m: 'auto',
              backgroundColor: selectedRole === role.name ? '#e3f2fd' : '#ffffff',
              boxShadow: selectedRole === role.name ? 8 : 3,
              transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: selectedRole === role.name ? 'scale(1.05)' : 'scale(1)',
              '&:hover': {
                transform: 'scale(1.07)',
                backgroundColor: '#f0f7ff',
                boxShadow: 10,
              },
            }}
          >
            <StyledCardActionArea>
              {role.icon}
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1.3rem',
                    mt: 1,
                    color: '#000000',
                  }}
                >
                  {role.name}
                </Typography>
              </CardContent>
            </StyledCardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RoleSelection;
