import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image storage configuration
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Route for adding food with image upload
foodRouter.post("/ecomm/api/v1/add", upload.single("image"), addFood);
foodRouter.get("/ecomm/api/v1/list", listFood);
foodRouter.post("/ecomm/api/v1/remove", removeFood);

// Export the router as a default export
export default foodRouter;
