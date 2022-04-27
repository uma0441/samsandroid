var express = require('express');
var router = express.Router();
var AttendanceController = require('../controllers/AttendanceController.js');

/*
 * GET
 */
router.get('/', AttendanceController.list);

/*
 * GET
 */
router.get('/:id', AttendanceController.show);

/*
 * POST
 */
router.post('/', AttendanceController.create);

/*
 * PUT
 */
router.put('/:id', AttendanceController.update);

/*
 * DELETE
 */
router.delete('/:id', AttendanceController.remove);

router.post('/fill', AttendanceController.filldata)

router.post('/update',AttendanceController.updateAttendance);

module.exports = router;
