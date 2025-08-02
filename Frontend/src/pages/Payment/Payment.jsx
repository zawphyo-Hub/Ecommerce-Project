import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { useCart } from "../Cart/Component/CartFunction";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Payment() {
  const { state, clearCart } = useCart();
  const cartItems = state?.items ?? [];
  const navigate = useNavigate();

  //order id retrieve from location
  const location = useLocation();
  const orderID = location.state?.orderID;

  const getCartTotal = () =>
  cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const [paymentType, setPaymentType] = useState("Credit Card");

 
  // Visa form fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const totalAmount = getCartTotal().toFixed(2);

  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    console.log(orderID);
    

    try {
      await axios.post("http://localhost:8080/api/payment/savePayment", 
      
      {paymentType, amountPaid : totalAmount, holderName: cardHolder, cardNumber, cardExpiry: expiry, cvv, order: { orderID }} );

       
      setTimeout(() => {
       toast.success("Payment successfully!");
             
      
      }, 1000)
      setTimeout(() => {
      
       navigate("/home")
     
       clearCart();
       
      
      }, 1500)
       
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Payment Error");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: { xs: 2, sm: 4 }, maxWidth: "1000px", mx: "auto" }}
    >
      <Typography variant="h6" align="left" sx={{ fontWeight: "bold" }}>
        Check Out
      </Typography>

      <Box sx={{ my: 4 }}>
        <FormControl fullWidth>
          
          <TextField
            label="Payment Type"
            value={paymentType}
            name = "paymentType"
            fullWidth
            
            margin="normal"
            readOnly
            
          />
         
        </FormControl>
      </Box>

      
        <Box sx={{ mb: 4, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Visa Payment Form
          </Typography>

          <TextField
            label="Card Number"
            value={cardNumber}
            name="cardNumber"
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
              setCardNumber(value.slice(0, 16)); // Limit to 16 digits
            }}
            fullWidth
            margin="normal"
            placeholder="XXXX XXXX XXXX XXXX"
            required
           
          />
          <TextField
            label="Card Holder Name"
            value={cardHolder}
            name="cardHolder"
            onChange={(e) => setCardHolder(e.target.value)}
            fullWidth
            margin="normal"
            required
            autoComplete="cc-name"
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Expiry Date"
              placeholder="MM/YY"
              value={expiry}
              name="expiry"
              onChange={(e) => setExpiry(e.target.value)}
              fullWidth
              margin="normal"
              required
              autoComplete="cc-exp"
            />
            <TextField
            label="CVV"
            placeholder="123"
            value={cvv}
            name="cvv"
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Only numbers
              setCvv(value.slice(0, 4)); // Usually 3 digits, but allow up to 4
            }}
            fullWidth
            margin="normal"
            required
            
          />
          </Box>
          <TextField
            label="Amount to Pay"
            value={`$ ${totalAmount}`}
            name="totalAmount"
            fullWidth
            margin="normal"
            readOnly
          />
        </Box>
      
      <Box sx={{ textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          
        >
          Confirm Payment
        </Button>
      </Box>
    </Box>
  );
}

export default Payment;
