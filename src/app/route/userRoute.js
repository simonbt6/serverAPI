const UserJS = require('../User');
const mysql = require('mysql');
const config = require('../config.json');
const { json } = require('express');
const db = mysql.createConnection(config.Database);

/**
 * List all users.
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 */
async function listAll(req, res, next){
    UserJS.listUsers(db, function(users){
        res.json(users);
    });
}

/**
 * List a single user
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 */
async function listOne(req, res, next){
    if(req.params.id !=undefined){
        UserJS.listUser(req.params.id, db, function(user){
            if(user) res.json(user);
            else res.status(400);
        });
    }
}

/**
 * Update a user
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 */
async function update(req, res, next){
    const r = req.body.user;
    if(r !=undefined){
        if(UserJS.updateUser(new UserJS.User(r.firstname, r.lastname, r.email, r.ip_address, r.uuid), db)){
            res.json({
                message: "User updated successfuly.",
                uuid: r.uuid
            });
        }
        else res.json({
            message: "Error trying to update user.",
            uuid: r.uuid
        });
    }
}
/**
 * Create a new user
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 */
async function create(req, res, next){
    const r = req.body.user;
    if(r !=undefined){
        UserJS.createUser(new UserJS.User(r.firstname, r.lastname, r.email, r.ip_address, undefined), r.password, db);
        res.json(r);
    }
    else{
        res.status(400);
        res.send("Missing arguments.");
    }
    console.log(r);
}

/**
 * Delete a user
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 */
async function deleteOne(req, res, next){
    const uuid = req.params.id;
    if(r !=undefined){
        UserJS.del(uuid, db);
    }
    else{
        res.status(400);
        res.send("Missing arguments.");
    }
}

module.exports = {
    listAll,
    listOne,
    update,
    create,
    deleteOne
}