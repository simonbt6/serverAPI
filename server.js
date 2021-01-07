
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();
const config = require('./src/app/config.json')
const ProductRoute = require('./src/app/route/productRoute');
const ShopRoute = require('./src/app/route/shopRoute');
const UserRoute = require('./src/app/route/userRoute');

/**
 * MIDDLEWARES
 */
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());

/**
 * ROUTES
 */

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
app.post('/products/update/', ProductRoute.update);
app.post('/products/create', ProductRoute.add);

// Shops:
// List one shop
app.get('/shop/:id', ShopRoute.listOne);
// List all shops
app.get('/shop/', ShopRoute.listAll);
// Add a shop
app.post('/shop/create', ShopRoute.create);
// Delete shop
app.post('/shop/delete/:id', ShopRoute.deleteOne);
// Update shop
app.post('/shop/update', ShopRoute.update);

// Users
// TODO: Implement USERS
app.get('/users/:id', UserRoute.listOne);
app.get('/users/', UserRoute.listAll);
app.post('/users/update/', UserRoute.update);
app.post('/users/delete/:id', UserRoute.deleteOne);
app.post('/users/create/', UserRoute.create);

// 404 GATEWAY
app.get('*', function(req, res){
    res.status(404);
    res.send('404: Bad gateway.')
});
app.post('*', function(req, res){
    res.status(404);
    res.send("[POST] 404: Bad gateway");
});

app.listen(config.app.PORT);


