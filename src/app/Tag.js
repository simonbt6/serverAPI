const mysql = require('mysql');


/**
 * Add a new tag.
 * Table: tag
 * @param {Text} tagName 
 * @param {mysql.Connection} Connection 
 * @param {ReturnType} callback 
 */
module.exports.addTag = function (tagName, Connection, callback){
    const sql = "INSERT INTO tag (name) VALUES ('"+tagName+"') "
    Connection.query(sql, function(error, results){
        if(error)return callback(error)
        callback(200);
    });
}

/**
 * Links a tag to a product.
 * Table: product_tags
 * @param {Text} Tag 
 * @param {Number} product_id 
 * @param {mysql.Connection} Connection 
 */
module.exports.linkTag = function (tagName, product_id, Connection, callback){
    let sql = "SELECT id FROM tag WHERE name='"+tagName+"'"; 
    Connection.query(sql, function(error, results){
        if(error) return callback(error);
        sql = "INSERT INTO product_tags (product_id, tag_id, unid) VALUES ('"+product_id+"', '"+results[0].id+"', '"+product_id+"_"+results[0].id+"')";
        Connection.query(sql, function(error, results){
            if(error) return callback(error);
            return callback("Linked product to tag");
        });
    });
}

/**
 * Remove link between tag and product.
 * Table: product_tags
 * @param {Text} tagName 
 * @param {Number} product_id 
 * @param {mysql.Connection} Connection 
 * @param {ReturnType} callback 
 */
module.exports.removeLink = function(tagName, product_id, Connection, callback){
    // Find the tag's id
    let sql = "SELECT id FROM tag WHERE name='"+tagName+"'";
    Connection.query(sql, function(error, results){
        if(error) return callback(error);
        if(results[0] == undefined) return callback("Wrong tag name.");
        const id = results[0].id;
        sql = "DELETE FROM product_tags WHERE product_id="+product_id+" AND tag_id='"+id+"'";
        // Delete link.
        Connection.query(sql, function(error, results){
            if(error) return callback(error);
            return callback(200);
        })
    });
}

/**
 * Get all tags for a product.
 * @param {Number} productID 
 * @param {mysql.Connection} Connection 
 * @param {ReturnType} callback 
 */
module.exports.getTag = function(productID, Connection, callback){
    let sql = "SELECT tag_id FROM product_tags WHERE product_id="+productID;
    Connection.query(sql, function(error, results) {
        if(results.length > 0){
            sql = "SELECT name FROM tag WHERE id IN ("
            results.forEach(tag => {
                sql += tag.tag_id + ",";
            });
            sql = sql.slice(0, sql.lastIndexOf(','));
            sql += ")";
            Connection.query(sql, (e, r) => {
                if(error) return callback(e);
                return callback(r);
            });
        }
        else callback(0);
    });
}