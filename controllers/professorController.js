var ProfessorModel = require('../models/professorModel.js');

/**
 * professorController.js
 *
 * @description :: Server-side logic for managing professors.
 */
module.exports = {

    /**
     * professorController.list()
     */
    list: function (req, res) {
        ProfessorModel.find(function (err, professors) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting professor.',
                    error: err
                });
            }

            return res.json(professors);
        });
    },

    /**
     * professorController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        ProfessorModel.findOne({_id: id}).populate({path:'classes',populate:{path:"subjects"}}).exec(function (err, professor) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting professor.',
                    error: err
                });
            }

            if (!professor) {
                return res.status(404).json({
                    message: 'No such professor'
                });
            }

            return res.json(professor);
        });
    },

    getProfByUserId: function(req,res)
{
    var id = req.params.id;
        ProfessorModel.findOne({userid: id}).populate({path:'classes',populate:{path:"subjects"}}).exec(function (err, professor) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting professor.',
                    error: err
                });
            }

            if (!professor) {
                return res.status(404).json({
                    message: 'No such professor'
                });
            }

            return res.json(professor);
        });
},
    /**
     * professorController.create()
     */
    create: function (req, res) {
        var professor = new ProfessorModel({
			userid : req.body.userid,
            classes: req.body.classes
        });

        professor.save(function (err, professor) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating professor',
                    error: err
                });
            }

            return res.status(201).json(professor);
        });
    },

    /**
     * professorController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        ProfessorModel.findOne({_id: id}, function (err, professor) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting professor',
                    error: err
                });
            }

            if (!professor) {
                return res.status(404).json({
                    message: 'No such professor'
                });
            }

            professor.userid = req.body.userid ? req.body.userid : professor.userid;
			
            professor.save(function (err, professor) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating professor.',
                        error: err
                    });
                }

                return res.json(professor);
            });
        });
    },

    /**
     * professorController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        ProfessorModel.findByIdAndRemove(id, function (err, professor) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the professor.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
