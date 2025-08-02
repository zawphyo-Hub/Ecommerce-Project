import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function UserEdit() {

  const navigate = useNavigate();
  const { id: userId } = useParams();
  const [user, setUser] = useState({
                          fullName: "",
                          email: "",
                          mfaEnabled: "",
                          role: ""
                        });
  
 

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/getUser/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
        toast.error("Error!")
      }
    };

    fetchUsers();
  }, [userId]);

  const handleUpdate =  async () => {

    const payload = {
      fullName: user.fullName,
      email: user.email,
      mfaEnabled: user.mfaEnabled,
      role: user.role
    };

    
    try{
      const res =  await axios.put(`http://localhost:8080/api/user/update/${userId}`, payload)
      
      toast.success("User Updated Successfully.")
      navigate("/admin/useraccount")
      
    }
    catch(err){
      console.log(err)
      toast.error("Update failed!");

    }
    
  };

 
  return (
      <Paper
          key={user.id}
          elevation={2}
          sx={{ p: 3, mb: 2, display: "flex", 
            flexDirection: "column", 
            justifyContent: "space-between", 
            maxWidth: 500,
            mx: "auto",
            alignItems: "center" }}
        >
      <Typography variant="h5">Update User</Typography>
      <TextField
        label="Full Name"
        name="fullName"
        value={user.fullName || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={user.email || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
      <InputLabel>2FA Enabled</InputLabel>
      <Select
        name="mfaEnabled"
        value={user.mfaEnabled === true ? "true" : "false"}
        label="2FA Enabled"
        onChange={(e) =>
          handleChange({
            target: {
              name: "mfaEnabled",
              value: e.target.value === "true",
            },
          })
        }
      >
        <MenuItem value="true">true</MenuItem>
        <MenuItem value="false">false</MenuItem>
      </Select>
    </FormControl>
      <TextField
        label="Role"
        name="role"
        value={user.role || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        
      >
        Update
        
      </Button>
    </Paper>
  );

  // const { id: userId } = useParams();
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [saving, setSaving] = useState(false);

  // useEffect(() => {
  //   axios.get(`http://localhost:8080/api/user/getUser/${userId}`)
  //     .then(res => {
  //       setUser(res.data);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.error("Failed to fetch user", err);
  //       setLoading(false);
  //     });
  // }, [userId]);

  // const handleChange = (e) => {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  // };

  // const handleUpdate = () => {
  //   setSaving(true);
  //   axios.put(`http://localhost:8080/api/user/update/${userId}`, user)
  //     .then(res => {
  //       alert("User updated successfully!");
  //     })
  //     .catch(err => {
  //       alert("Update failed!");
  //       console.error(err);
  //     })
  //     .finally(() => setSaving(false));
  // };

  // if (loading) return <CircularProgress />;

  // return (
  //   <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
  //     <Typography variant="h5">Update User</Typography>
  //     <TextField
  //       label="Full Name"
  //       name="fullName"
  //       value={user.fullName || ""}
  //       onChange={handleChange}
  //       fullWidth
  //       margin="normal"
  //     />
  //     <TextField
  //       label="Email"
  //       name="email"
  //       value={user.email || ""}
  //       onChange={handleChange}
  //       fullWidth
  //       margin="normal"
  //     />
  //     <Button
  //       variant="contained"
  //       color="primary"
  //       onClick={handleUpdate}
  //       disabled={saving}
  //     >
  //       {saving ? "Saving..." : "Update User"}
  //     </Button>
  //   </Box>
  // );
}

export default UserEdit;
