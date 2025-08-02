import {
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Select,
  FormLabel,
  Paper,
  MenuItem,
  Input,
  FormHelperText
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";



function Product() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [categoryErrorMessage, setCategoryErrorMessage] = useState('');

  const fileInputRef = useRef(null); //to reset the img after submit

 
  //Fetch category name
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

  const validate = () => {
      let isValid = true;
      if (!selectedCategoryId) {
        setCategoryError(true);
        setCategoryErrorMessage("Please Select Category Name.")
        isValid = false;
      }
      else{
        setCategoryError(false);
        setCategoryErrorMessage('')
       

      }
     return isValid;

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blankInput = validate();

    if(!blankInput){
      return
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", productDescription);
    formData.append("price", price);
    formData.append("categoryId", selectedCategoryId);
    formData.append("image", image); // Image file

      

    try {
      const res = await axios.post("http://localhost:8080/api/product/saveProduct", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Product successfully added.")

      setTimeout(()=> {
        setProductName("");
        setProductDescription("");
        setPrice("");
        setSelectedCategoryId("");
        setImage("");
        if (fileInputRef.current) {
          fileInputRef.current.value = null; // resets the file input
        }


      }, 400)
      
    } catch (error) {
      console.error("Full error response:", error.response);
      if (error.response) {
    console.log("Error response data:", error.response.data);
    console.log("Error message from backend:", error.response.data.message);
  }
      toast.error(error.response?.data?.message || "Error saving product!!")
    }
    
        
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", justifyContent: "center" }}>
      <Box sx={{display: "flex"}}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 3, textAlign: "left", color: "#2563eb" }}
      >
        Add Product /  
      </Typography>
      <a href="/admin/productedit">Click here to edit</a>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* Category Name */}
        <FormControl fullWidth>
          <FormLabel sx={{ mb: 1, color: "black" }}>Category Name</FormLabel>
          <Select
            value={selectedCategoryId}
            error={categoryError}
            // helpertext={categoryErrorMessage}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.category_id} value={cat.category_id}>
                {cat.categoryName}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText 
            sx={{color: "red", fontFamily: "sans-serif", fontSize: "14px"}}>
            {categoryErrorMessage}
          </FormHelperText>
        </FormControl>

        {/* Product Name */}
        <FormControl fullWidth>
          <FormLabel sx={{ mb: 1, color: "black" }}>Product Name</FormLabel>
          <TextField
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </FormControl>

        {/* Product Description */}
        <FormControl fullWidth>
          <FormLabel sx={{ mb: 1, color: "black" }}>
            Product Description
          </FormLabel>
          <TextField
            multiline
            minRows={3}
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter product description"
            required
          />
        </FormControl>

        {/* Product Price */}
        <FormControl fullWidth>
          <FormLabel sx={{ mb: 1, color: "black" }}>Price</FormLabel>
          <TextField
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
          />
        </FormControl>

        {/* Product Image */}
        <FormControl fullWidth>
          <FormLabel sx={{ mb: 1, color: "black" }}>Product Image</FormLabel>
          <input
            type="file"
            required
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files[0])}
            
          />
        </FormControl>

        {/* Submit Button */}
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: "bold",
            mt: 2,
            '&:hover': {
              backgroundColor: "#1e40af",
            },
          }}
        >
          Save Product
        </Button>
      </Box>
    </Paper>
    
  );
}

export default Product;
