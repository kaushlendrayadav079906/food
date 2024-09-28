import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext'; // Corrected the import from StoreContext
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className='food-display-list'>
                {food_list.map((item, index) => {
                    // Corrected comparison operator from = to ===
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem
                                key={item.id || index} // Use a unique id if available
                                id={item.id || index} // Pass the unique id
                                name={item.name} // Pass the food name
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        );
                    }
                    return null; // Ensure to return null if the condition is not met
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
