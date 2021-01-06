
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();
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
app.post('/products/', ProductRoute.add);
app.get('/products/:id', ProductRoute.listOne);
app.get('/products/', ProductRoute.listAll);

// Shops
// Add new shop
app.get('/shop/add', (req, res) => {
    res.send('New shop');
});



// Users
// TODO: Implement USERS
app.get('/users/:id', ShopRoute.listAll);
app.get('/favicon.ico', ShopRoute.listOne);



app.listen(80);


