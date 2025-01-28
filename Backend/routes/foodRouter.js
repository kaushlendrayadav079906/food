import express from 'express';
import multer from 'multer';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';

const foodRouter = express.Router();

// Image storage configuration
const storage = multer.diskStorage({
    destination: 'uploads', // Directory for storing uploaded images
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Multer configuration for image uploads
const upload = multer({ storage });

// Routes
foodRouter.post('/add', upload.single('image'), addFood); // Add food item
foodRouter.get('/list', listFood); // List all food items
foodRouter.delete('/remove/:id', removeFood); // Remove food item by ID

export default foodRouter;
