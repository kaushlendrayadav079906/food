// cartRoute.js
import express from 'express';
const cartRouter = express.Router();

cartRouter.post('/add', (req, res) => {
    const { item } = req.body;
    if (!item) {
        return res.status(400).json({ message: 'Item data is required' });
    }
    
    console.log('Item added to cart:', item);
    res.status(200).json({ message: 'Item added to cart', item });
});

export default cartRouter;
