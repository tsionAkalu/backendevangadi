require("dotenv").config()
const express = require('express');
const app = express();
const port = 5500

const cors = require('cors')
app.use(cors())

// db connection
const dbConnection = require("./db/dbConfig")


// user routes middleware file
const userRouters = require("./routes/userRoute")

// question routes middleware file
const questionsRouters = require("./routes/questionRoute");
const answerRouters = require("./routes/answerRoute");

// auth
const authMiddleware = require('./middleware/authMiddleware')

// json middleware to extract json data
app.use(express.json());

// questions routes middleware 
app.use("/api/users", userRouters)


// questions routes middleware 
app.use("/api/questions", authMiddleware, questionsRouters)


// answers routes middleware

app.use("/api/answers", authMiddleware, answerRouters)


async function start() {
    try {
        const result = await dbConnection.execute("select 'test' ")
        await app.listen(port)
        console.log("database connection established")
        console.log (`listening on ${port}`)
    } catch (error) {
        console.log(error.message)
    }
}
start()




  



