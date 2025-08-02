import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button as MuiButton,
  CircularProgress,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Search,
  Eye,
  Edit,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Users,
  Trash2,
  TrendingUp,
  Filter,
} from "lucide-react";
import axios from "axios";

function AdminOrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState({});

  const handleToggleExpand = async (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      if (!orderItems[orderId]) {
        try {
          const res = await axios.get(`http://localhost:8080/api/orderItem/order/${orderId}`);
          setOrderItems((prev) => ({ ...prev, [orderId]: res.data }));
        } catch (error) {
          console.error("Failed to fetch order items", error);
        }
      }
      setExpandedOrder(orderId);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/order");
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

 

  const filteredOrders = orders.filter((order) => {
    const orderIdStr = order.orderID?.toString() || "";
    
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      orderIdStr.includes(search) ;

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStats = () => {
    const total = orders.length;
    const completed = orders.filter((o) => o.status === "completed").length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const processing = orders.filter((o) => o.status === "processing").length;
    const revenue = orders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + (o.totalPrice || 0), 0);
    return { total, completed, pending, processing, revenue };
  };

  const stats = getStats();

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
        <Typography mt={2}>Loading orders...</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Order Management
          </Typography>
          <Typography color="text.secondary">
            Manage and track all customer orders
          </Typography>
        </Box>
        <MuiButton
          variant="contained"
          onClick={fetchOrders}
          startIcon={<RefreshCw size={18} />}
        >
          Refresh Orders
        </MuiButton>
      </Box>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search by ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      {filteredOrders.length === 0 ? (
        <Typography>No orders found matching the filters.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredOrders.map((order) => (
            <Grid item xs={12} key={order.orderID}>
              <Card variant="outlined">
                <CardHeader
                  title={`Order ${order.orderID}`}
                  subheader={`Placed on ${new Date(order.orderDate).toLocaleString()}`}
                  action={
                    <Box display="flex" gap={1}>
                      {/* <MuiButton
                        size="small"
                        variant="contained"
                        color="success"
                        startIcon={<CheckCircle />}
                        onClick={() => onComplete(order.orderID)}
                      >
                        Complete
                      </MuiButton>
                      <MuiButton
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<Trash2 />}
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this order?")) {
                            onDelete(order.orderID);
                          }
                        }}
                      >
                        Delete
                      </MuiButton> */}
                      {/* <MuiButton
                        size="small"
                        variant="outlined"
                        startIcon={<Eye />}
                        onClick={() => handleToggleExpand(order.orderID)}
                      >
                        {expandedOrder === order.orderID ? "Hide" : "Details"}
                      </MuiButton> */}
                    </Box>
                  }
                />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography variant="body2" color="text.secondary">
                        Customer
                      </Typography>
                      <Typography variant="subtitle1">{order.user?.username || "Unknown"}</Typography>
                      <Typography variant="caption">{order.user?.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography variant="body2" color="text.secondary">
                        Total
                      </Typography>
                      <Typography variant="subtitle1">${(order.totalPrice || 0).toFixed(2)}</Typography>
                    </Grid>
                  </Grid>
                  <Collapse in={expandedOrder === order.orderID} timeout="auto" unmountOnExit>
                    <Box mt={2}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Order Items
                      </Typography>
                      <List dense>
                        {(orderItems[order.orderID] || []).map((item) => (
                          <ListItem key={item.orderItemID}>
                            <ListItemText
                              primary={`${item.product.productName} (x${item.quantity})`}
                              secondary={`Product ID: ${item.product.productId}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default AdminOrderList;
