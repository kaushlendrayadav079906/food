import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const orderUrl = "http://localhost:8889/api/order"; // Updated URL
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${orderUrl}/list`); // Using updated orderUrl
      console.log(response.data); // Check what data is being received
      if (response.data.success) {
        setOrders(response.data.data || response.data.orders); // Adjust to match the actual data structure
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <p className='order-item-food'>
                {order.items.map((item, itemIndex) => {
                  return itemIndex === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `;
                })}
              </p>
              <p className='order-item-total'>
                Total Items: {order.items.reduce((total, item) => total + item.quantity, 0)}
              </p>
              <p className='order-item-name'>
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className='order-item-phone'>
                Phone: {order.address.phoneNumber}
              </p>
              <div className='order-item-address'>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
                <p>${order.amount}</p>
                <select>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p>No orders available</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
