const ShopJS = require('../Shop');
const mysql = require('mysql');
const config = require('../config.json');
const db = mysql.createConnection(config.Database);
const express = require('express');
const e = require('express');
/**
 * List all shops.
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
async function listAll(req, res, next){
    ShopJS.getShops(db, function(shops){
        res.json(shops);
    });
}

/**
 * List a single shop.
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
async function listOne(req, res, next){
    const id = parseInt(req.params.id);
    if(id !=undefined){
        ShopJS.getShop(id, db, function(shop){
            if(shop){
                res.json(shop);
            }
            else next();
        });
    }
}

/**
 * Update a shop.
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
async function update(req, res, next){
    const s = req.body.shop;
    if(s !=undefined){
        if(s.id !=undefined && s.name !=undefined && s.url !=undefined && s.country !=undefined){
            const shop = new ShopJS.Shop(s.id, s.name, s.url, s.country);
            ShopJS.updateShop(shop, db, function(error){
                if(error){
                    next();
                }
                else{
                    res.json(shop);
                }
            });
        }
        else next();
    }
    else next();
}

/**
 * Add a new shop.
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 * 
 * Shop:
 * - name
 * - country
 * - url
 */
async function create(req, res, next){
    const r = req.body.shop;
    if (r !=undefined){
        if( r.name !=undefined && r.url !=undefined && r.country !=undefined ){
            shop = new ShopJS.Shop(0, r.name, r.url, r.country);
            ShopJS.createShop(shop, db, function(error){
                if(error){
                    console.log(error);
                    next();
                }    
                else{
                    res.json(shop);
                }
            });
        }
    }
}

/**
 * Delete a shop.
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
async function deleteOne(req, res, next){
    const id = req.params.id;
    if(id !=undefined){
        ShopJS.deleteShop(id, db, function(error){
            if(error) {
                console.log(error);
                res.json(error);
            }
            else{
                res.json({
                    message: "Shop deleted",
                    id: id
                });
            }
        });
    }
    else next();
}

module.exports = {
    listAll,
    listOne,
    update,
    create,
    deleteOne
}