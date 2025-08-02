import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  Snackbar,
  Alert,
  Card,
  CardMedia,
  CardContent,
  
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useCart } from "./Component/CartFunction"; // update path if needed
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const navigate = useNavigate();


  // For Add, delete quantity
  const {
    state,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const cartItems = state?.items ?? [];

  const getCartTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

  const showToast = (message, severity = "info") => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      showToast("Item removed from your cart.", "warning");
    } else {
      updateQuantity(productId, newQuantity);
      showToast("Quantity updated.", "info");
    }
  };

  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId);
    showToast(`${productName} has been removed from your cart.`, "warning");
  };

  const handleClearCart = () => {
    clearCart();
    showToast("All items removed from your cart.", "error");
  };

  // const handleCheckout = async (e) => {
  //   try{
  //     const userID = localStorage.getItem("userID"); // or from auth context
      
  //     const totalPrice = getCartTotal();
  //     const res = await axios.post("http://localhost:8080/api/order/saveOrder", {
  //       user: { id: Number(userID) },
  //       totalPrice,
  //     } )

  //     const orderID = res.data.orderID;
      
      
  //     //save order items in order_items table

  //     await new Promise(resolve => setTimeout(resolve, 300));
  //     try{
  //       await Promise.all(
  //       cartItems.map(item =>
  //         axios.post("http://localhost:8080/api/orderItem/saveOrderItem", {
  //           order: { orderID: orderID }, // Explicit value
  //           product: { productId: item.productId },  // NESTED object
  //           quantity: item.quantity
  //         })
  //       )
  //     );

  //     }
  //     catch(err){
  //       showToast(err.response?.data?.message || "Error orderItem", "error")

  //     }
      
  //     showToast("Order Confirmed. Redirecting to payment page", "success");
  //     setTimeout(() => {
  //      navigate("/payment", { state: { orderID }})
       
      
  //     }, 1500)

      

  //   }
  //   catch(err){
  //     console.log(err)
  //     showToast(err.response?.data?.message || "Error order request!", "error");

  //   }
    
    
  // };

  const handleCheckout = async (e) => {
  try {
    // Get the full user object from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.userId) {
      showToast("User not found. Please log in again.", "error");
      return;
    }

    const userID = user.userId; // This is the correct way

    const totalPrice = getCartTotal();

    const res = await axios.post("http://localhost:8080/api/order/saveOrder", {
      user: { id: Number(userID) },
      totalPrice,
    });

    const orderID = res.data.orderID;

    // Save order items
    await new Promise(resolve => setTimeout(resolve, 300));
    try {
      await Promise.all(
        cartItems.map(item =>
          axios.post("http://localhost:8080/api/orderItem/saveOrderItem", {
            order: { orderID: orderID },
            product: { productId: item.productId },
            quantity: item.quantity
          })
        )
      );
    } catch (err) {
      showToast(err.response?.data?.message || "Error saving order items", "error");
    }

    showToast("Order Confirmed. Redirecting to payment page", "success");
    setTimeout(() => {
      navigate("/payment", { state: { orderID } });
    }, 1500);

  } catch (err) {
    console.log(err);
    showToast(err.response?.data?.message || "Error placing order!", "error");
  }
};


  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: "1000px", mx: "auto" }}>
      

      {cartItems.length === 0 ? (
        <Typography align="center">Your cart is empty.</Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card
              key={item.productId}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                p: 1,
                boxShadow: 3,
              }}
            >
              <CardMedia
                component="img"
                image={`http://localhost:8080${item.imageUrl}`}
                alt={item.productName}
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 2,
                  mr: 2,
                }}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{
                    fontFamily: "sans-serif",
                    fontSize: "16px",
                    

                }}
                > <strong>Name:</strong> {item.productName}</Typography>
                <Typography variant="subtitle1">
                  <strong>Price:</strong> ${(item.price * item.quantity).toFixed(2)}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                  >
                    +
                  </Button>
                </Box>
              </CardContent>

              <Box sx={{ textAlign: "right", minWidth: 120 }}>
                {/* <Typography variant="subtitle1">
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography> */}
                <IconButton
                  color="error"
                  onClick={() => handleRemoveItem(item.productId, item.productName)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          ))}

          <Divider sx={{ my: 3 }} />
          <Box sx={{ display: "flex", 
            flexDirection: "column", // or "row" if you want horizontal
            alignItems: "flex-end",}}
          >
            <Typography variant="h6" sx={{ mb: 2, fontFamily: "sans-serif", fontSize: "17px" }}>
                Total: ${getCartTotal().toFixed(2)}
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="contained" color="primary" onClick={handleCheckout}>
                Checkout
                </Button>
                <Button variant="outlined" color="error" onClick={handleClearCart}>
                Clear Cart
                </Button>
            </Box>

          </Box>
          
        </>
      )}

      {/* Toast Snackbar */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Cart;
