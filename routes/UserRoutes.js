var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController.js');

/*
 * GET
 */
router.get('/', UserController.list);

/*
 * GET
 */
router.get('/:id', UserController.show);

/*
 * POST
 */
router.post('/signup', UserController.create);

router.post('/login', UserController.login);


/*
 * PUT
 */
router.put('/:id', UserController.update);

/*
 * DELETE
 */
router.delete('/:id', UserController.remove);


router.get('/student/:id', UserController.getStudent)

router.get('/prof/:id',UserController.getProfessor)

module.exports = router;
