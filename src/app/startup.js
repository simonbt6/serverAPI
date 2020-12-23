const { Product } = require("./Product");
/**
 * @function getProducts
 * @description Gets products from products.json
 * @param {Array} Array of Product Infos
 * @returns {Array<Product>} Array of Products
 */
module.exports.getProducts = function (productList){
    var products = [];

    for(i = 0; i <= productList.length; i++){
        var productInfos = productList[i];
        if(productInfos !=undefined){
            var product = new Product(productInfos.name, productInfos.shop_id, productInfos.url, productInfos.price)
            products.push(product);
        }
    }

    console.log(products);
    return products;
}

 
