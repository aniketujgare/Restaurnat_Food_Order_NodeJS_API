const express = require('express');
const router = express.Router();




const restaurantController = require('../controllers/restaurant');

router.get('/', restaurantController.restaurants_get_all);
router.get('/:restaurantId', restaurantController.restaurants_get_a_restaurant);
router.post('/', restaurantController.restaurants_add_restaurant);
router.patch('/:restaurantId', restaurantController.restaurants_update_restaurant);
router.delete('/:restaurantId', restaurantController.restaurants_delete_restaurant);


module.exports = router;