const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

route.get('/',(req, res, next) => {
    Product.find()
    .select("_id price name")
    .exec()
    .then(docs => {
        //console.log(docs);
        const response = {
            count : docs.length,
            products : docs.map(doc =>{
                return {
                    name : doc.name,
                    price : doc.price,
                    _id : doc._id,
                    request : {
                        type : "GET",
                        url : "http://localhost:3000/products/" + doc._id
                    }
                }
            })
        }
        //if (docs.length >= 0){
            res.status(200).json(response);
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
                message : 'Create product successfully',
                createProduct : {
                    name : result.name,
                    price : result.price,
                    _id : product._id,
                    request : {
                        type:"GET",
                        url : "http://localhost:3000/products/" + result._id
                    }

                }
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
    .select("_id name price")
    .exec()
    .then(doc =>{
        console.log('From database ' + doc);
        if (doc){
            res.status(200).json({
                name : doc.name,
                price : doc.price,
                _id : doc._id,
                request : {
                    type : "GET",
                    description : "Get all products",
                    url : "http://localhost:3000/products"

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

route.patch('/:productId',(req, res, next)=>{
    const id = req.params.productId;
    
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
        console.log(ops.propName);
        console.log(ops.value);
    }
    Product.update({_id : id},{$set : updateOps})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message : "Product updated.",
            request :{
                type :"GET",
                url : "http://localhost:3000/products/" + id               
            }
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
    
});

route.delete('/:productId',(req, res, next)=>{
    const id = req.params.productId;
    Product.remove({_id:id})
    .exec()
    .then(result => {
        res.status(200).json({
            message : "Product deleted.",
            request :{
                type :"GET",
                url : "http://localhost:3000/products/",
                data : {
                    name : "String" , price : "Number"
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