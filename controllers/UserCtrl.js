const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/User");
const validPassword = require('../models/PasswordUtils').validPassword;


exports.createOne = function(req, res) {
  User.createOne(req);
  res.redirect("../loginPage");
};

exports.updateOne = function(req, res) {
  User.updateOne(req.body, function() {});
  res.render("/Parametre");
};
exports.deleteOne = function(req, res) {
  console.log(req);
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


exports.authentification = function(req, res) {
  var mail= req.body.email;
  var password=req.body.password;
    console.log (mail,password);

  const customFields = {
    usernameField: 'mail'
 };

//const verifyCallback = (username, password, done) => {
   console.log('Before findOne');   
   User.findOne({ mail: mail })
        .then((user) => {

            if (!user) { return done(null, false) }
            
            const isValid = validPassword(password, user.hash, user.salt);
            
            consolelog('Password:', password);            
            console.log('Le hash: ', user.hash);
            console.log('Salt: ', user.salt);
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {   
            done(err);
        });

//}

const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});
console.log('Apres deserializeUser');
  passport.authenticate('local', 
    { failureRedirect: '../index', 
    successRedirect: '../General' });

}


exports.login = function(req, res) {
  User.authentification();
}


exports.logout = function(req, res) {
   req.logout();
   res.redirect("../index");
}



exports.getSuccess = function(req,res) {
  res.send('<p>You successfully logged in. --> <a href="./index">Home page</a></p>');
}

exports.getFailure = function(req, res) {
   res.send('You entered the wrong password.');
   res.send('Not connected!');
};
