import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './FoodDetail.css';

const FoodDetail = ({ id }) => {
    // Default food_list to an empty array if it's undefined
    const { food_list = [] } = useContext(StoreContext);

    // Check if food_list is an array and handle the case when it's empty or undefined
    if (!Array.isArray(food_list)) {
        return <div>Error: food_list is not an array.</div>;
    }

    // Find the specific item by its id
    const foodItem = food_list.find(item => item.id === id);

    // If the item is not found, show a message
    if (!foodItem) {
        return <div>Food item not found</div>;
    }

    return (
        <div className="food-detail">
            <h2>{foodItem.name}</h2>
            <img src={foodItem.image} alt={foodItem.name} />
            <p>{foodItem.description}</p>
            <p>Price: ${foodItem.price}</p>
        </div>
    );
};

export default FoodDetail;
