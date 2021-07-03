const mysql = require('mysql');
const pmysql = require('promise-mysql');
const config = require('./config.json');
const db = mysql.createConnection(config.Database);

/**
 * @class Product
 * @description Product Entity
 */
class Product {
    /**
     * @param {Number} id
     * @param {Text} name 
     * @param {Number} shop 
     * @param {Text} url 
     * @param {Number} price 
     * @param {Array<Text>} tags 
     */
    constructor(id, name, shop, url, price, brand, imageURL, tags = [], size = 0){
        this.id = id;
        this.name = name;
        this.shop = shop;
        this.tags = tags;
        this.url = url;
        this.price = price;
        this.brand = brand;
        this.size_id = size;
        this.imageURL = imageURL;
    }

    addTag(tag){
        return this.tags.push(tag);
    }
}

/**
 * Get product from database.
 * @param {Number} id 
 * @param {mysql.Connection} Connection 
 */
module.exports.getProduct = function (id, Connection, callback){
    if(id != undefined){
        Connection.query('SELECT * FROM product WHERE id='+id, function(error, results){
            if(error) return console.log(error);
            if(results[0] == undefined) return callback(false);
            return callback(new Product(results[0].id, results[0].name, results[0].shop, results[0].url, results[0].price, results[0].brand, results[0].img_url));
        });   
    } 
}

// Get products from database.
/**
 * 
 * @param {mysql.Connection} Connection 
 * @param {Function} callback 
 */
module.exports.getDbProducts = function (Connection, callback) {
    Connection.query('SELECT * FROM product', (error, results) => {
        let products = [];
        if(error) return console.log(error);
        results.forEach(product => {
            let p = new Product(product.id, product.name, product.shop, product.url, product.price, product.brand, product.img_url, [], product.size_id);
            products.push(p);
        });
        callback(products);
    });
}

function getProducts(results, Connection, callback){
    let products = [];
    for(i = 0; i < results.length; i++){
        
        let productInfos = results[i];
        let product = new Product(productInfos.id, productInfos.name, productInfos.shop, productInfos.url, productInfos.price, productInfos.brand, productInfos.img_url);
        
        let productTags = undefined;

        addTagsToProduct(product, Connection, function(pro){
            products.push(product);
        });
        
        
    }
    callback(products);
}

function addTagsToProduct(product, Connection, callback){
    getProduct_tags(product.id, Connection, function(data){
        productTags = data;
        if(productTags !=undefined){
            productTags.forEach(tag => {
                console.log(product.name, product.tags);
                getTag(tag.tag_id, Connection, function(tagName){
                    product.addTag(tagName);
                    callback(product);
                });
            });
        }
    });
}

function getProduct_tags(id, Connection, callback){
    Connection.query('SELECT * FROM product_tags WHERE product_id='+id, function(error, results){
        return callback(results);
    });
}
function getTag(id, Connection, callback){
    Connection.query('SELECT name FROM tag WHERE id='+id, function(error, results){
        return callback(results[0].name);
    });
}

// "INSERT INTO product(name, shop_id, url, price) VALUES ("+product.name+", )"
// Add product to database
module.exports.addProductToDb = function(product, Connection, callback) {
    const sql = "INSERT INTO product(name, shop, url, price, brand, img_url) VALUES ('"+product.name+"', '"+product.shop+"',  '"+product.url+"', '"+product.price+"', '"+product.brand+"', '"+product.imageURL+"')"
    Connection.query(sql, (error, result) => {
        if(error) console.log([error.errno, error.code]);
        if(result !=undefined){
            callback(result.insertId);
        }
        else{
            Connection.query("SELECT id FROM product WHERE url='"+product.url+"' LIMIT 1", function(error, result) {
                if(error) console.log([error.errno, error.code]);
                callback(result[0].id);
            })
        }
    }); 
}
//update a product
module.exports.updateProduct = function(product, Connection){
    const sql = "UPDATE product SET name='" + product.name + "', url='"+product.url+"', price='"+product.price+"', shop='"+product.shop+"', brand='"+product.brand+"' WHERE id="+product.id
    Connection.query(sql, function(error){
        if(error) return consol.log(error)
    });
}
//delete a product
module.exports.deleteProduct = function(id, Connection) {
    Connection.query('DELETE FROM product WHERE id='+id, function(error){
        if(error) return console.log(error);
    });

}

module.exports.getOrderedProducts = function(order, column, count, Connection, callback){
    let sql = 'SELECT * FROM product ORDER BY '+column+' LIMIT '+count;
    if(order) 
        sql = 'SELECT * FROM product ORDER BY '+column+' DESC LIMIT '+count;
    Connection.query(sql, function(error, results){
        if(error) return callback(0);
        return callback(results);
    });
}

/**
 * 
 * @param {Array} tags 
 * @param {mysql.Connection} Connection 
 * @param {ReturnType} callback 
 */
module.exports.searchProduct = function(tags, Connection, callback){
    if(tags.length > 0){
        let sql = 'SELECT * FROM product WHERE id IN(SELECT product_id FROM product_tags WHERE tag_id IN(SELECT id FROM tag WHERE name IN(';
        tags.forEach(tag => {
            sql+= '"'+tag+'",';
        });
        sql = sql.slice(0, -1);
        sql += '))) ORDER BY price';
        
        console.log(sql);
        Connection.query(sql, function(error, results){
            if(error) return callback('Error');
            let products = [];
            results.forEach(product => {
                products.push(new Product(product.id, product.name, product.shop, product.url, product.price, product.brand, product.img_url));
            }); 
            return callback(products);
        });
    }
}

module.exports.Product = Product;