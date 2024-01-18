// connection 
const connection = require('../db/dbConfig');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes');
async function register(req, res){
    const{username, firstname,lastname,email,password}= req.body;
    if(!email||!password||!firstname||!lastname||!username){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"please provide all the required fields"})
    }
   try{
    const[user] = await connection.query("select username, userid from users where username = ? or email = ?",[username, email])
    if(user.length> 0){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"user already registered"})
    }
    if(password.length<8){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"password must be atleast 8 characters"})
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    await connection.query("INSERT INTO  users (username,firstname, lastname, email, password)values (?,?,?,?,?)",[username,firstname,lastname,email,hashedPassword])
    return res.status(StatusCodes.CREATED).json({msg:"user created"})
   } catch(error){
    console.log(error.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong, try again later!"})
   }
}
async function login(req,res){ 
    const{email,password} =req.body;
    if(!email||!password){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"please enter all required fields"});
    } 
    try{
        const[user]= await connection.query("select username,userid,password from users where email=?",[email])
        if(user.length==0){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid credential"});
        } 
        //compare password

        const ismatch = await bcrypt.compare(password,user[0].password)
        if(!ismatch){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid credential"});
        }
      
        const username = user[0].username;
        const userid = user[0].userid;
        const token = jwt.sign({username,userid},process.env.JWT_SECRET,{expiresIn:"1d"})
        return res.status(StatusCodes.OK).json({msg:"user login successful",token})
    }   catch(error){
        console.log(error.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong, try again later!"})
       }
    
} 
async function checkUser(req, res){
    const username=req.user.username
    const userid = req.user.userid
    res.status(StatusCodes.OK).json({msg:"valid user",username,userid})
}

module.exports = {register, login, checkUser};