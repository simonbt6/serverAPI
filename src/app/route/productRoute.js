const ProductJS = require('../Product');
const ScraperJS = require('../../scraper/scraper');
const mysql = require('mysql');
const config = require('../config.json');
const db = mysql.createConnection(config.Database);




// add new product
async function add(req,res, next){
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
}
// list all products
async function listAll(req, res, next){
    console.log(req.ip);
    ProductJS.getDbProducts(db, function(e){
        
        res.json(e);
    });
}
//list a certain product
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

async function update(req, res, next){
    const r = req.body.productInfo;
    const name = r.name;
    const brand = r.brand;
    const Product = new ProductJS.Product(name, shop, url, price, brand)
}



module.exports = {
    add,
    listOne,
    del,
    update,
    listAll,

}