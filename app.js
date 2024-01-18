const express = require('express');
const app = express();
const port = 5500;
const cors = require("cors");
require("dotenv").config();
//connection
const connection = require('./db/dbConfig')

//user routes middleware file
const userRoutes = require("./routes/userRoute");
//questions routes middleware file
const questionsRoutes = require("./routes/questionRoute");
//Answer routes middleware
const answerRouter = require("./routes/answerRoute");

// authentication middleware
const authMiddleware = require("./middleware/authMiddleware")
// json middleware to extract json data
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//user routes middle ware

app.use("/api/users", userRoutes)

//question routes middleware
app.use("/api/questions",questionsRoutes)

//answers routes middleware
app.use("/api/answers", authMiddleware, answerRouter);
async function start(){
    try{
        const result = await connection.execute("select 'test' ")
        await app.listen(port)
        console.log("database established")
        console.log(`listening on ${port}`)
    } catch(error){
        console.log(error.message);
    }
}
start()

