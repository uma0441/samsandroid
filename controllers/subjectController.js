var SubjectModel = require('../models/subjectModel.js');

/**
 * subject Controller.js
 *
 * @description :: Server-side logic for managing subject s.
 */
module.exports = {

    /**
     * subject Controller.list()
     */
    list: function (req, res) {
        SubjectModel.find(function (err, subjects) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting subject .',
                    error: err
                });
            }

            return res.json(subjects);
        });
    },

    /**
     * subject Controller.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        SubjectModel.findOne({_id: id}, function (err, subject ) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting subject .',
                    error: err
                });
            }

            if (!subject ) {
                return res.status(404).json({
                    message: 'No such subject '
                });
            }

            return res.json(subject );
        });
    },

    /**
     * subject Controller.create()
     */
    create: function (req, res) {
        var subject  = new SubjectModel({
			name : req.body.name,
			description : req.body.description
        });

        subject .save(function (err, subject ) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating subject ',
                    error: err
                });
            }

            return res.status(201).json(subject );
        });
    },

    /**
     * subject Controller.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        SubjectModel.findOne({_id: id}, function (err, subject ) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting subject ',
                    error: err
                });
            }

            if (!subject ) {
                return res.status(404).json({
                    message: 'No such subject '
                });
            }

            subject .name = req.body.name ? req.body.name : subject .name;
			subject .description = req.body.description ? req.body.description : subject .description;
			
            subject .save(function (err, subject ) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating subject .',
                        error: err
                    });
                }

                return res.json(subject );
            });
        });
    },

    /**
     * subject Controller.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        SubjectModel.findByIdAndRemove(id, function (err, subject ) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the subject .',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
