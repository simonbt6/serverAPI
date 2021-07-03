const ProductJS = require('../Product');
const ScraperJS = require('../../scraper/scraper');
const mysql = require('mysql');
const config = require('../config.json');
const db = mysql.createConnection(config.Database);
const Express = require('express');

/**
 * List all products.
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 */
async function listAll(req, res, next){
    ProductJS.getDbProducts(db, function(e){
        res.json(e);
    });
}

/**
 * Orders listing from the highest value of a column.
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 */
async function listWMax(req, res, next){
    let order = true;

    if(req.params !=undefined){
        if((req.params.count !=undefined && req.params.column !=undefined)){
            ProductJS.getOrderedProducts(order, req.params.column, parseInt(req.params.count) , db, function(products){
                if(products){
                    res.status(200);
                    res.json(products);
                }
                else{
                    res.status(400);
                    res.json({
                        message: "Error"
                    });
                }
            });
        }
        else{
            console.log('Missing params: ', req.params);
        }
    }
    else{
        console.log('Undefined params: ', req.params);
    }
    
}

/**
 * Orders listing from the lowest value of a column.
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 */
async function listWMin(req, res, next){
    // False = ascending
    let order = false;

    if(req.params !=undefined){
        if((req.params.count !=undefined && req.params.column !=undefined)){
            ProductJS.getOrderedProducts(order, req.params.column, parseInt(req.params.count) , db, function(products){
                if(products){
                    res.status(200);
                    res.json(products);
                }
                else{
                    res.status(400);
                    res.json({
                        message: "Error"
                    });
                }
            });
        }
        else{
            console.log('Missing params: ', req.params);
        }
    }
    else{
        console.log('Undefined params: ', req.params);
    }
}

/**
 * Search products from tags.
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 */
async function searchProduct(req, res, next){
    if(req.body !=undefined){
        if(req.body.tags !=undefined 
            && req.body.tags.length > 0){
                ProductJS.searchProduct(req.body.tags, db, function(products){
                    res.json(products);
                });
        }
    }
}

/**
 * List a product by id
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 */
async function listOne(req, res, next){
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
}

/**
 * Delete a product
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 */
async function del(req, res, next){
    if(req.params.id != undefined){
        let id = parseInt(req.params.id);
        if(typeof id  == 'number'){
            ProductJS.deleteProduct(id, db, function(e){
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
}

/**
 * Add a new product from scraper.
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 */
async function add(req,res, next){
    const r = req.body.product;
    if(r.url !=undefined ){
        console.log(r.url);
        ScraperJS.getProductFromAmazon(r.url, function(_product) {
            var tags = _product.name.replace(/\//g," ").replace(/[^a-zA-Z0-9\s'"]/g, '').split(" ").filter(item => item);
            console.log(tags);
            _product.tags = tags;
            var product = new ProductJS.Product(1, _product.name.toString().slice(0, 99), 1, r.url,parseFloat(_product.price.replace(/\$/g, '')), _product.brand, _product.imageURL);
            ProductJS.addProductToDb(product, db, (productID) => {
                _product.id = productID;
                res.json(_product);
            });
        });
    }
    else res.status(404);
}

/**
 * Update a product
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 */
async function update(req, res, next){
    const r = req.body.product;
    if (r != undefined && id != undefined){
        const product = new ProductJS.Product(r.id, r.name, r.shop, r.url, r.price, r.brand);
        if(ProductJS.updateProduct(product, db) !=false){
            res.json(product);
        }
    }
}


module.exports = {
    add,
    listOne,
    del,
    update,
    listAll,
    searchProduct,
    listWMax,
    listWMin
};