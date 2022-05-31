const { Router } = require('express');


const loginRouter = new Router();
const lgCont = require('./loginController')

loginRouter.post('/', lgCont.validateUserByEmail, lgCont.validateUser, lgCont.createUser, lgCont.redirectTo)

loginRouter.delete('/',lgCont.removeUser)

loginRouter.patch('/', lgCont.updateUser)




module.exports = loginRouter;