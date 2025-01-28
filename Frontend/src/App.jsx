// App.js
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrders/PlaceOrder";
import LoginPopup from "./components/LoginPopup/LoginPoppup";
import MyOrders from "./pages/MyOrders/MyOrders"; // Corrected import statement
import Verify from "./pages/Verify/Verify"; // Added import for Verify component if required
import FoodItem from './components/FoodItem/FoodItem';
import FoodDetail from './components/FoodDetail/FoodDetail';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}{" "}
      {/* Conditional rendering for LoginPopup */}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/Verify" element={<Verify />} />
          <Route path="/myorder" element={<MyOrders />} />
          <Route path="/myorder" element={<MyOrders />} />
          <Route path="/food/:id" element={<FoodDetail />} />
          <Route path="/food/:id" element={<FoodItem />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
