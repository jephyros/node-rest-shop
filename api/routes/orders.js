const express = require('express');
const router = express.Router();

const OrdersController = require('../controllers/orders');

router.get('/', OrdersController.orders_get_all);
router.post('/',OrdersController.orders_create_order);
router.get('/:orderId',OrdersController.orders_detail_view);
router.delete('/:orderId',OrdersController.orders_delete);


module.exports = router;