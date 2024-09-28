import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets"; // Import your food list

// Create the context
export const StoreContext = createContext(null);

// Create the provider component
const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({}); // State for cart items

  // Function to add an item to the cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1, // Increment quantity or initialize to 1
    }));
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] === 1) {
        // Set the item to 0 when it's the last one being removed
        return {
          ...prev,
          [itemId]: 0, // This keeps it in the state but sets the quantity to 0
        };
      } else if (prev[itemId] > 1) {
        // Decrease quantity if it's more than 1
        return {
          ...prev,
          [itemId]: prev[itemId] - 1,
        };
      }
      return prev; // Return the previous state if there's nothing to remove
    });
  };

  useEffect(() => {
    console.log(cartItems); // For debugging cart updates
  }, [cartItems]);

  // Context value that provides the state and functions to the children
  const contextValue = {
    food_list,   // Ensure food_list is imported and accessible
    cartItems,   // Cart items state
    addToCart,   // Function to add to cart (ensure it's passed in context)
    removeFromCart, // Function to remove from cart
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

// Export the provider as a default export
export default StoreContextProvider;
