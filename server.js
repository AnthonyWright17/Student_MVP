require('dotenv').config()
const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();
const loginRoute = require('./api/componenets/login/loginRoute')
const dashboardRoute = require('./api/componenets/dashboard/dashRouter')


app.use(express.json())

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))


app.use('/index.html', loginRoute);

app.use('/dashboard.html', dashboardRoute);





app.listen(process.env.PORT, ()=> console.log(`Server running on port ${process.env.SERVER_PORT}`))