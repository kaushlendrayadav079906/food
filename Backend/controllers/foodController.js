import foodModel from "../models/foodModel";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    // Create new food item model
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding food" });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching food items" });
    }
}
//remove food item
// remove food item
const removeFood = async (req, res) => {
    try {
        // Find the food by ID using req.params.id
        const food = await foodModel.findById(req.params.id);

        // Check if the food item exists
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Check if the image exists before trying to delete it
        if (food.image) {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) {
                    console.error("Error removing image:", err);
                    return res.status(500).json({ success: false, message: "Error deleting image" });
                }
            });
        }

        // Remove the food item from the database
        await foodModel.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: "Food item removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing food item" });
    }
};


export { addFood, listFood,removeFood };