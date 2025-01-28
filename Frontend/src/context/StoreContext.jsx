// StoreContext.jsx
import axios from "axios";
import { createContext, useEffect, useState } from "react";

const url = "http://localhost:8889"; // Base URL for your API

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(null);
  const [food_list, setFoodList] = useState([]);

  // Fetch food list from API
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
    loadData();
  }, []);

  const addToCart = async (itemId, quantity = 1) => {
    try {
      if (token) {
        await axios.post(
          `${url}/api/cart/add`,
          { item: { itemId, quantity } },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      setCartItems((prev) => {
        const updatedCart = { ...prev };
        updatedCart[itemId] = (updatedCart[itemId] || 0) + quantity;
        return updatedCart;
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <StoreContext.Provider
      value={{ cartItems, setCartItems, addToCart, token, setToken, food_list }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
