const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const products = [
    "banane",
    "pamplemousse"
];


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


