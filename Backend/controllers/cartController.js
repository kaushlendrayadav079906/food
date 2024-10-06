import Cart from '../models/cartModel.js'; // Ensure Cart.js is in the correct path

// Function to add an item to the cart
export const addToCart = async (req, res) => {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
        return res.status(400).json({ message: "User ID and Item ID are required" });
    }

    try {
        // Find the cart for the given userId
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // If no cart exists for the user, create a new cart
            const newCart = await Cart.create({
                userId,
                items: [{ itemId, quantity: 1 }]
            });
            return res.status(201).json({ message: "Item added to cart", cart: newCart });
        }

        // Check if the item already exists in the cart
        const itemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId);

        if (itemIndex > -1) {
            // If item exists, increment the quantity
            cart.items[itemIndex].quantity += 1;
        } else {
            // If item doesn't exist, add a new item
            cart.items.push({ itemId, quantity: 1 });
        }

        await cart.save();
        res.status(200).json({ message: "Item added to cart", cart });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Function to remove an item from the cart
export const removeFromCart = async (req, res) => {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
        return res.status(400).json({ message: "User ID and Item ID are required" });
    }

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId);

        if (itemIndex > -1) {
            // If item is found, decrement the quantity or remove the item if quantity is 1
            if (cart.items[itemIndex].quantity > 1) {
                cart.items[itemIndex].quantity -= 1;
            } else {
                cart.items.splice(itemIndex, 1); // Remove item if quantity is 1
            }
            await cart.save();
            return res.status(200).json({ message: "Item removed from cart", cart });
        }

        res.status(404).json({ message: "Item not found in cart" });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Function to get the cart data
// Function to get the cart data
export const getCart = async (req, res) => {
    const userId = req.user.id; // Assume you set user ID in middleware based on the token

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const cart = await Cart.findOne({ userId }).populate('items.itemId'); // Populating items for more details

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ cart });
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
