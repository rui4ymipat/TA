var mysql = require('mysql');

var con = mysql.createConnection({
  host: "34.87.117.55",
  user: "admin",
  password: "",
  database: "tamanagement"
});

module.exports.insert = async (sql) =>{
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log("insert success");
      });
}

module.exports.select = async (sql) =>{
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        return result;
      });
}

