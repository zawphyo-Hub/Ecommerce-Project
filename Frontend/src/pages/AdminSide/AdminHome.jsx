
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  People as UsersIcon,
  Person as AccountIcon,
  ShoppingCart as OrdersIcon,
  TrendingUp as TrendingIcon,
  
} from '@mui/icons-material';
import CategoryIcon from '@mui/icons-material/Category';
import { Shirt} from 'lucide-react';

const stats = [
  { title: 'Total Users', value: '1,234', icon: <UsersIcon />, color: '#2563eb' },
  { title: 'Category', value: '1', icon: <CategoryIcon />, color: '#7c3aed' },
  { title: 'Products', value: '567', icon: < Shirt size={24} />, color: '#16a34a' },
  { title: 'Orders', value: '890', icon: <OrdersIcon />, color: '#ea580c' },
];

function AdminHome(){
  const theme = useTheme();

  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} >
        {stats.map((stat, index) => (
          <Grid key={index} sx={{  width: '250px'}}>
            {/* item xs={12} sm={6} md={3} key={index} */}
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                cursor: 'pointer',
                borderRadius: '7px',
                '&:hover': {
                  border: '1px solid blue'
                  // transform: 'translateY(-4px)',
                  // boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      bgcolor: `${stat.color}20`,
                      color: stat.color,
                      mr: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h6" component="div">
                    {stat.title}
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: stat.color }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ mt: 4, p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Welcome to Fazi Admin Dashboard.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Use the navigation sidebar to access different sections of the admin panel. 
          
        </Typography>
      </Paper>
    </Box>
  );
};

export default AdminHome;