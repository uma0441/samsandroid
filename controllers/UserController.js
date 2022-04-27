var UserModel = require('../models/UserModel.js');
var studentModel = require('../models/studentModel');
var professorModel = require('../models/professorModel');
var bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {

    /**
     * UserController.list()
     */
    list: function (req, res) {
        UserModel.find({status: {$lt: 5 }}).select("-password").
        exec(function (err, users) {
          if (err) {
            res.send({ status: false, message: err });
          } else {
            res.send({ status: true, message: "fetchList  successfully", users: users });
          }
        })
    
    },

    /**
     * UserController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        UserModel.findOne({_id: id}, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User.',
                    error: err
                });
            }
            if (!User) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }
            return res.json(User);
        });
    },

    getStudent: function (req, res) {
      var id = req.params.id;
      studentModel.findOne({userid: id}).populate('userid').populate({path:'class',populate:{path:"subjects"}}).exec( function (err, User) {
          if (err) {
              console.log(err);
              return res.status(500).json({
                  message: 'Error when getting student.',
                  error: err
              });
          }
          if (!User) {
              return res.status(404).json({
                  message: 'No such User'
              });
          }
          return res.json(User);
      });
  },

  getProfessor: function (req, res) {
    var id = req.params.id;
    professorModel.findOne({userid: id}).populate('userid').populate({path:'classes',populate:{path:"subjects"}}).exec(function (err, User) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                message: 'Error when getting professor.',
                error: err.message
            });
        }
        if (!User) {
            return res.status(404).json({
                message: 'No such User'
            });
        }
        return res.json(User);
    });
},
    /**
     * UserController.create()
     */
    create: function (req, res) {
     
        var user = new UserModel({
            username: req.body.username,
            password: req.body.password,
            type: req.body.type
          });
          user.save(function (error) {
            if (error) {
        
              res.send({ status: false, message: error});
            }
            else {
              res.send({ status: true, message: "User registred successfully" });
            }
        
          });
    },

    login: function (req, res) {
        console.log({users:req});
        UserModel.findOne({ username: req.body.username }, function (err, userInfo) {
            if (userInfo) {
              // console.log({pass:req.body,password:userInfo.password});
              if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                  const token = jwt.sign({ id: userInfo._id }, "mysecret", {});
                  userInfo['password']= '';
                  if(userInfo.type == 0)
                  studentModel.findOne({userid:userInfo._id}).populate('userid').populate({path:'class',populate:{path:"subjects"}}).exec(function(errr, student){
                      res.send({ status: true, message: "You are  successfully logged in ",student:student,user : userInfo, token: token });
                  })
                  else
                  professorModel.findOne({userid:userInfo._id}).populate({path:'classes',populate:{path:"subjects"}}).exec(function(errr, student){
                    res.send({ status: true, message: "You are  successfully logged in ",professor:student,user : userInfo, token: token });
                })
              } else {
                res.send({ status: false, message: "Invalid password if you forgot password please refer to admin" });
              }
        
            } else {
              res.send({ status: false, message: "You are  not registered with this application.please refer admin for access" });
            }
        
          });
    },

    /**
     * UserController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        UserModel.findOne({_id: id}, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User',
                    error: err
                });
            }
            if (!User) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }

            User.username = req.body.username ? req.body.username : User.username;
			User.password = req.body.password ? req.body.password : User.password;
			
            User.save(function (err, User) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating User.',
                        error: err
                    });
                }

                return res.json(User);
            });
        });
    },

    /**
     * UserController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        UserModel.findByIdAndRemove(id, function (err, User) {
            if (err) {
        
                res.send({ status: false, message: err});
              }
              else {
                res.send({ status: true, message: "User  deleted successfully" });
          
              }
        });
    }
};
