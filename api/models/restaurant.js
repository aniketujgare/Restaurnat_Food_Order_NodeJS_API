const mongoose = require('mongoose');


const menuItemSchema = require('./menu_item').schema;
const restaurantSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    tagLine: String,
    score: Number,
    logoUrl: String,
    menu: { type: Array, of: mongoose.Types.ObjectId, ref: 'MenuItem' }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
