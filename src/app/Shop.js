class Shop {
     /**
     * @param {Text} name 
     * @param {Array<Text>} products 
     * @param {Array<Text>} tags 
     */
    constructor(name, products = [], tags = []){
        this.name = name;
        this.products = products;
        this.tags = tags;
    }
    getShops(){
        return this.shops;
    }
    getName(){
        return this.name;
    }
    getTags(){
        return this.tags;
    }
    addProduct(product) {
        this.shops.push(product);
    }
    addTag(tag){
        this.tags.push(tag)
    }
    
    
}

module.exports.Shop = Shop;