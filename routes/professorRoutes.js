var express = require('express');
var router = express.Router();
var professorController = require('../controllers/professorController.js');

/*
 * GET
 */
router.get('/', professorController.list);

/*
 * GET
 */
router.get('/:id', professorController.show);
router.get('/user/:id',professorController.getProfByUserId)

/*
 * POST
 */
router.post('/', professorController.create);

/*
 * PUT
 */
router.put('/:id', professorController.update);

/*
 * DELETE
 */
router.delete('/:id', professorController.remove);

module.exports = router;
