import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  CircularProgress,
} from "@mui/material";

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.userId) return;

      try {
        const res = await axios.get(`http://localhost:8080/api/order/user/${user.userId}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Order History
      </Typography>

      {orders.length === 0 ? (
        <Typography>No order history.</Typography>
      ) : (
        orders.map((order) => (
          <Card key={order.orderID} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">Order Reference: {order.orderID}</Typography>
              <Typography color="text.secondary">
                Date: {new Date(order.orderDate).toLocaleString()}
              </Typography>
              <Typography>Total: ${order.totalPrice.toFixed(2)}</Typography>
              <Divider sx={{ my: 1 }} />

              
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default UserOrder;
