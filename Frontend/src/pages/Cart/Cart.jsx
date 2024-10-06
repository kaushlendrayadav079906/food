import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cartItems, food_list, setCartItems, removeFromCart, token, addToCart } = useContext(StoreContext);
    const [quantity, setQuantity] = useState({});
    const [promoCode, setPromoCode] = useState("");
    const navigate = useNavigate();

    // Fetch cart data when the component mounts and when the token changes
    useEffect(() => {
        const fetchCartData = async () => {
            if (token) {
                try {
                    const response = await axios.get("http://localhost:8889/api/cart/getCart", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setCartItems(response.data.cart); // Ensure cart is correctly set
                } catch (error) {
                    console.error("Error fetching cart data:", error.message);
                    alert("Failed to fetch cart data. Please check the backend server.");
                }
            }
        };
        fetchCartData();
    }, [setCartItems, token]);

    // Handle quantity changes in the input
    const handleQuantityChange = (itemId, value) => {
        const numericValue = parseInt(value) || 1; // Default to 1 if input is invalid
        setQuantity((prev) => ({
            ...prev,
            [itemId]: numericValue,
        }));
    };

    // Update quantity in the backend and refetch cart data
    const handleUpdateQuantity = async (itemId) => {
        const newQuantity = quantity[itemId] || 1; // Use the quantity from state or default to 1
        try {
            await addToCart(itemId, newQuantity);  // Assuming addToCart updates the quantity
            const response = await axios.get("http://localhost:8889/api/cart/getCart", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(response.data.cart);  // Update the cart items
        } catch (error) {
            console.error("Error updating quantity:", error.message);
            alert("Failed to update quantity. Please check the backend server.");
        }
    };

    // Calculate the subtotal
    const subtotal = food_list.reduce((total, item) => {
        const itemQuantity = cartItems[item._id] || 0;
        return total + (item.price * itemQuantity);
    }, 0);

    const deliveryFee = 10;
    const total = subtotal + deliveryFee;

    // Function to apply promo code
    const applyPromoCode = () => {
        console.log("Promo code applied:", promoCode);
        if (promoCode === "DISCOUNT10") {
            const discount = 0.1 * subtotal; // 10% discount
            const newTotal = total - discount + deliveryFee; // Update total with discount
            alert(`Discount applied! New total: Rs ${newTotal.toFixed(2)}`);
        } else {
            alert("Invalid promo code.");
        }
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
                    const itemQuantity = cartItems[item._id] || 0; // Get the quantity from cartItems
                    if (itemQuantity > 0) {
                        return (
                            <div className="cart-item-title cart-items-item" key={item._id}>
                                <img src={item.image} alt={item.name} />
                                <p>{item.name}</p>
                                <p>Rs {item.price.toFixed(2)}</p>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity[item._id] !== undefined ? quantity[item._id] : itemQuantity}
                                    onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                                    onBlur={() => handleUpdateQuantity(item._id)} // Update quantity on input blur
                                    style={{ width: "60px", textAlign: "center" }}
                                />
                                <p>Rs {(item.price * itemQuantity).toFixed(2)}</p>
                                <button onClick={() => removeFromCart(item._id)}>X</button>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            {/* Cart totals section */}
            <div className="cart-bottom">
                <div className="cart-Total">
                    <h2>Cart Totals</h2>
                </div>
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
                <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
            </div>

            {/* Promo code section */}
            <div className="cart-promocode">
                <p>If you have a promo code, enter it here:</p>
                <div className="cart-promocode-input">
                    <input 
                        type="text" 
                        placeholder="Promo code" 
                        value={promoCode} 
                        onChange={(e) => setPromoCode(e.target.value)} 
                    />
                </div>
            </div>
            <button onClick={applyPromoCode}>Submit</button>
        </div>
    );
};

export default Cart;
