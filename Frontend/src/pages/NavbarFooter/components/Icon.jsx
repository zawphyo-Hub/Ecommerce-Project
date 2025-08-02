import { Box, Typography } from '@mui/material';
import Logo from '../../../assets/fazi.png';

export function FaziIcon() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        flexDirection: 'row', // Or 'column' if you want icon on top
      }}
    >
      <Box
        component="img"
        src={Logo}
        alt="Fazi Logo"
        sx={{
          width: 22,
          height: 22,
          borderRadius: '5px', // Optional for rounded corners
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontSize: 19,
          fontWeight: 'bold',
          fontFamily: 'Magneto',
          color: '#333', // Optional text color
        }}
      >
        Fazi
      </Typography>
    </Box>
  );
}
