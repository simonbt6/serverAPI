const ShopJS = require('../Shop');
const mysql = require('mysql');
const config = require('../config.json');
const db = mysql.createConnection(config.Database);
const express = require('express')
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
async function listAll(req, res, next){
    
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
async function listOne(req, res, next){
    const id = req.params.id
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
async function update(req, res, next){

}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
async function create(req, res, next){

}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
async function deleteOne(req, res, next){

}

module.exports = {
    listAll,
    listOne,
    update,
    create,
    deleteOne
}