import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Register from "./auth/register/Register";
import Login from "./auth/login/Login";
import ForgotPassword from "./auth/forgotPassword/ForgotPassword";
import ResetPassword from "./auth/resetPassword/ResetPassword";
import VerifyCode from "./auth/verifyCode/VerifyCode";
import ContactUs from "./pages/contactUs/ContactUs";
import Cart from "./pages/cart/Cart";
import AboutUs from "./pages/aboutUs/AboutUs";
import Products from "./pages/products/Products";
import ProtectedRouter from "./components/protected/ProtectedRouter";
import ProductDetailes from "./components/products/ProductDetails";
import Profile from "./pages/profile/Profile";
import Checkout from "./pages/checkout/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "Verify_Code", element: <VerifyCode /> },
      { path: "contactUs", element: <ContactUs /> },
      {
        path: "cart",
        element: (
          <ProtectedRouter>
            <Cart />
          </ProtectedRouter>
        ),
      },
      {
        path: "checkout", element: <Checkout /> 

      },
      { path: "aboutUs", element: <AboutUs /> },
      { path: "products", element: <Products /> },
      { path: "product/:id", element: <ProductDetailes /> },
      {
        path: "profile",
        element: (
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>
        ),
      },
    ],
  },
]);

export default router;