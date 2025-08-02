import { Typography, Box } from "@mui/material";


function AdminCheck({children}) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  
  if (!token || role !== "ADMIN") {
    return (
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography color="error" variant="h5" sx={{fontSize: "15px"}}>
          You are not allowed to enter this page.
        </Typography>
      </Box>
    );
  }
  
  return children;
 
}

export default AdminCheck;