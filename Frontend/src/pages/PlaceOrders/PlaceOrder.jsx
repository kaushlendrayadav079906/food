import React from 'react';
import './PlaceOrder.css';

const PlaceOrder = () => {
  return (
    <form className="place-order">
      <div className='place-order-left'>
        <h2>Delivery Information</h2>
        <input type="text" placeholder="First Name" required />
        <input type="text" placeholder="Last Name" required />
        <input type="email" placeholder="Email Address" required />
        <input type="text" placeholder="Street" required />
        <input type="text" placeholder="City" required />
        <input type="text" placeholder="State" required />
        <input type="text" placeholder="Zip Code" required />
        <input type="text" placeholder="Country" required />
        <input type="tel" placeholder="Phone" required />
      </div>
      <div className='place-order-right'>
        {/* You can add additional content or styling here if needed */}
      </div>
      <button type="submit">Place Order</button>
    </form>
  );
}

export default PlaceOrder;
