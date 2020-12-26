const config = require('./src/app/config.json');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const ProductJS = require('./src/app/Product');
const ScraperJS = require('./src/scraper/scraper');
const mysql = require('mysql');
const db = mysql.createConnection(config.Database);
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());

// ROUTER
// ROOT
app.get('/', (req, res) => {
    res.json({
        message: 'root directory'
    });
});
// Products
app.post('/products/get', (req, res, next) => {
    if(req.body.productInfo.name !=undefined && req.body.productInfo.url !=undefined ){
        console.log(req.body.productInfo.url);
        ScraperJS.getProductFromAmazon(req.body.productInfo.name, req.body.productInfo.url, function(_product) {
            var tags = _product.name.replace(/\//g," ").replace(/[^a-zA-Z0-9\s'"]/g, '').split(" ").filter(item => item);
            console.log(tags);
            var product = new ProductJS.Product(1, _product.name.toString().slice(0, 99), 1, req.body.productInfo.url, _product.price.replace(/\$/g, ''), _product.brand);
            if(ProductJS.AddProductToDb(product, db) !=false){
                res.json(_product);
            }
            else{
                
                res.json({
                    message: "Product already in database."
                });
            }
        });
    }
    else res.status(404);
});
app.get('/products/:id', (req, res, next) => {
    if(req.params.id != undefined){
        let id = parseInt(req.params.id);
        if(typeof id  == 'number'){
            ProductJS.getProduct(id, db, function(e){
                if(e){
                    res.json(e);
                }
                else{
                    res.status(400);
                    res.json({
                        message: "Invalid product ID"
                    });
                }
            });
        }
        else{
            res.status(400);
            res.json({
                message: "Invalid product ID"
            });
        }
    }
    else{
        next();
    }
});
app.get('/products/', (req, res) => {
    console.log(req.ip);
    ProductJS.getDbProducts(db, function(e){
        res.json(e);
    });
});
// Users
// TODO: Implement USERS
app.get('/users/:id', (req, res) => {
    res.send('Not implemented.');
});
app.get('/favicon.ico', (req, res) =>{
    res.sendFile('./resources/img/Blackwidow.png')
});


app.listen(80);


