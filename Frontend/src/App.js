import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Store from "./pages/Store";
import Blogs from "./pages/Blogs";
import Wishlist from "./pages/Wishlist";
import Signup from "./pages/Signup";
import Forgetpassword from "./pages/Forgetpassword";
import Signin from "./pages/Signin";
import Singleblog from "./pages/Singleblog";
import Privacypolicy from "./pages/Privacypolicy";
import Shippingpolicy from "./pages/Shippingpolicy";
import Refundpolicy from "./pages/Refundpolicy";
import Termsandconditions from "./pages/Termsandconditions";
import Singleproduct from "./pages/Singleproduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import { PrivateRoutes } from "./routing/PrivateRoutes";
import { OpenRoutes } from "./routing/OpenRoutes";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Resetpassword from "./pages/Resetpassword";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="store" element={<Store />} />
            <Route path="product/:id" element={<Singleproduct />} />
            <Route path="reset/:token" element={<Resetpassword />} />
            <Route
              path="cart"
              element={
                <PrivateRoutes>
                  <Cart />
                </PrivateRoutes>
              }
            />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:id" element={<Singleblog />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="profile"
              element={
                <PrivateRoutes>
                  <Profile />
                </PrivateRoutes>
              }
            />
            <Route
              path="wishlist"
              element={
                <PrivateRoutes>
                  <Wishlist />
                </PrivateRoutes>
              }
            />
            <Route
              path="order"
              element={
                <PrivateRoutes>
                  <Orders />
                </PrivateRoutes>
              }
            />
            <Route path="privacypolicy" element={<Privacypolicy />} />
            <Route path="shippingpolicy" element={<Shippingpolicy />} />
            <Route path="refundpolicy" element={<Refundpolicy />} />
            <Route path="termsandconditions" element={<Termsandconditions />} />
            <Route path="login" element={<Signin />} />
            <Route path="forgetpassword" element={<Forgetpassword />} />
            <Route
              path="signup"
              element={
                <OpenRoutes>
                  <Signup />
                </OpenRoutes>
              }
            />
          </Route>
          <Route
            path="/checkout"
            element={
              <PrivateRoutes>
                <Checkout />
              </PrivateRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
