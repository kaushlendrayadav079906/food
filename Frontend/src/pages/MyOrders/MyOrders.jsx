import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets"; // Verify this path
import { StoreContext } from '../../context/StoreContext'; // Verify this path
import "./MyOrders.css";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext); // Corrected from StorageContext to StoreContext
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  const fetchOrder = async () => {
    try {
      const response = await axios.post(`${url}/api/order/userOrder`, {}, {
        headers: { token },
      });
      setData(response.data.data); // Set the order data
      console.log("Fetched Orders:", response.data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please try again."); // Set error message
    } finally {
      setLoading(false); // Stop loading regardless of success or error
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);

  if (loading) return <p>Loading...</p>; // Show loading message
  if (error) return <p>{error}</p>; // Show error message

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.length > 0 ? (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <p>
                {order.items.map((item, idx) => (
                  idx === order.items.length - 1
                    ? `${item.name} x ${item.quantity}` // Show last item without a comma
                    : `${item.name} x ${item.quantity}, `
                ))}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25CF;</span> {/* Use HTML entity for dot */}
                <b>{order.status}</b>
              </p>
            </div>
          ))
        ) : (
          <p>No orders found.</p> // Message if no orders
        )}
      </div>
    </div>
  );
};

export default MyOrders;
