import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  FormLabel,
  Select
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

function ProductUpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    categoryId: "", // Initialize as empty string
  });

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCategories();
        await fetchProduct();
      } catch (error) {
        toast.error("Failed to load data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/product/${id}`);
      const fetchedProduct = res.data;
      setProduct({
        productName: fetchedProduct.productName || "",
        description: fetchedProduct.description || "",
        price: fetchedProduct.price ? String(fetchedProduct.price) : "",
        categoryId: fetchedProduct.category?.id ? String(fetchedProduct.category.id) : "",
      });
    } catch (err) {
      toast.error("Failed to load product.");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/category");
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to load categories.");
    }
  };

  const handleChange = (e) => {
  const { name, value } = e.target;
  setProduct((prev) => ({
    ...prev,
    [name]: value, // Store as string
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.productName || !product.price || !product.categoryId) {
      toast.error("All fields are required.");
      return;
    }

    const payload = {
      productName: product.productName,
      description: product.description,
      price: parseFloat(product.price),
      category: { category_id: parseInt(product.categoryId) }, // Convert to number here
    };

    try {
      await axios.put(`http://localhost:8080/api/product/${id}`, payload);
      toast.success("Product updated successfully.");
      navigate("/admin/productedit");
    } catch (err) {
      toast.error("Failed to update product.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" color="#2563eb" mb={3}>
        Edit Product
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          name="productName"
          value={product.productName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <FormControl fullWidth margin="normal">
  <FormLabel sx={{ mb: 1, color: "black" }}>Category</FormLabel>
  <Select
    name="categoryId"
    value={product.categoryId}
    onChange={handleChange}
    required
    displayEmpty
  >
    <MenuItem value="" disabled>
      Select Category
    </MenuItem>
    {categories.map((cat) => (
      <MenuItem key={cat.category_id} value={String(cat.category_id)}>
        {cat.categoryName}
      </MenuItem>
    ))}
  </Select>
</FormControl>

        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mr: 2, backgroundColor: "#2563eb" }}
          >
            Save Changes
          </Button>
          <Button variant="outlined" onClick={() => navigate("/admin/productedit")}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default ProductUpdateForm;