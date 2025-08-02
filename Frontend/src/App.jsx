import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home/Home";
import Navbar from "./pages/NavbarFooter/Navbar";
import SignIn from "./pages/SignIn/SignIn";
import OAuthSuccessHandler from "./pages/2FA/component/OAuthSuccessHandler";
import SignUp from "./pages/SignUp/SignUp";
import QrCode from "./pages/2FA/QrCode";
import TotpLogin from "./pages/2FA/TotpLogin";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHome from "./pages/AdminSide/AdminHome";
import AdminLayout from "./pages/AdminSide/AdminLayout";
import AdminCheck from "./pages/AdminSide/components/adminCheck";
import Category from "./pages/AdminSide/Category";
import Product from "./pages/AdminSide/Product";
import UserAccount from "./pages/AdminSide/UserAccount";
import Clothes from "./pages/Clothes/Clothes";
import Cart from "./pages/Cart/Cart";
import Payment from "./pages/Payment/Payment";
import { CartProvider } from "./pages/Cart/Component/CartFunction";
import AdminOrderList from "./pages/AdminSide/AdminOrderList";
import UserEdit from "./pages/AdminSide/UserEdit";
import ProductEdit from "./pages/AdminSide/ProductEdit";
import ProductUpdateForm from "./pages/AdminSide/ProductUpdateForm";
import Footer from "./pages/Footer/Footer";
import UserInfo from "./pages/NavbarFooter/UserInfo";
import UserOrder from "./pages/OrderHistory/UserOrder";



function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = ["/qrcode", "/totplogin", "/", "/signup"];
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";
  const isAdminPage = location.pathname.startsWith("/admin");

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      <ToastContainer position="top-center" />
      {!shouldHideNavbar && !isAdminPage && <Navbar />} 
      
      

      <Routes>
        <Route path="/oauthsuccess" element={<OAuthSuccessHandler />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/qrcode" element={<QrCode />} />
        <Route path="/totplogin" element={<TotpLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/orderhistory" element={<UserOrder />} />
        

        
        <Route path="/admin" element={<AdminCheck> <AdminLayout /> </AdminCheck>}>
          <Route path="adminhome" element={<AdminHome />} />
          <Route path="category" element={<Category/>} />
          <Route path="product" element={<Product/>} />
          <Route path="useraccount" element={<UserAccount />} />
          <Route path="orderlist" element={<AdminOrderList />} />
          <Route path="useredit/:id" element={<UserEdit />} />
          <Route path="productedit" element={<ProductEdit />} />
          <Route path="productupdateform/:id" element={<ProductUpdateForm />} />

         
        </Route>
          
        
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />

      </CartProvider>
      
    </BrowserRouter>
  );
}

export default App;
