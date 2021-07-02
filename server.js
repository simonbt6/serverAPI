// Package imports.
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');
const http = require('http');
const https = require('https');

// Configuration file.
const config = require('./src/app/config.json')

// Routes
const ProductRoute = require('./src/app/route/productRoute');
const ShopRoute = require('./src/app/route/shopRoute');
const UserRoute = require('./src/app/route/userRoute');

// HTTP(S) Server
const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync(config.app.SSL_PATH + 'server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate};


// Create Express App.
const app = express();

/**
 * MIDDLEWARES
 */
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());

/**
 * ROUTES
 */

/**
 * ROOT ROUTE.
 */
app.get('/', (req, res) => {
    res.json({
        message: 'root directory'
    });
});

/**
 * PRODUCT ROUTES.
 */

app.get('/products/:id', ProductRoute.listOne);
app.get('/products/', ProductRoute.listAll);
app.post('/products/delete/:id', ProductRoute.del);
app.post('/products/update/', ProductRoute.update);
app.post('/products/create', ProductRoute.add);

/**
 * SHOP ROUTES.
 */

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

/**
 * USER ROUTES.
 */
app.get('/users/:id', UserRoute.listOne);
app.get('/users/', UserRoute.listAll);
app.post('/users/update/', UserRoute.update);
app.post('/users/delete/:id', UserRoute.deleteOne);
app.post('/users/create/', UserRoute.create);

/**
 * 404 GATEWAY.
 * POST & GET
 */
// 404: Wrong Gateway.
app.get('*', function(req, res){
    res.status(404);
    res.send('Bad gateway.')
});
app.post('*', function(req, res){
    res.status(404);
    res.send("[POST] Bad gateway");
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(config.app.HTTP_PORT);
httpsServer.listen(config.app.HTTPS_PORT);