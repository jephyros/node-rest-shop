const express  = require('express');
var cors = require('cors');
const app = express();  
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const productRouters = require('./api/routes/products');
const orderRouters = require('./api/routes/orders')
const userRouters = require('./api/routes/user')

mongoose.connect('mongodb://localhost:27017/node-shop',
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true

    }).catch(err => {
    console.log(err)
  })


app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());


// Route which should handle requests 
app.use('/products', productRouters);
app.use('/orders',orderRouters);
app.use('/user',userRouters);

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