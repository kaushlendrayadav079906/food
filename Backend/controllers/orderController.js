import orderModel from "../models/orderModel.js"; // Adjust the path as necessary
import userModel from "../models/user.model.js"; // Adjust the path as necessary
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Ensure the Stripe key is correctly initialized

// Placing user order for frontend
export const placeOrder = async (req, res) => { // Use named export
    const frontend_url = "http://localhost:5173";

    try {
        // Create a new order
        const newOrder = new orderModel({
            userid: req.body.userId,
            item: req.body.item,
            amount: req.body.items,
            address: req.body.address,
        });
        await newOrder.save();
        
        // Clear the user's cart data
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare line items for Stripe
        const line_items = req.body.item.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100 * 80, // Convert to the smallest currency unit
            },
            quantity: item.quantity,
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery charges",
                },
                unit_amount: 2 * 100 * 80, // Set delivery charge as per your requirement (2 INR here converted to smallest unit)
            },
            quantity: 1,
        });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder.id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder.id}`,
        });

        // Respond with the session URL
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.json({ success: false, message: "An error occurred while placing the order." });
    }
};
