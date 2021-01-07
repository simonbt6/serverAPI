
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();
const config = require('./src/app/config.json')
const ProductRoute = require('./src/app/route/productRoute');
const ShopRoute = require('./src/app/route/shopRoute');
const UserRoute = require('./src/app/route/userRoute');
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());

// ROUTER
// ROOT
app.get('/', (req, res) => {
    res.json({
        message: 'root directory'
    });
});
// Products
app.get('/products/:id', ProductRoute.listOne);
app.get('/products/', ProductRoute.listAll);
app.post('/products/delete/:id', ProductRoute.del);
app.post('/products/update/:id', ProductRoute.update);
app.post('/products/', ProductRoute.add);

// Shops:
// List one shop
app.get('/shop/:id', ShopRoute.listOne);
// List all shops
app.get('/shop/', ShopRoute.listAll);
// Add a shop
app.post('/shop/add', ShopRoute.create);
// Delete shop
app.post('/shop/delete/:id', ShopRoute.deleteOne);


// Users
// TODO: Implement USERS
app.get('/users/:id', UserRoute.listOne);
app.post('/users/', UserRoute.create);
app.get('/users/', UserRoute.listAll);
app.post('/users/update/:id', UserRoute.update);



app.listen(config.app.PORT);


