import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext'; 

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  // Handle adding to cart
  const handleAddToCart = () => {
    addToCart(id); 
  };

  // Handle removing from cart
  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  return (
    <div className='Food-item-container'>
      <div className='Food-item-img-container'>
        <img className='Food-item-image' src={image} alt={name} />
      </div>
      <div className='Food-item-info'>
        <div className='Food-item-name-rating'>
          <p className='Food-item-price-per-plate'>₹{price} per plate</p>
          <p className='Food-item-name'>{name}</p>
          <img src={assets.rating_starts} alt="Rating Stars" />
        </div>
        <p className='Food-item-desc'>{description}</p>

        {/* Buttons to add and remove from cart */}
        <div className='Food-item-cart-actions'>
          <button className='btn btn-primary' onClick={handleAddToCart}>
            Add to Cart
          </button>
          {/* <button className='btn btn-danger' onClick={handleRemoveFromCart} disabled={!cartItems[id]}>
            Remove from Cart
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
