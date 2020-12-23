const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const products = require('./products.json');
const startup = require('./src/app/startup');
const app = express();

startup.startup;

app.use(morgan('dev'));
app.use(express.json());


// add a product
products.push({
    id: '',
    name: '',
    shops:[] 
});
//add a shop
products.shops.push({
    shop_name: '',
    price: ''
});

console.log(products);
/**
 * liste de tt []
 * -- produits array{}
 * -- --le produit
 * -- -- --les shop ou on peut les trouver
 * 
 */

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
        
        var product = products[req.body.productid];
        console.log("Product: " + product);
        res.json({
            message: "Products",
            product: product,
            price: "1$"
        });
    }
    else
    {
        res.json({
            message: "Display all products"
        });
    }
});
// Users
app.get('/users/', (req, res) => {

});




app.listen(80);


