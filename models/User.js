const mongoose = require("mongoose");
const genPassword = require("../models/PasswordUtils").genPassword;
const validPassword = require("../models/PasswordUtils").validatePassword;
const connection = require("../models/Database");


//creation du schema
var userSchema = new mongoose.Schema({
    mail:String,
    hash:String,
    salt: String,
    categories:[]  //ou [{preference: String}]
});




userSchema.statics.createOne=function(req,res){
  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  var newUser = new User({
        "mail":req.body.email,
        "hash": hash,
        "salt":salt,
        "categories":req.body.categories
    });

  newUser.save()
  .then((user) => {
        // If everything goes as planed
        //use the retured user document for something
         console.log(user);
         console.log("The user is saved!!");
    })
    .catch((error) => {
        //When there are errors We handle them here
        console.log(error);
        console.log("Pass into an ERROR in createOne!!!");
    });
}



userSchema.deleteOne=function(email){
    let conditions={mail:email};
    User.remove(conditions, function (error, resultats) {
        console.error(resultats);//{ n: 1, ok: 1, deletedCount: 1 }
        if (error) {
            console.error(error);
        } else {
            console.error("User supprimé")//User supprimé
        }
    });
}
userSchema.statics.updateOne=function(user){
    let conditions = {_id: user._id};
    let updates = {$set: {name: user.name,password:user.password, categories: user.categories}};
        User.update(conditions, updates, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.error("User mis à jour")
        }
    });
}

userSchema.statics.findOne=function(user){
    let conditions = {_id: user._id};
    User.find(conditions, function (error, doc) {
        if (error) {
            console.error(error)
        } else {
            console.error("data：", doc)
        }
    });
}

userSchema.statics.findAll=function(data){
    User.find({}, function (error, results) {
        if (error) {
            console.error(error)
        } else {
            console.error("data：", results)
        }
    });
}

userSchema.statics.authentification = function(req, res) {

}

userSchema.statics.login=function(req,res){
 
}

userSchema.statics.logout=function(req, res){
  
   
}


userSchema.statics.getSuccess=function(){

}

userSchema.statics.getFailure=function(req,res){

}



//creation du modele
const User= connection.model("User",userSchema);


module.exports = User;
