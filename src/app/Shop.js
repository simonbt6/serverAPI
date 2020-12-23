class Shop {

    constructor(name, shops = [], tags = []){
        this.name = name;
        this.shops = shops;
        this.tags = tags;S
    }
    addShop(shop) {
        this.shops.push(shop);
    }
    getShops(){
        return this.shops;
    }
    
}