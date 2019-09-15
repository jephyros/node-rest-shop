const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');
const Order = require('../models/order');


route.get('/',(req, res, next) => {
    Order.find()
    .select("_id product quantity")
    .populate("product","name")
    .exec()
    .then(docs =>{
        res.status(200).json({
            count : docs.length,
            products : docs.map(doc =>{
                return {
                    product : doc.product,
                    quantity : doc.quantity,
                    _id : doc._id,
                    request : {
                        type : "GET",
                        url : "http://localhost:3000/orders/" + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    });

});

route.post('/',(req, res, next) => {
    

    Product.findById(req.body.productId)
    .select("_id name price")
    .exec()
    .then(product =>{
        if(!product){
            return res.status(400).json({
                message : "Product not found"
            });
        }
        const order = new Order({
            _id : mongoose.Types.ObjectId(),
            quantity : req.body.quantity,
            product : req.body.productId
        });
        return order.save()
    })
    .then(result=>{
            console.log(result);
            res.status(201).json({
                message : 'Create order successfully',
                createProduct : {
                    product : result.product,
                    quantity : result.quantity,
                    _id : result._id,
                    request : {
                        type:"GET",
                        url : "http://localhost:3000/orders/" + result._id
                    }

                }
            });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

    
});

route.get('/:orderId',(req, res, next)=>{
    Order.findById(req.params.orderId)
    .select("_id product quantity")
    .exec()
    .then(doc =>{
        console.log('From database ' + doc);
        if (doc){
            res.status(200).json({
                product : doc.product,
                quantity : doc.quantity,
                _id : doc._id,
                request : {
                    type : "GET",
                    description : "Get all orders",
                    url : "http://localhost:3000/orders"

                }
            });
        }else{
            res.status(404).json({messtae: 'No valid entry found for provided ID'});
        }

    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
    
});

route.delete('/:orderId',(req, res, next)=>{
    Order.remove({_id:req.params.orderId})
    .exec()
    .then(result => {
        res.status(200).json({
            message : "Order deleted.",
            request :{
                type :"GET",
                url : "http://localhost:3000/orders/",
                data : {
                    product : "ID" , quantity : "Number"
                }            
            }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});


module.exports = route;