const express = require('express');
const router = express.Router();




const menuController = require('../controllers/menu_item');

router.get('/:menuItemId', menuController.menuItem_get_menu);
router.post('/:menuItemId', menuController.menuItem_Update_menuItem);
router.post('/add/:restaurantId', menuController.menuItem_add_menu );
router.delete('/:menuItemId', menuController.menuItem_delete_menuItem);
router.post('/AddMultiMenuItems/:restaurantId',menuController.add_multi_menuItem)

module.exports = router;