var ClassModel = require('../models/classModel.js');

/**
 * classController.js
 *
 * @description :: Server-side logic for managing classs.
 */
module.exports = {

    /**
     * classController.list()
     */
    list: function (req, res) {
        ClassModel.find().populate('subjects').exec(function (err, classs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting class.',
                    error: err
                });
            }

            return res.json(classs);
        });
    },

    /**
     * classController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        ClassModel.findOne({_id: id}).populate('subjects').exec(function (err, classs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting class.',
                    error: err
                });
            }

            if (!classs) {
                return res.status(404).json({
                    message: 'No such class'
                });
            }

            return res.json(classs);
        });
    },

    /**
     * classController.create()
     */
    create: function (req, res) {
        var classs = new ClassModel({
			name : req.body.name,
            subjects: req.body.subjects
        });

        classs.save(function (err, classs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating class',
                    error: err
                });
            }

            return res.status(201).json(classs);
        });
    },

    /**
     * classController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        ClassModel.findOne({_id: id}, function (err, classs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting class',
                    error: err
                });
            }

            if (!classs) {
                return res.status(404).json({
                    message: 'No such class'
                });
            }

            classs.name = req.body.name ? req.body.name : classs.name;
			
            classs.save(function (err, classs) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating class.',
                        error: err
                    });
                }

                return res.json(classs);
            });
        });
    },

    /**
     * classController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        ClassModel.findByIdAndRemove(id, function (err, classs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the class.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
