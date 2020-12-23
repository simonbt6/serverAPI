const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const products = require('./products.json');
const startup = require('./src/app/startup');
const ProductJS = require('./src/app/Product');

const app = express();

const _products = startup.getProducts(products);

app.use(morgan('dev'));
app.use(express.json());


// ROUTER
// ROOT
app.get('/', (req, res) => {
    res.json({
        message: 'Root'
    });
});
// Products
app.get('/products/', (req, res) => {
    if(req.body.productid !=undefined){
        var $product = _products[req.body.productid];
        //var product = products[req.body.productid];
        console.log("Product: " + $product.getName());
        res.json({
            message: "Products",
            name: $product.getName(),
            url: $product.getURL(),
            price: $product.getPrice() + "$"
        });
    }
    else
    {
        res.json(
            _products
        );
    }
});
// Users
app.get('/users/', (req, res) => {

});




app.listen(80);


