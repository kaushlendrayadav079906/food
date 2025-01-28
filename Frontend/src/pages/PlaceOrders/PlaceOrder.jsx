import axios from 'axios';
import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext'; // Ensure this path is correct
import './PlaceOrder.css';

const PlaceOrder = () => {
  const { token, cartItems, food_list, url, userId } = useContext(StoreContext);
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

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    const orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          productId: item._id,
          quantity: cartItems[item._id],
          price: item.price,
        });
      }
    });

    // Calculate subtotal, delivery fee, and total amount here
    const subtotal = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = 10; // Fixed delivery fee
    const totalAmount = subtotal + deliveryFee;

    const orderData = {
      address: {
        ...data,
        zip: data.zipcode, // Ensure this matches your backend expectations
      },
      items: orderItems,
      amount: totalAmount,
      userId: userId, // Ensure userId is correctly set
    };

    console.log("Order Data:", orderData); // Debugging line to check order data

    try {
      const response = await axios.post(`${url}/api/order/place-order`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order, please try again.");
      }
    } catch (error) {
      console.error("Error while placing order:", error);
      alert(error.response ? error.response.data.message : "An unexpected error occurred. Please try again.");
    }
  };

  // Calculate subtotal, delivery fee, and total amount for rendering
  const orderItems = food_list.filter(item => cartItems[item._id] > 0);
  const subtotal = orderItems.reduce((total, item) => total + (item.price * cartItems[item._id]), 0);
  const deliveryFee = 10; // Fixed delivery fee
  const totalAmount = subtotal + deliveryFee;

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
            <b>Rs {totalAmount.toFixed(2)}</b>
          </div>
        </div>
      </div>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default PlaceOrder;
