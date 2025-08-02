import React from "react";
import { Box, Container, Typography, Divider, Grid, IconButton, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";

function Footer() {
  return (
    <Box sx={{ bgcolor: "#111", color: "#fff", py: 4, mt: 10 }}>
      <Container>
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Fazi
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, maxWidth: 500 }}>
              Fazi is a modern men's fashion brand focused on quality and comfort. Shop the latest trends and elevate your wardrobe today.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} sx={{ textAlign: { xs: "left", md: "right" } }}>
           
            <IconButton color="inherit" component="a" href="https://facebook.com" target="_blank">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" component="a" href="https://instagram.com" target="_blank">
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit" component="a" href="https://wa.me/1234567890" target="_blank">
              <WhatsAppIcon />
            </IconButton>
            <IconButton color="inherit" component="a" href="https://twitter.com" target="_blank">
              <TwitterIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)", my: 3 }} />

        <Typography variant="body2" align="center" color="gray">
          <EmailIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          <Link href="mailto:faziinfo@gmail.com" color="inherit" underline="hover">
            faziinfo@gmail.com
          </Link>
        </Typography>

        <Typography variant="caption" align="center" display="block" color="gray" sx={{ mt: 1 }}>
          &copy; {new Date().getFullYear()} Fazi. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
