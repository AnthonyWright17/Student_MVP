require('dotenv').config()
const express = require('express');
const userRoutes = require('./api/componenets/user/routes')
const app = express();


app.use('/user', userRoutes)

app.listen(process.env.SERVER_PORT, ()=> console.log(`Server running on port ${process.env.SERVER_PORT}`))