const express = require('express');
const route = express.Router();

route.get('/',(req, res, next) => {
    res.status(200).json({
        message : 'Handling Get requests to /products'
    });
});

route.post('/',(req, res, next) => {
    res.status(201).json({
        message : 'Handling Post requests to /products'
    });
});

route.get('/:productId',(req, res, next)=>{
    const id = req.params.productId;
    if(id =='special'){
        res.status(200).json({
            message : 'You discoverd the spectial ID',
            id : id

        });
    }else{
        res.status(200).json({
            message : "You passed and ID"
        });
    }
});

route.patch('/:productId',(req, res, next)=>{
    res.status(200).json({
        message : 'Update product'
    });
});

route.delete('/:productId',(req, res, next)=>{
    res.status(200).json({
        message : 'Delete product'
    });
});

module.exports = route;