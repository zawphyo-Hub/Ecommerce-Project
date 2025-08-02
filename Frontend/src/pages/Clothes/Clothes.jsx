import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Divider,
  InputAdornment,
  Snackbar,
  Alert
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import axios from 'axios';
import { useCart } from '../Cart/Component/CartFunction';

const Clothes = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const { addToCart } = useCart();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const handleAddToCart = (product) => {
    addToCart(product);
    setSnackMessage(`${product.productName} added to cart`);
    setSnackOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackOpen(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/category");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/product");
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to load products", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      const term = searchTerm.trim().toLowerCase();
      filtered = filtered.filter(product =>
        product.productName.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category?.category_id === selectedCategory);
    }

    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, products]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange([0, 200]);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, backgroundColor: 'whitesmoke' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          alignItems: 'flex-start'
        }}
      >
        {/* Filters and Search (Top on xs/sm, Side on md+) */}
        <Box
          sx={{
            width: { xs: '100%', md: '300px' },
            backgroundColor: 'grey.100',
            p: 3,
            borderRadius: 1
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <FilterList sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ fontSize: "15px" }}>Filters</Typography>
            <Button size="small" onClick={clearFilters} sx={{ ml: 'auto' }}>
              Clear All
            </Button>
          </Box>

          {/* Search Bar */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Search products by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="small"
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Category Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Category
            </Typography>
            <FormControl fullWidth size="small">
              <InputLabel>Select Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Select Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.category_id} value={cat.category_id}>
                    {cat.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Price Range Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Price Range
            </Typography>
            <Box sx={{ px: 1 }}>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={200}
                valueLabelFormat={(value) => `$${value}`}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="body2">${priceRange[0]}</Typography>
                <Typography variant="body2">${priceRange[1]}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Product Section */}
        <Box sx={{ flex: 1, backgroundColor: 'white', p: 3, borderRadius: 1 }}>
          {/* Results Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="h6" sx={{ fontFamily: "sans-serif", color: "green", fontSize: "15px" }}>
              {filteredProducts.length} Products Found.
            </Typography>
            {(searchTerm || selectedCategory || priceRange[0] > 0 || priceRange[1] < 200) && (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {searchTerm && (
                  <Chip
                    label={`Search: ${searchTerm}`}
                    onDelete={() => setSearchTerm('')}
                    size="small"
                  />
                )}
                {selectedCategory && (
                  <Chip
                    label={`Category: ID-${selectedCategory}`}
                    onDelete={() => setSelectedCategory('')}
                    size="small"
                  />
                )}
                {(priceRange[0] > 0 || priceRange[1] < 200) && (
                  <Chip
                    label={`Price: $${priceRange[0]} - $${priceRange[1]}`}
                    onDelete={() => setPriceRange([0, 200])}
                    size="small"
                  />
                )}
              </Box>
            )}
          </Box>

          {/* Products Grid */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            },
            gap: 3
          }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Card key={product.product_id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    image={`http://localhost:8080${product.imageUrl}`}
                    alt={product.productName}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" sx={{ fontSize: "18px" }} gutterBottom>
                      {product.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {product.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Category: {product.category.categoryName}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 2, fontSize: "17px" }}>
                      ${product.price}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Card>
              ))
            ) : (
              <Box sx={{ gridColumn: '1 / -1' }}>
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary">
                    No products found matching your criteria
                  </Typography>
                  <Button onClick={clearFilters} sx={{ mt: 2 }}>
                    Clear Filters
                  </Button>
                </Paper>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Clothes;
