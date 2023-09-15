const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    _restaurantId: { type: mongoose.Types.ObjectId, ref: 'Restaurant', required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imgUrl: String,
});

module.exports = mongoose.model('MenuItem', menuItemSchema);