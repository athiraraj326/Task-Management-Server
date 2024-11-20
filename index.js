require ('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./database/dbConnection')

const server = express()

server.use(cors())
server.use(express.json())
server.use(router)

const PORT = 3000 || process.env.PORT

server.listen(PORT,()=>{
    console.log(`Server started running at port ${PORT} and waiting for client request`);
})

server.get('/',(req,res)=>{
    res.status(200).send(`<h1>Server started running at port and waiting for client request!!</h1>`)
})