// const { default: mongoose } = require('mongoose');
// const user_model = require('../models/food.model');
// const jwt = require('jsonwebtoken');

// const secret = 'yourSecretKey'; // Replace with your actual secret key
import mongoose from "mongoose"

const foodSchema = new mongoose.Schema({
    name: {type:String,required:true},
    description:{type:String,required:true},
    price:{type:String,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}
})
const foodModel = mongoose.model.food ||mongoose.model("ecomm",foodSchema)
export default foodModel