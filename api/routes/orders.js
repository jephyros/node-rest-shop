const express = require('express');
const route = express.Router();

route.get('/',(req, res, next) => {
    res.status(200).json({
        message : 'Orders were fetched'
    });
});

route.post('/',(req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message : 'Order was created',
        order: order
    });
});

route.get('/:orderId',(req, res, next)=>{
    res.status(201).json({
        message : 'Order was details',
        orderId : req.params.orderId
    });
});

route.delete('/:orderId',(req, res, next)=>{
    res.status(201).json({
        message : 'Order deleted',
        orderId : req.params.orderId
    });
});


module.exports = route;