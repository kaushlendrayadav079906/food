import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    setCartItems,
    removeFromCart,
    token,
    addToCart,
  } = useContext(StoreContext);
  const [quantity, setQuantity] = useState({});
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch cart data when component is mounted or token changes
  useEffect(() => {
    const fetchCartData = async () => {
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:8889/api/cart/getCart",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setCartItems(response.data.cart);
        } catch (error) {
          console.error("Error fetching cart data:", error.message);
          alert("Failed to fetch cart data. Please check the backend server.");
        }
      }
      setLoading(false); // Set loading to false after fetching
    };
    fetchCartData();
  }, [setCartItems, token]);

  if (loading) {
    return <p>Loading cart...</p>; // Show loading message while fetching
  }

  const handleQuantityChange = (itemId, value) => {
    const numericValue = Math.max(1, parseInt(value) || 1);
    setQuantity((prev) => ({
      ...prev,
      [itemId]: numericValue,
    }));
  };

  const handleUpdateQuantity = async (itemId) => {
    const newQuantity = quantity[itemId] || 1;
    try {
      await axios.post(
        "http://localhost:8889/api/cart/update",
        { itemId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const response = await axios.get(
        "http://localhost:8889/api/cart/getCart",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCartItems(response.data.cart);
    } catch (error) {
      console.error("Error updating quantity:", error.message);
      alert("Failed to update quantity. Please check the backend server.");
    }
  };

  const subtotal = food_list.reduce((total, item) => {
    const itemQuantity = cartItems[item._id] || 0;
    return total + item.price * itemQuantity;
  }, 0);

  const deliveryFee = 10;
  const total = subtotal + deliveryFee;

  const applyPromoCode = () => {
    if (promoCode === "DISCOUNT10") {
      const discount = 0.1 * subtotal;
      alert(`Discount applied! New total: Rs ${(total - discount).toFixed(2)}`);
    } else {
      alert("Invalid promo code.");
    }
  };

  return (
    <div className="cart">
      <div className="cart-item">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          const itemQuantity = cartItems[item._id] || 0;
          if (itemQuantity > 0) {
            return (
              <div className="cart-item-title cart-items-item" key={item._id}>
                <img
                  className="Food-item-image"
                  src={`http://localhost:8889/image/${item.image}`}
                  alt={item.name}
                />
                <p>{item.name}</p>
                <p>Rs {item.price.toFixed(2)}</p>
                <input
                  type="number"
                  value={quantity[item._id] || itemQuantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(item._id, e.target.value)
                  }
                />
                <button onClick={() => handleUpdateQuantity(item._id)}>
                  Update Quantity
                </button>
                <p>
                  {(item.price * (quantity[item._id] || itemQuantity)).toFixed(
                    2
                  )}
                </p>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-summary">
        <p>Subtotal: Rs {subtotal.toFixed(2)}</p>
        <p>Delivery Fee: Rs {deliveryFee}</p>
        <p>Total: Rs {total.toFixed(2)}</p>

        <input
          type="text"
          placeholder="Enter promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button onClick={applyPromoCode}>Apply Promo Code</button>
      </div>
    </div>
  );
};

export default Cart;
