var AttendanceModel = require('../models/AttendanceModel.js');

var studentModel = require('../models/studentModel');
var classModel = require('../models/classModel');

/**
 * AttendanceController.js
 *
 * @description :: Server-side logic for managing Attendances.
 */
module.exports = {

    /**
     * AttendanceController.list()
     */
    list: function (req, res) {
        AttendanceModel.find(function (err, Attendances) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Attendance.',
                    error: err
                });
            }

            return res.json(Attendances);
        });
    },
    filldata:function(req,res){
        classid = req.body.classid,
        subjectid =  req.body.subjectid,
        barcodegeneratedat = req.body.barcodegeneratedat,
        expiry_time= req.body.expiry_time

        const currentDate = new Date();

const currentDayOfMonth = currentDate.getDate();
const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
const currentYear = currentDate.getFullYear();

const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
        studentModel.find({class:classid}).exec(function(err, students){
            students.forEach(element => {
                var Attendance = new AttendanceModel({
                    date:dateString,
                    classid : classid,
                    subjectid : subjectid,
                    studentId : element._id,
                    barcodegeneratedat : barcodegeneratedat,
                    expiry_time:expiry_time,
                    status : "Absent"
                });
        
                Attendance.save(function (err, Attendance) {
                });
                
            });
            return res.status(201).json({status:true, message:"Attendance marked.."});
        }
        );
    },

    /**
     * AttendanceController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        AttendanceModel.findOne({_id: id}, function (err, Attendance) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Attendance.',
                    error: err
                });
            }

            if (!Attendance) {
                return res.status(404).json({
                    message: 'No such Attendance'
                });
            }

            return res.json(Attendance);
        });
    },

    /**
     * AttendanceController.create()
     */
    create: function (req, res) {
        var Attendance = new AttendanceModel({
			classid : req.body.classid,
			subjectid : req.body.subjectid,
			studentId : req.body.studentId,
			barcodegeneratedat : req.body.barcodegeneratedat,
            expiry_time:req.body.expiry_time,
			status : req.body.status
        });

        Attendance.save(function (err, Attendance) {
            if (err) {
                return res.status(500).json({
                    status:false,
                    message: 'Error when creating Attendance',
                    error: err
                });
            }

            return res.status(201).json({status:true, message:"Attendance marked.."});
        });
    },

    /**
     * AttendanceController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        AttendanceModel.findOne({_id: id}, function (err, Attendance) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Attendance',
                    error: err
                });
            }

            if (!Attendance) {
                return res.status(404).json({
                    message: 'No such Attendance'
                });
            }

			Attendance.classid = req.body.classid ? req.body.classid : Attendance.classid;
			Attendance.subjectid = req.body.subjectid ? req.body.subjectid : Attendance.subjectid;
			Attendance.studentId = req.body.studentId ? req.body.studentId : Attendance.studentId;
			Attendance.professorId = req.body.professorId ? req.body.professorId : Attendance.professorId;
			Attendance.status = req.body.status ? req.body.status : Attendance.status;
			
            Attendance.save(function (err, Attendance) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Attendance.',
                        error: err
                    });
                }

                return res.json(Attendance);
            });
        });
    },

    updateAttendance: function (req, res) {
        const currentDate = new Date();

        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
        const currentYear = currentDate.getFullYear();
        
        const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
        AttendanceModel.findOne({date: dateString,classid:req.body.classid,subjectid:req.body.subjectid,studentId:req.body.studentId}, function (err, Attendance) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Attendance',
                    error: err
                });
            }

            if (!Attendance) {
                return res.status(404).json({
                    message: 'No such Attendance'
                });
            }
			Attendance.status = "Present";
			
            Attendance.save(function (err, Attendance) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Attendance.',
                        error: err
                    });
                }

                return res.json({status:true, message:"Attendance updated.."});
            });
        });
    },
    /**
     * AttendanceController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        AttendanceModel.findByIdAndRemove(id, function (err, Attendance) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Attendance.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
