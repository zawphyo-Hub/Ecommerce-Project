
import React, { useState } from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Button,
} from '@mui/material';
import {
  People as UsersIcon,
  AccountCircle as AccountIcon,
  ShoppingCart as OrdersIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { Shirt, LogOut, Home } from 'lucide-react';
import Logo from '../../assets/fazi.png';
import { useNavigate } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import { toast } from 'react-toastify';

const drawerWidth = 280;


const AdminSidebar = ({ children }) => {

    
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('/adminhome');
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavItemClick = (path) => {
    setActiveItem(path);
    navigate(path); //navigate to the path given
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setTimeout(() => {
      toast.success('Successfully Logout.');

    }, 700)
    
    setTimeout(() => {
      navigate('/');

    }, 1000)
   
    
  }

  
  const navItems = [
    { text: 'Home', icon: <Home />, path: '/admin/adminhome' },
    { text: 'User Accounts', icon: <UsersIcon />, path: '/admin/useraccount' },
    { text: 'Category', icon: <CategoryIcon size={24} />, path: '/admin/category' },
    { text: 'Products', icon: <Shirt size={24} />, path: '/admin/product' },
    { text: 'Orders', icon: <OrdersIcon />, path: '/admin/orderlist' },
    { text: 'Logout', icon: <LogOut color="red" size={24} />, color: 'red', onClick: handleLogout},

  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <img src={Logo} alt="Fazi Logo" style={{ width: 20, height: 20 }} />
        <Typography
          variant="h5"
          className="magneto-font"
          sx={{
            fontWeight: 'bold',
            fontFamily: 'Magneto',
            color: '#2563eb',
            letterSpacing: '1px',
          }}
        >
          Fazi
        </Typography>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List sx={{ px: 2, py: 3 }}>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                  } else {
                    handleNavItemClick(item.path);
                  }
                }}
                sx={{
                  borderRadius: 2,
                  minHeight: 48,
                  bgcolor: activeItem === item.path ? '#2563eb' : 'transparent',
                  color: activeItem === item.path ? 'white' : theme.palette.text.primary,
                  '&:hover': {
                    bgcolor: activeItem === item.path 
                      ? '#1d4ed8' 
                      : theme.palette.action.hover,
                    transform: 'translateX(4px)',
                    transition: 'all 0.2s ease-in-out',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activeItem === item.path ? 'white' : theme.palette.text.secondary,
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  
                />
              </ListItemButton>
            </ListItem>
          ))}
                    
        </List>
        
      </Box>
      

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          textAlign: 'center',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          © 2025 Fazi Admin
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Mobile menu button */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: 'absolute',
            // top: 16,
            // left: 16,
            top: 15,
            right: 16,
            zIndex: theme.zIndex.drawer + 1,
            bgcolor: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
            '&:hover': {
              bgcolor: theme.palette.action.hover,
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: theme.palette.background.paper,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: theme.palette.background.paper,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          bgcolor: theme.palette.background.default,
          pt: { xs: 8, md: 0 }, // Add top padding on mobile for menu button
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminSidebar;