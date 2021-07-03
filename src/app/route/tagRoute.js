const mysql = require('mysql');
const config = require('../config.json');
const db = mysql.createConnection(config.Database);
const TagJS = require('../Tag');
const express = require('express');
const { rmSync } = require('fs');

/**
 * ADD new tags & link to a product.
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
async function add(req, res, next){
    const r = req.body;
    if(r !=undefined){
        if(r.tags !==[] && (r.product_id !=undefined && r.product_id !=0)){
            const rTags = r.tags;
            rTags.forEach(tag => { 
                if(tag !== '') {
                    TagJS.addTag(tag, db, function(error){
                        if(error) {
                            if(typeof error !== "string") {
                                if(error.errno == 1062) console.log("Duplicate entry, ignoring. ", [tag, r.product_id]);
                                else console.log("Unknown error. " + [error.errno, error.code]);
                            }
                        }
                    });
                    TagJS.linkTag(tag, r.product_id, db, function(error){
                        if(typeof error !== "string") {
                            if(error.errno == 1062) console.log("Duplicate entry, ignoring. ", [tag, r.product_id]);
                            else console.log("Unknown error. " + [error.errno, error.code]);
                        }
                    });
                    
                }
            });
            res.status(200);
            res.json({
                message: "Tags added."
            });
        } 
        else next();
    }
    else next();
}

/**
 * Remove a link between a tag and a product.
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
async function remove(req, res, next){
    const r = req.body;
    if(r !=undefined){
        if((r.tags !==[] && r.tags !=undefined) && (r.product_id !=undefined && r.product_id !=0)){
            r.tags.forEach(tag => {
                if(tag !=undefined && tag !=''){
                    TagJS.removeLink(tag, r.product_id, db, function(error){
                        if(error !=200){
                            console.error(error);
                        } 
                        
                    });
                }
            });
            res.status(200);
            res.json({
                message: "Tag link with product "+ r.product_id +" deleted if existing"
            });
        }
        else next();
    }
    else next();
    
}

/**
 * Get product's tags.
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
async function get(req, res, next){
    const id = req.params.id;
    if(id !=undefined){
        TagJS.getTag(id, db, function(results){
            if(results !=0) 
                res.json(results);
        });
    }
}

module.exports = {
    add,
    remove,
    get
};