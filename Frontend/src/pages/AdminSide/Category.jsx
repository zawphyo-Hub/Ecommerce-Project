import { 
  Box, 
  Typography, 
  Button, 
  FormControl, 
  TextField,
  FormLabel,  
  Paper} from "@mui/material"
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
function Category(){

   const [category, setCategory] = useState("")

  const handleSubmit = async (event) =>{
    event.preventDefault();
    try{
       const res =  await axios.post('http://localhost:8080/api/category/saveCategory', {categoryName: category});
       toast.success("Category successfully saved.")
       setTimeout(()=> {
        setCategory("");


       }, 400)
       


    }catch(error){
      console.log(error)
      toast.error(error.response?.data?.message || "Error!! Can't save category");


    }
     

  }
  return(
   
    <Paper elevation={3} sx={{ 
        p: 4, maxWidth: 800, mx: "auto", justifyContent: "center" 
      }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 3, textAlign: "left", color: "#2563eb" }}
      >
        Add Category
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        
        sx={{
          
          display: 'flex',
                  
                    
        }}
          >
            <FormControl sx={{width: "100%"}}>
              <FormLabel sx={{mb: "8px", color: "black", fontFamily: "sans-serif"}}>
                Category Name
              </FormLabel>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <TextField
                
                name="category_name"
                required
                fullWidth
                id="category_name"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter the category name"
                
                
              />
              <Button 
                sx={{backgroundColor: "blue", color:"white", width: "17%", ml: "5px",
                '&:hover': {
                backgroundColor: "#1e40af",
            },}}
                type="submit"
                fullWidth
                
                variant="contained"
              >
                Save
              </Button>
              </Box>

            </FormControl>
       
      </Box>
    </Paper>
   
      
  )
}
export default Category;