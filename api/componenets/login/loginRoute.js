const { Router } = require('express');
const { redirect } = require('express/lib/response');
const loginRouter = new Router();
const lgCont = require('./loginController')

loginRouter.post('/', lgCont.validateUserByEmail, lgCont.validateUser, lgCont.redirectTo)

module.exports = loginRouter;