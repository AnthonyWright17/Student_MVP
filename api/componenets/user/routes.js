const { Router } = require('express')
const router = new Router();

router.get('/:id', getUserById);

module.exports = router;