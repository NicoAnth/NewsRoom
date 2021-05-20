const { render } = require("ejs");
const { findOne } = require("../models/User.js");
const User = require("../models/User.js");
<<<<<<< HEAD
const session= require('express-session');
=======
>>>>>>> c203c0051b790d4dae5b5790e2d9a80b21e60b55
const mockData = {
  mail: "leowjy123456@gmail.com",
  passeword: "123456",
  preferences: ["General", "Technology"]
};
const mockData1 = {
  mail: "leowjy123456@gmail.com",
  passeword: "12345678",
  preferences: ["General", "Technology"]
};

exports.createOne = function(req, res) {
  User.createOne(req.body);
  res.redirect("../login");
};
<<<<<<< HEAD

exports.updateOne = function(req, res) {
  User.updateOne(req.body, function() {});
  res.render("/Parametre");
};
exports.deleteOne = function(req, res) {
  console.log(req);

=======

exports.updateOne = function(req, res) {
  User.updateOne(req.body, function() {});
  res.render("/Parametre");
};
exports.deleteOne = function(req, res) {
  console.log(req);
>>>>>>> c203c0051b790d4dae5b5790e2d9a80b21e60b55
  console.log(req.body);
  console.log(req.body.email);
  User.deleteOne(req.body.email, function(err, results) {
    console.log(results);
  });
  res.redirect("../index");
};
exports.findOne = function(req, res) {
  User.findOne(req.body, function(err, results) {
    console.log(results);
    res.render("../index", {
      user: results
    });
  });
};
exports.findAll = function(req, res) {
  User.findAll({}, function(err, results) {
    res.json({ result: results });
    console.log(results);
    /*res.render("../index",{
            users:results
        })*/
  });
};

exports.login=function(req,res){
    var mail= req.body.email;
    var passeword=req.body.password;    
    console.log (mail,passeword);   
    

    User.find({mail:mail}, function(err, user){  
        console.log(user[0].password);
        if(err){
            res.end("server error");
        }
        console.log("user = " + user);
         if (!user){
               console.log("user n'existe pas");
           }
           if(user[0].password===passeword){  
            
           
                req.session.mail=user[0].mail;
                console.log(req.session.mail)
               console.log("connexion établi");
               switch (user[0].categories[0]) {
                case 'General':
                    res.redirect("../General");
                    break;
                case 'Health':
                    res.redirect("../Health");
                    break;
                case 'Science':
                    res.redirect("../Science");
                    break;
                case 'Sport':
                    res.redirect("../Sport");
                    break;
                case 'Technology':
                    res.redirect("../Technology");
                    break;
                case 'Entertainment':
                    res.redirect("../Entertainment");
                    break;
                default:
                    console.log('error');
               }             
              
              


           }else{

               console.log("connexion échoué");
           }
            
     });
      
   }

exports.logout=function(req,res){
  req.session.destroy();
    res.redirect("/");
}

