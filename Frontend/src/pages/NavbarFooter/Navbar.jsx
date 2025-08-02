import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ShoppingCart,
  Menu as MenuIcon,
  ExpandMore,
  Person,
  KeyboardArrowDown,
  Close,
} from '@mui/icons-material';
import { FaziIcon } from './components/Icon';
import { useCart } from '../Cart/Component/CartFunction';

function Navbar(){
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [shirtsAnchorEl, setShirtsAnchorEl] = useState(null);
  const [pantsAnchorEl, setPantsAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { state } = useCart();
  
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "null"));
  }, [location]);

  const handleShirtsClick = (event) => {
    setShirtsAnchorEl(event.currentTarget);
  };

  const handlePantsClick = (event) => {
    setPantsAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setShirtsAnchorEl(null);
    setPantsAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigateAndCloseMenu = (path, hash) => {
    handleClose();
    setMobileOpen(false);
    if (hash) {
      navigate(path);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(path);
    }
  };

  //For humburger menu mobile responsive
  const drawer = (
    <Box sx={{ width: 250 }}>
      {/* Header with close button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        < FaziIcon />
        
        <IconButton onClick={handleDrawerToggle}>
          <MenuIcon sx={{color: 'darkred'}}/>
        </IconButton>
      </Box>
      <Divider />
      
      <List sx={{ pt: 0 }}>
        <ListItem 
          
          onClick={() => navigateAndCloseMenu('/home')}
          sx={{ 
            cursor: 'pointer',
            backgroundColor: 'white',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
          }}
        >
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem 
          
          onClick={() => navigateAndCloseMenu('/clothes')}
          sx={{ 
            cursor: 'pointer',
            backgroundColor: 'white',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
          }}
        >
          <ListItemText primary="Clothes" />
        </ListItem>

         <ListItem 
          
          onClick={() => navigateAndCloseMenu('/orderhistory')}
          sx={{ 
            cursor: 'pointer',
            backgroundColor: 'white',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
          }}
        >
          <ListItemText primary="Order History" />
        </ListItem>
        
        {/* <Accordion sx={{ boxShadow: 'none', backgroundColor: 'white' }}>
          <AccordionSummary 
            expandIcon={<ExpandMore />}
            sx={{ backgroundColor: 'white' }}
          >
            <Typography>Shirts</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: 'white', p: 0 }}>
            <List sx={{border: 1}}>
              <ListItem 
                 
                onClick={() => navigateAndCloseMenu('/cloth', 'tshirtSection')}
                sx={{ 
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                }}
              >
                <ListItemText primary="T-Shirts" />
              </ListItem>
              <ListItem 
                
                onClick={() => navigateAndCloseMenu('/shirts', 'poloSection')}
                sx={{ 
                  backgroundColor: 'white',cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                }}
              >
                <ListItemText primary="Polo Shirt" />
              </ListItem>
              <ListItem 
                
                 
                onClick={() => navigateAndCloseMenu('/shirts', 'teeSection')}
                sx={{ 
                  backgroundColor: 'white', cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                }}
              >
                <ListItemText primary="Tee Collections" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ boxShadow: 'none', backgroundColor: 'white' }}>
          <AccordionSummary 
            expandIcon={<ExpandMore />}
            sx={{ backgroundColor: 'white' }}
          >
            <Typography>Pants</Typography>

          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: 'white', p: 0 }}>
            <List sx={{border: 1}}>
              <ListItem 
               
                onClick={() => navigateAndCloseMenu('/pants', 'jeanSection')}
                sx={{ 
                  backgroundColor: 'white', cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                }}
              >
                <ListItemText primary="Jeans" />
              </ListItem>
              <ListItem 
                
                onClick={() => navigateAndCloseMenu('/pants', 'sweatpantSection')}
                sx={{ 
                  backgroundColor: 'white', cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                }}
              >
                <ListItemText primary="Sweat Pants" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <ListItem 
          
          onClick={() => navigateAndCloseMenu('/orderhistory')}
          sx={{ 
            backgroundColor: 'white', cursor: 'pointer',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
          }}
        >
          <ListItemText primary="Sweaters | Hoodies" />
        </ListItem> */}

        <Divider sx={{ my: 1 }} />
        
        {/* <ListItem 
          component={Button}
          onClick={() => navigateAndCloseMenu('/')}
          sx={{ 
            backgroundColor: 'white', cursor: 'pointer',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
          }}
        >
          <ListItemText primary="Login" />
        </ListItem> */}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: 'white',
          color: 'black',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          < FaziIcon />

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Button 
                component={Link} 
                to="/home"
                sx={{ color: 'black', fontWeight: 500 }}
              >
                Home
              </Button>

              <Button 
                component={Link} 
                to="/clothes"
                sx={{ color: 'black', fontWeight: 500 }}
              >
                Clothes
              </Button>

              {/* Clothes Dropdown */}
              {/* <Box>
                <Button
                  onClick={handleShirtsClick}
                  endIcon={<KeyboardArrowDown />}
                  sx={{ color: 'black', fontWeight: 500 }}
                >
                  Clothes
                </Button>
                <Menu
                  anchorEl={shirtsAnchorEl}
                  open={Boolean(shirtsAnchorEl)}
                  onClose={handleClose}
                  sx={{
                    '& .MuiPaper-root': {
                      width: 150,        
                    },
                  }}                
                >
                  <MenuItem onClick={() => navigateAndCloseMenu('/shirts', 'tshirtSection')}>
                    Shirt
                  </MenuItem>
                  <MenuItem onClick={() => navigateAndCloseMenu('/shirts', 'poloSection')}>
                    Pant
                  </MenuItem>
                  <MenuItem onClick={() => navigateAndCloseMenu('/shirts', 'teeSection')}>
                    Sweater
                  </MenuItem>
                   <MenuItem onClick={() => navigateAndCloseMenu('/shirts', 'teeSection')}>
                    Hoodie
                  </MenuItem>
                </Menu>
              </Box> */}

              {/* Pants Dropdown */}
              {/* <Box>
                <Button
                  onClick={handlePantsClick}
                  endIcon={<KeyboardArrowDown />}
                  sx={{ color: 'black', fontWeight: 500 }}
                >
                  Pants
                </Button>
                <Menu
                  anchorEl={pantsAnchorEl}
                  open={Boolean(pantsAnchorEl)}
                  onClose={handleClose}
                  
                >
                  <MenuItem onClick={() => navigateAndCloseMenu('/pants', 'jeanSection')}>
                    Jeans
                  </MenuItem>
                  <MenuItem onClick={() => navigateAndCloseMenu('/pants', 'sweatpantSection')}>
                    Sweat Pants
                  </MenuItem>
                </Menu>
              </Box> */}

              <Button 
                component={Link} 
                to="/orderHistory"
                sx={{ color: 'black', fontWeight: 500 }}
              >
                Order History
              </Button>
            </Box>
          )}

          {/* Right side actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user ? (
                <IconButton
                  onClick={() => navigate('/userinfo')}
                  sx={{ color: 'black' }}
                >
                  <Person />
                </IconButton>
              ) : (
                !isMobile && (
                  <Button
                    component={Link}
                    to="/"
                    variant="outlined"
                    startIcon={<Person />}
                    sx={{
                      fontFamily: 'Microsoft YaHei UI',
                      fontWeight: 'bold',
                      color: 'black',
                      borderColor: 'black',
                      '&:hover': {
                        borderColor: 'black',
                        backgroundColor: 'rgba(17, 204, 255, 0.04)',
                      },
                    }}
                  >
                    Login
                  </Button>
                )
              )}


            <IconButton 
              component={Link} 
              to="/cart"
              sx={{ color: 'black' }}
            >
              <Badge badgeContent={state.itemCount} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* Mobile menu button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
