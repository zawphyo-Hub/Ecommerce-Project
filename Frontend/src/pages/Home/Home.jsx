import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import mh1 from './images/mh1.jpg';
import mh2 from './images/mh2.jpg';
import mh3 from './images/mh3.jpg';
import mh4 from './images/mh4.jpg';

function Home() {
  return (
    <Box sx={{ bgcolor: "#ffffff", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "#000000",
          color: "white",
          py: 10,
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Let's find an outfit
          </Typography>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            that's perfect for you
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 600, mx: "auto", mb: 3 }}>
            From cozy hoodies to street-ready fits, we've got the looks to match your mood. Slide into styles that turn heads—wherever you go.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/clothes"
            sx={{
              bgcolor: "#1f2da9ff",
              color: "#fff",
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#484c74ff"
              }
            }}
          >
            Shop Now
          </Button>
        </motion.div>
      </Box>

      {/* Category Cards */}
      <Container sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: 1200 }}>
          {/* Shirt Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", bgcolor: "#f5f5f5" }}>
              <CardMedia
                component="img"
                height="300"
                image={mh3}
                alt="Shirts"
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  MenX Shirts
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  45+ Items
                </Typography>
                <ul>
                  <li>Short Sleeves</li>
                  <li>Long Sleeves</li>
                  <li>Plain & Pocket Tees</li>
                  <li>Oversized & Polo</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>

          {/* Pants Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", bgcolor: "#f5f5f5" }}>
              <CardMedia
                component="img"
                height="300"
                image={mh2}
                alt="Pants"
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  MenX Pants
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  25+ Items
                </Typography>
                <ul>
                  <li>Baggy Jeans</li>
                  <li>Regular Fit</li>
                  <li>Skinny Jeans</li>
                  <li>Sweat Pants</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>

          {/* Hoodies & Sweaters */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", bgcolor: "#f5f5f5" }}>
              <CardMedia
                component="img"
                height="300"
                image={mh1}
                alt="Hoodies & Sweaters"
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Hoodies & Sweaters
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  20+ Items
                </Typography>
                <ul>
                  <li>Hoodies</li>
                  <li>Sweaters</li>
                  <li>Jackets</li>
                  <li>Upperwear Shirts</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* About Us Section */}
      <Box sx={{ py: 10, bgcolor: "#fafafa" }}>
  <Container>
    <Typography
      variant="h5"
      textAlign="center"
      fontWeight="bold"
      gutterBottom
    >
      About Us
    </Typography>

    {/* Center wrapper */}
    <Box sx={{ maxWidth: "900px", mx: "auto", mt: "60px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Box
              component="img"
              src={mh4}
              alt="About Us"
              sx={{
                width: "250px",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#333",
                lineHeight: 1.8,
                width: { xs: "100%", md: "100%" },
              }}
            >
              Welcome to our men’s fashion e-commerce platform where style meets
              quality. We are based in England, founded by Ryan in 2022. Our
              intention with the MenX website is to share the best-quality
              outfits from the UK with the world. We’re committed to delivering
              the latest trends in men’s clothing, accessories, and
              footwear—designed to elevate your wardrobe with confidence.
            </Typography>
          </motion.div>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
