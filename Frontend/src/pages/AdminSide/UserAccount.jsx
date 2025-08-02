import { Box, Typography, Paper, Button, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";

function UserAccount() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user/getUser");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    navigate(`/admin/useredit/${userId}`);
  };
  const handleDelete =  async (userId) => {
    try{
      const res = await axios.delete(`http://localhost:8080/api/user/delete/${userId}`)
      toast.success("User Successfully Deleted.")
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      navigate("/admin/useraccount");

    }
    catch(err){
      toast(err.response?.body?.message || "Error Deleting User!")

    }
    
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h5" fontWeight="bold" color="#2563eb" mb={3}>
        User Account Management
      </Typography>

      {users.map((user) => (
        <Paper
          key={user.id}
          elevation={2}
          sx={{ p: 3, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <Box>
            <Typography variant="body1" >
              <strong>Full Name:</strong> {user.fullName}
            </Typography>
            <Typography variant="body1" >
              <strong>Email:</strong> {user.email}
            </Typography>
             <Typography variant="body1" >
              <strong>2FA(t/f):</strong> {user.mfaEnabled ? 'true' : 'false'}
            </Typography>
            <Typography variant="body1" >
              <strong>Role:</strong> {user.role}
            </Typography>
          </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            sx={{ color: "#2563eb", borderColor: "#2563eb", '&:hover': { backgroundColor: "#e0e7ff" } }}
            onClick={() => handleEdit(user.id)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "#eb0909ff", borderColor: "#e61414ff", '&:hover': { backgroundColor: "#e0e7ff" } }}
            onClick={() => 
              {
                const confirmDelete = window.confirm(`Are you sure you want to delete ${user.fullName}?`);
                if (confirmDelete) {
                  handleDelete(user.id);
                }
              }}
           
          >
            Delete
          </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

export default UserAccount;
