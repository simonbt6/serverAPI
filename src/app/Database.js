const mysql = require('mysql');
const config = require('./config.json');

module.exports.Database = class{
    /**
     * Database helper
     */
    constructor(){
        this.connection = mysql.createConnection(config);
    }

    query(sql, args){
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if(err) return reject(err);

                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if(err) return reject(err);
                resolve();
            });
        });
    }
}