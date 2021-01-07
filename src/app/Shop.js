class Shop {
     /**
     * @param {Text} name 
     * @param {Array<Text>} products 
     * @param {Array<Text>} tags 
     */
    constructor(id, name, url, country, products = [], tags = []){
        this.name = name;
        this.url = url;
        this.country = country;
        this.products = products;
        this.tags = tags;
    }
    addProduct(product){
        this.shops.push(product);
    }
    addTag(tag){
        this.tags.push(tag)
    }
    
    
}

module.exports.getShop = function (id, connection, callback){
    if(id != undefined){
        Connection.query('SELECT * FROM shop WHERE id='+id, function(error, results){
            if (error) return console.log(error);
            if (results[0] == undefined) return callback(false)
            return callback(new Shop(results[0].id, results[0].name))
        });

    }
}

module.exports.getDbShops = function (Connection, callback) {
    
    Connection.query('SELECT * FROM shop', function(error, results){
        const shops = [];
        if (error) return console.log(error);
        for(i = 0; i < results.length; i++){
            var shopInfos = results[i];
            var shop = new Product(shopInfos.id, shopInfos.name);
            shops.push(shop);
        }
        callback(shops);
    });
}

module.exports.AddShopToDb = function(shop, Connection) {
    var sql = "INSERT INTO shop(name, url, country) VALUES ('"+shop.name+"', '"+shop.url+"',  '"+shop.country+"',)"
    Connection.query(sql, function (error){
        if (error != null){
            if (error.errno == 1062) return false;
        }
        if (error) return console.log(error);
        console.log("Record added");
    }); 
}

module.exports.DeleteShop = function(id, Connection) {
    Connection.query('DELETE FROM shop WHERE id='+id, function(error){
        if(error) return console.log(error);
    });

}
/**
 * 
 * @param {Shop} shop 
 */
module.exports.UpdateShop = function(shop, Connection){
    const sql = "UPDATE shop SET name='" + shop.name + "', url='"+shop.url+"', country='"+shop.country+"' WHERE id="+id
    Connection.query(sql, function(error){
        if(error) return consol.log(error)
    });
}
