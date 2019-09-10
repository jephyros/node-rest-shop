const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

route.get('/',(req, res, next) => {
    Product.find()
    .exec()
    .then(docs => {
        console.log(docs);
        //if (docs.length >= 0){
            res.status(200).json(docs);
        // } else {
        //     res.status(400).json({
        //         message: 'No entries found'

        //     });
        // }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
    
});

route.post('/',(req, res, next) => {
    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(result=>{
            console.log(result);
            res.status(201).json({
                message : 'Handling Post requests to /products',
                createProduct : product
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });

        });
    
});

route.get('/:productId',(req, res, next)=>{
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc =>{
        console.log('From database ' + doc);
        if (doc){
            res.status(200).json(doc);
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

route.patch('/:productId',(req, res, next)=>{
    res.status(200).json({
        message : 'Update product'
    });
});

route.delete('/:productId',(req, res, next)=>{
    const id = req.params.productId;
    Product.remove({_id:id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
});

module.exports = route;