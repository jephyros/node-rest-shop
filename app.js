const express  = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


const productRouters = require('./api/routes/products');
const orderRouters = require('./api/routes/orders')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Route which should handle requests 
app.use('/products', productRouters);
app.use('/orders',orderRouters);

app.use((req, res, next) =>{
    const error =new Error("Not found - CustomCIS");
    error.status =404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    })
});


module.exports = app;