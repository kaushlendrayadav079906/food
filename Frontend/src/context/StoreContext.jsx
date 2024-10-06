import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets"; // Ensure food_list is imported correctly

const url = "http://localhost:8889"; // Base URL for your API

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(null);

  // Load token from local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Add item to cart
  const addToCart = async (itemId, quantity = 1) => {
    try {
      if (token) {
        await axios.post(
          `${url}/api/cart/add`, 
          { itemId, quantity },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      // Update the local state to reflect the change
      setCartItems((prev) => {
        const updatedCart = { ...prev };
        if (updatedCart[itemId]) {
          updatedCart[itemId] += quantity; // Increment quantity if item already in cart
        } else {
          updatedCart[itemId] = quantity; // Add new item if not in cart
        }
        return updatedCart;
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      if (token) {
        await axios.post(
          `${url}/api/cart/remove`, 
          { itemId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      // Update local cartItems state
      setCartItems((prev) => {
        const newCartItems = { ...prev };
        if (newCartItems[itemId] === 1) {
          delete newCartItems[itemId];
        } else if (newCartItems[itemId] > 1) {
          newCartItems[itemId] -= 1;
        }
        return newCartItems;
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Calculate total amount of items in the cart
  const getTotalCartAmount = () => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  };

  return (
    <StoreContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, token, setToken, food_list }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
