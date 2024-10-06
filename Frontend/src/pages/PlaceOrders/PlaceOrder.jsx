import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext'; // Ensure this path is correct
import './PlaceOrder.css';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCardAmount, token, cartItems, food_list, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Change handler for input fields
  const onChangeHandler = (event) => {
    const { name, value } = event.target; // Destructure the event target
    setData(prevData => ({ ...prevData, [name]: value })); // Update state with new value
  };

  const placeOrder = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const orderItems = [];

    // Prepare order items based on cart
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) { // Ensure cart item exists
        orderItems.push({
          productId: item._id, // Use item ID for reference
          quantity: cartItems[item._id], // Get quantity from cart
          price: item.price, // Include price for order
        });
      }
    });

    // Create order data object
    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCardAmount() + 10, // Adjust for delivery fee
    };

    try {
      // Send order data to the backend
      const response = await axios.post(`${url}/api/order/place-order`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url); // Redirect to payment session
      } else {
        alert("Error placing order, please try again.");
      }
    } catch (error) {
      console.error("Error while placing order:", error);
      alert(error.response ? error.response.data.message : "An unexpected error occurred. Please try again.");
    }
  };

  // Calculate the subtotal
  const subtotal = food_list.reduce((total, item) => {
    return total + (item.price * (cartItems[item._id] || 0));
  }, 0);

  const deliveryFee = 10; // Fixed delivery fee
  const total = subtotal + deliveryFee;

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className='place-order-left'>
        <h2>Delivery Information</h2>
        <input type="text" name="firstName" placeholder="First Name" required value={data.firstName} onChange={onChangeHandler} />
        <input type="text" name="lastName" placeholder="Last Name" required value={data.lastName} onChange={onChangeHandler} />
        <input type="email" name="email" placeholder="Email Address" required value={data.email} onChange={onChangeHandler} />
        <input type="text" name="street" placeholder="Street" required value={data.street} onChange={onChangeHandler} />
        <input type="text" name="city" placeholder="City" required value={data.city} onChange={onChangeHandler} />
        <input type="text" name="state" placeholder="State" required value={data.state} onChange={onChangeHandler} />
        <input type="text" name="zipcode" placeholder="Zip Code" required value={data.zipcode} onChange={onChangeHandler} />
        <input type="text" name="country" placeholder="Country" required value={data.country} onChange={onChangeHandler} />
        <input type="tel" name="phone" placeholder="Phone" required value={data.phone} onChange={onChangeHandler} />
      </div>
      <div className='place-order-right'>
        <h2>Order Summary</h2>
        <div className="order-summary">
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>Rs {subtotal.toFixed(2)}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery fee</p>
            <p>Rs {deliveryFee.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>Rs {total.toFixed(2)}</b>
          </div>
        </div>
      </div>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default PlaceOrder;
