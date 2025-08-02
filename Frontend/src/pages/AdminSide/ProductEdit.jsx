import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ProductEdit() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/product");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products.");
      console.error(err);
    }
  };

  const handleDelete = async (productId) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8080/api/product/${productId}`);
      toast.success("Product deleted successfully.");
      fetchProducts(); // Refresh list after deletion
    } catch (err) {
      toast.error("Error deleting product.");
      console.error(err);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/admin/productupdateform/${productId}`);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h5" fontWeight="bold" color="#2563eb" mb={3}>
        Product Management
      </Typography>

      {products.map((product) => (
        <Paper
          key={product.productId}
          elevation={2}
          sx={{ p: 3, mb: 2,  alignItems: "center" }}
        >
          <Box sx={{ display: "flex", flex: 1 }}>
            <Box>
                <Typography variant="body1">
                
                <img 
                    src={`http://localhost:8080${product.imageUrl}`} 
                    alt={product.productName} 
                    style={{ maxWidth: "200px", maxHeight: "200px", marginTop: "8px" }} 
                />
            </Typography>

            </Box>
            <Box sx={{ml: "10px", mt: "10px"}}>
                <Typography variant="body1"><strong>Name:</strong> {product.productName}</Typography>
                <Typography variant="body1"><strong>Description:</strong> {product.description}</Typography>
                <Typography variant="body1"><strong>Price:</strong> ${product.price}</Typography>
                <Typography variant="body1"><strong>Category:</strong> {product.category?.categoryName || "N/A"}</Typography>

            </Box>
            
           
            
          </Box>

          <Stack sx={{mt: "15px", display: "flex", justifyContent: "right"}} direction="row" spacing={1}>
            <Button
              variant="outlined"
              sx={{ color: "#2563eb", borderColor: "#2563eb" }}
              onClick={() => handleEdit(product.productId)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "#e53935", borderColor: "#e53935" }}
              onClick={() => 
              {
                const confirmDelete = window.confirm(`Are you sure you want to delete ${product.productName}?`);
                if (confirmDelete) {
                   handleDelete(product.productId);
                }
              }}
              
            >
              Delete
            </Button>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
}

export default ProductEdit;