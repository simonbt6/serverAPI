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
    constructor(id, name, shop, url, price, brand, tags = [], size = 0){
        this.id = id;
        this.name = name;
        this.shop = shop;
        this.tags = tags;
        this.url = url;
        this.price = price;
        this.brand = brand;
        this.size_id = size;
    }
    addTag(){
        this.tags.push(tag);  
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
            return callback(new Product(results[0].id, results[0].name, results[0].shop, results[0].url, results[0].price));
        });   
    } 
}

// Get products from database.
module.exports.getDbProducts = function (Connection, callback) {
    
    Connection.query('SELECT * FROM product', function(error, results){
        var products = [];
        if(error) return console.log(error);
        for(i = 0; i < results.length; i++){
            var productInfos = results[i];
            var product = new Product(productInfos.id, productInfos.name, productInfos.shop, productInfos.url, productInfos.price);
            products.push(product);
        }
        callback(products);
    });
}
// "INSERT INTO product(name, shop_id, url, price) VALUES ("+product.name+", )"
// Add product to database
module.exports.addProductToDb = function(product, Connection) {
    var sql = "INSERT INTO product(name, shop, url, price, brand, size_id) VALUES ('"+product.name+"', '"+product.shop+"',  '"+product.url+"', '"+product.price+"', '"+product.brand+"')"
    Connection.query(sql, function (error){
        if(error != null){
            if(error.errno == 1062) return false;
        }
        if(error) return console.log(error);
        console.log("Record added");
    }); 
}
//update a product
module.exports.updateProduct = function(product, Connection){
    const sql = "UPDATE product SET name='" + product.name + "', url='"+product.url+"', price='"+product.price+"', shop='"+product.shop+"', brand='"+product.brand+"', size_id='"+product.size_id+"'  WHERE id="+id
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

module.exports.Product = Product;