class Shop {
     /**
     * @param {Text} name 
     * @param {Array<Text>} products 
     */
    constructor(id, name, url, country, products = []){
        this.id = id;
        this.name = name;
        this.url = url;
        this.country = country;
        this.products = products;
    }
    addProduct(product){
        this.shops.push(product);
    }
     
}
module.exports.Shop = Shop;
/**
 * List a shop.
 * @param {Number} id 
 * @param {mysql.Connection} connection 
 * @param {Function} callback 
 */
module.exports.getShop = function (id, Connection, callback){
    if(id != undefined){
        Connection.query('SELECT * FROM shop WHERE id='+id, function(error, results){
            if (error){
            callback(false);
             return console.log(error);
            }
            if (results[0] == undefined) return callback(false)
            return callback(new Shop(results[0].id, results[0].name))
        });

    }
}

/**
 * List all shops.
 * @param {mysql.Connection} Connection 
 * @param {Function} callback 
 */
module.exports.getShops = function (Connection, callback) {
    Connection.query('SELECT * FROM shop', function(error, results){
        const shops = [];
        if (error) return console.log(error);
        for(i = 0; i < results.length; i++){
            var shopInfos = results[i];
            var shop = new Shop(shopInfos.id, shopInfos.name, shopInfos.url, shopInfos.country);
            shops.push(shop);
        }
        callback(shops);
    });
}

/**
 * Add a shop.
 * @param {Shop} shop 
 * @param {mysql.Connection} Connection 
 */
module.exports.createShop = function(shop, Connection, callback) {
    var sql = "INSERT INTO shop(name, url, country) VALUES ('"+shop.name+"', '"+shop.url+"',  '"+shop.country+"')"
    Connection.query(sql, function (error){
        if (error != null){
            if (error.errno == 1062) return callback(error);
        }
        if (error) return callback(error);
        console.log("Record added");
        return callback();
    }); 
    return;
}

/**
 * Delete a shop.
 * @param {Number} id 
 * @param {mysql.Connection} Connection 
 */
module.exports.deleteShop = function(id, Connection, callback) {
    Connection.query('DELETE FROM shop WHERE id='+id, function(error){
        if(error) return callback(error);
        return callback();
    });

}
/**
 * Update a shop.
 * @param {Shop} shop 
 * @param {Number} id
 */
module.exports.updateShop = function(shop, Connection, callback){
    const sql = "UPDATE shop SET name='" + shop.name + "', url='"+shop.url+"', country='"+shop.country+"' WHERE id="+shop.id
    Connection.query(sql, function(error){
        if(error) return callback(error);
        return callback();
    });
}





