const mongoose = require('mongoose');

const Restaurant = require('../models/restaurant');
const MenuItem = require('../models/menu_item');

exports.menuItem_add_menu = async (req, res, next) => {
    const dishName = req.body.dishName;
    const dishPrice = req.body.dishPrice;
    const dishCategory = req.body.dishCategory;
    const imgUrl = req.body.imgUrl;
    const menuItem = new MenuItem({
        _id: new mongoose.Types.ObjectId(),
        _restaurantId: req.params.restaurantId,
        name: dishName,
        price: dishPrice,
        category: dishCategory,
        imgUrl: imgUrl,
    });
    try {
        const restaurant = await Restaurant.updateOne({ _id: req.params.restaurantId }, { $push: { menu: menuItem._id } });
        menuItem.save();
        res.status(200).json({
            message: "MenuItem Added",
            "_id": menuItem._id
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.add_multi_menuItem = async (req, res, next) => {

    try {
        for (let menuItem of req.body) {
            const Item = new MenuItem({
                _id: new mongoose.Types.ObjectId(),
                _restaurantId: req.params.restaurantId,
                name: menuItem["name"],
                price: menuItem["price"],
                category: menuItem["category"],
                imgUrl: menuItem["imgUrl"],
            });
            console.log(Item);
            const restaurant = await Restaurant.updateOne({ _id: req.params.restaurantId }, { $push: { menu: Item._id } });
            Item.save();
        }
        res.status(200).json({
            message: "MenuItems Added",
            noOfItemsAdded: req.body.length
        });

    } catch (err) {
        res.status(500).json({ error: err });
    }



};

exports.menuItem_get_menu = async (req, res, next) => {
    try {
        console.log(req.params.menuItemId);
        const menuItem = await MenuItem.findById(req.params.menuItemId)
            .populate("_restaurantId", 'name');
        res.status(200).json(menuItem);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.menuItem_delete_menuItem = async (req, res, next) => {
    try {
        const menuItem = await MenuItem.findByIdAndDelete(req.params.menuItemId);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu Item does not exist' })
        }
        const restaurants = await Restaurant.updateOne({ _id: menuItem._restaurantId }, { $pull: { menu: menuItem._id } });
        res.status(200).json({ message: 'Menu Item Deleted', menuItem: menuItem });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.menuItem_Update_menuItem = async (req, res, next) => {
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.key] = ops.value;
    }
    console.log(updateOps)
    try {
        const menuItem = await MenuItem.updateOne({ _id: req.params.menuItemId }, { $set: updateOps });
        res.status(200).json({ message: 'Menu Item Updated', updatedFields: updateOps });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};