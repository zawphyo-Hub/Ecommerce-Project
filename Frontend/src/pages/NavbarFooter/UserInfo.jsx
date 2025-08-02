import React from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../../assets/fazi.png';

const UserInfo = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Successfully Logout.")
    navigate('/');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: 420,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Logo */}
        <Box sx={{display:"flex", justifyContent: "center"}}>
            <Box 
            display="flex" 
            component="img"
            justifyContent="center"
            sx={{width:"25px", height: "25px"}}
            src={Logo}>
         
            </Box>

            {/* Title */}
            <Typography
            variant="h6"
            sx={{ pl:"8px", fontWeight: 'bold', textAlign: 'center',}}
            >
            Profile
            </Typography>

        </Box>
        

        <Divider />

        {/* User Details */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body1">
            <strong>User ID:</strong> {user?.userId}
          </Typography>
          <Typography variant="body1">
            <strong>Full Name:</strong> {user?.fullName}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {user?.email}
          </Typography>
        </Box>

        {/* Logout Button */}
        <Button
          variant="contained"
          
          sx={{ mt: 3, backgroundColor:"blue", 
            '&:hover': {
            backgroundColor: 'darkblue', // or any other shade
            } }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
};

export default UserInfo;
