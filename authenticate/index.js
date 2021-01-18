const config = require('../db/config')
const mysqli = require('mysql2/promise')
const jwt = require('jsonwebtoken')
const connection = mysqli.createConnection({...config})

const authenticate = async(req,res,next) => 
{
    const {email,password} = req.body
    const [row] =  await connection.query('SELECT email,password from user_tbl where email = ?',email)
        if(row.length>0) 
        {
            const password =row[0].password
            const match = bcrypt.compare(password,password);
            if(match){
                jwt.
            }
            else res.render('login',{error:"Incorrect Email or Password"})
        }
        else res.render('login',{error:"Incorrect Email or Password"})
   
}

const encryptPassword = async(req,res,next) =>
{
    const {email,password} =req.body
        
    try{
   const [existeduser]  = await connection.query('SELECT email from user_tbl where email = ?',email)
        if(existeduser.length>0)
        {
            res.render('register',{error:"Email already existed",body:req.body}).status(200)
        }
        else{
            next()
        }
    }
    catch(err)
    {
        res.render('Error').status(500);
    }
}                  