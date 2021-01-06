const ShopJS = require('../Shop');
const mysql = require('mysql');
const config = require('../config.json');
const db = mysql.createConnection(config.Database);

async function listAll(req, res, next){
    
}
async function listOne(req, res, next){

}
async function update(req, res, next){

}
async function create(req, res, next){

}
async function deleteOne(req, res, next){

}

module.exports = {
    listAll,
    listOne,
    update,
    create,
    deleteOne
}