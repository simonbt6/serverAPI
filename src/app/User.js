const { v4: uuidv4 } = require('uuid');


class User{
    /**
     * Creates a new User object
     * @param {Text} name 
     * @param {Text} firstname 
     * @param {Text} lastname 
     * @param {Text} email 
     * @param {Text} ip_address 
     * @param {Text} UUID 
     */
    constructor(firstname, lastname, email, ip_address, UUID){
        if(UUID == undefined) this.UUID=uuidv4()
        else this.UUID = UUID;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.ip_address = ip_address;
    }
}

function createUUID(){return uuidv4();}

/**
 *  Insert a new user into database.
 * 
 * @param {User} user 
 * @param {Text} password
 * 
 */
function createUser(user,password, Connection){
    var sql = "INSERT INTO user(UUID, firstname, lastname, email, password, ip_address) VALUES ('"+user.UUID+"', '"+user.firstname+"',  '"+user.lastname+"', '"+user.email+"', '"+password+"', '"+user.ip_address+"')"
    Connection.query(sql, function (error){
        if(error != null){
            if(error.errno == 1062) return false;
        }
        if(error) return console.log(error);
        console.log("Record added");
    }); 
}

/**
 * List all users
 * @param {mysql.Connection} Connection 
 * @param {function callback([User])} callback 
 */
function listUsers(Connection, callback){
    Connection.query('SELECT firstname, lastname, email, ip_address FROM user', function(error, results){
        var users = [];
        if(error) return console.log(error);
        for(i = 0; i < results.length; i++){
            var userInfos = results[i];
            var user = new User(userInfos.firstname, userInfos.lastname, userInfos.email, userInfos.ip_address, userInfos.UUID);
            users.push(user);
        }
        callback(users);
    });
}

function listUser(uuid, Connection, callback){
    Connection.query('SELECT firstname, lastname, email, ip_address FROM user WHERE uuid='+uuid, function(error, results) {
        if (error) return console.log(error);
        if (results[0] == undefined) return false;
        callback(new User(results[0].firstname, results[0].lastname, results[0].email, results[0].ip_address, uuid));
    });
}


/**
 * Update user
 * @param {User} user 
 * @param {import('mysql').Connection} Connection 
 */
function updateUser(user, Connection){
    var sql = "UPDATE user SET firstname='"+user.firstname+"', lastname='"+user.lastname+"', email='"+user.email+"' WHERE UUID='"+user.UUID+"'";
    Connection.query(sql, function(error) {
        if (error) return console.log(error);
        console.log("User updated --> " + user.UUID);
    });
}

module.exports = {
    User,
    createUser,
    listUsers,
    updateUser,
    listUser

}