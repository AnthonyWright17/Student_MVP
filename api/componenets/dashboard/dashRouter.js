
const { Router } = require('express');
const dashCont = require('./dashController')
const dashRouter = new Router();


/**
 * intial get, returns entity data
 * post, create new post
 * update entity
 * delete entity
 */


dashRouter.get('/:id', dashCont.getUserById)

/**Create Posts */
dashRouter.post('/:id/addPost', dashCont.createPost)
 
dashRouter.put('/:id')

dashRouter.delete('/remove', dashCont.deletePost)
/**
 * 
 */

module.exports = dashRouter;