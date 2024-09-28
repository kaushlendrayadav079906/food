import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, addToCart } = useContext(StoreContext);
  const [quantity, setQuantity] = useState({}); // Local state for input quantities
  const [promoCode, setPromoCode] = useState(""); // Local state for promo code

  const handleQuantityChange = (itemId, value) => {
    // Prevent negative quantities
    if (value < 0) return;
    setQuantity((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const handleUpdateQuantity = (itemId) => {
    const newQuantity = parseInt(quantity[itemId]) || 0; // Convert to number
    const currentQuantity = cartItems[itemId] || 0;

    // Update the cart based on the new quantity
    if (newQuantity > currentQuantity) {
      // Add items if the new quantity is greater
      for (let i = 0; i < newQuantity - currentQuantity; i++) {
        addToCart(itemId);
      }
    } else if (newQuantity < currentQuantity) {
      // Remove items if the new quantity is less
      for (let i = 0; i < currentQuantity - newQuantity; i++) {
        removeFromCart(itemId);
      }
    }
  };

  // Calculate subtotal
  const subtotal = food_list.reduce((total, item) => {
    return total + (item.price * (cartItems[item._id] || 0));
  }, 0);

  const deliveryFee = 10; // Example delivery fee
  const total = subtotal + deliveryFee;

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
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
          if (cartItems[item._id] > 0) {
            return (
              <div className="cart-item-title cart-items-item" key={item._id}>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>${item.price.toFixed(2)}</p>
                <input
                  type="number"
                  min="0"
                  value={quantity[item._id] || cartItems[item._id]}
                  onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                  onBlur={() => handleUpdateQuantity(item._id)}
                  style={{ width: "60px", textAlign: "center" }} // Style input width
                />
                <p>${(item.price * (quantity[item._id] || cartItems[item._id])).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item._id)}>X</button>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-Total">
          <h2>Cart Totals</h2>
        </div>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <div className="cart-total-details">
          <p>Delivery fee</p>
          <p>${deliveryFee.toFixed(2)}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <b>Total</b>
          <b>${total.toFixed(2)}</b>
        </div>
      </div>
      <div className="cart-promocode">
        <p>If you have a promo code, enter it here:</p>
        <div className="cart-promocode-input">
          <input 
            type="text" 
            placeholder="Promo code" 
            value={promoCode} 
            onChange={handlePromoCodeChange} 
          />
        </div>
      </div>
      <button>Sumbit</button>
    </div>
  );
};

export default Cart;
