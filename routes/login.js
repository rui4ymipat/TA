var express = require('express');
var router = express.Router();
var database = require('./database')
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "34.87.117.55",
  user: "admin",
  password: "",
  database: "tamanagement"
});

/* GET home page. */
router.get('/', function(req, res) {
  let text ;
  if(req.session.textError){
    text = req.session.textError
    req.session.textError = false
  }
  else{
    text = false;
  }
  res.render('login',{text:text});
});

router.post('/addData_register', function(req, res) {
    let data = req.body;
    let sql = `INSERT INTO user_tbl VALUES(null,'${data.username}','${data.password}','${data.Fname}','${data.Lname}','${data.student_id}','${data.major}','${data.cmu_email}','${data.line}','${data.face_email}','${data.tel}','${data.portfolio_link}','1',CURRENT_TIMESTAMP)`;
    database.insert(sql);
    res.redirect('/login');
  });

  router.post('/check',async function(req, res) {
    let data = req.body;
    
    console.log(data);
    let sql = `SELECT username,password,user_id ,f_name ,l_name,user_type FROM user_tbl WHERE username = '${data.username}' `
    con.query(sql, function (err, result, fields) {
      if(typeof(result[0].username) == 'undefined' ){
        req.session.textError = true;
        res.redirect('/login');
      }
      else {
        if(data.username == result[0].username && data.password == result[0].password){
          req.session.name = `${result[0].f_name} ${result[0].l_name}`;
          req.session.id = result[0].user_id;
          req.session.user_type = result[0].user_type;
          res.redirect('/');
        }
        else{
          req.session.textError = true;
          res.redirect('/login');
        }
      }
      
      
     
    });
    
    
  });

module.exports = router;
