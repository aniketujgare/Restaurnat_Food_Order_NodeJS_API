const mongoose = require('mongoose');

const Restaurant = require('../models/restaurant');
const MenuItem = require('../models/menu_item');
exports.restaurants_get_all = async (req, res, next) => {
    try {
        const listRestaurants = await Restaurant.find().select('_id name tagLine score logoUrl menu');
        console.log(listRestaurants);
        res.status(200).json({
            count: listRestaurants.length,
            restaurants: listRestaurants
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

exports.restaurants_get_a_restaurant = async (req, res, next) => {
    console.log(req.params.restaurantId)
    try {
        const restaurants = await Restaurant.findById(req.params.restaurantId)
            .select('_id name tagLine score logoUrl menu').populate('menu');
        res.status(200).json(restaurants);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

exports.restaurants_add_restaurant = async (req, res, next) => {
    const restName = req.body.restName;
    const tagLine = req.body.tagLine;
    const score = req.body.score;
    const logoUrl = req.body.logoUrl;
    const menu = req.body.menu;
    try {
        const restaurant = new Restaurant({
            _id: new mongoose.Types.ObjectId(),
            name: restName,
            tagLine: tagLine,
            score: score,
            logoUrl: logoUrl,
            menu: menu
        });
        console.log(restaurant);
        const result = await restaurant.save();
        console.log(result);
        res.status(200).json({
            message: 'Restaurant Added',
            restaurant: restaurant,
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

exports.restaurants_update_restaurant = async (req, res, next) => {
    const id = req.params.restaurantId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.key] = ops.value;
    }
    console.log(updateOps);
    try {
        const restaurants = await Restaurant.updateOne({ _id: id }, { $set: updateOps })
        res.status(200).json({
            message: 'Restaurant updated',
            restaurants: updateOps
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

exports.restaurants_delete_restaurant = (req, res, next) => {
    Restaurant.findByIdAndDelete(req.params.restaurantId)
        .exec()
        .then(result => {
            if (!result) {
                res.status(404).json({
                    message: 'Restraunt not found',
                });
            }
            res.status(200).json({
                message: 'Restraunt deleted',
                restaurant: result
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

