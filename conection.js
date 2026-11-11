const mysql = require('mysql2/promise');

const Connection = mysql.createPool(
    {
        host: "localhost",
        password: "",
        user:"root",
        port:3306,
        database:"eletrokurumim"
    }
)

module.exports = Connection