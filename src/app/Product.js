class Product {

    constructor(name, shop, url, price, tags = []){
        this.name = name;
        this.shop = shop;
        this.tags = tags;
        this.url = url;
        this.price = price;
    }
    getShop(){
        return this.shop;
    }
    getName(){
        return this.name;
    }
    getShop(){
        return this.shop;
    }
    getPrice(){
        return this.price;
    }
}
let Products = [];
Products.sort();

// OBJ => PRODUITS --> TAGS
for(i = 0; i <= OBJ.length; i++){
    var obj = OBJ[i];
    var product;
    product = new Product(obj.name, obj.shops);
    Products.push(product);
}

module.exports.Product = Product;


// SELECT * FROM product WHERE tag=TAGS