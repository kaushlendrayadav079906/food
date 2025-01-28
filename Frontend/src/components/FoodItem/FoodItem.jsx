import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './FoodItem.css';

const FoodItem = ({ id, name, description, price, image }) => {
  const { addToCart } = useContext(StoreContext);

  const handleAddToCart = () => {
    addToCart(id); // Add item to cart by ID
  };

  return (
    <div className="Food-item-container">
      <div className="Food-item-img-container">
        <img
          className="Food-item-image"
          src={image ? `http://localhost:8889/image/${image}` : '/path/to/default/image.jpg'}
          alt={name}
        />
      </div>
      <div className="Food-item-info">
        <p className="Food-item-price-per-plate">₹{price} per plate</p>
        <p className="Food-item-name">{name}</p>
        <p className="Food-item-desc">{description}</p>
        <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default FoodItem;
