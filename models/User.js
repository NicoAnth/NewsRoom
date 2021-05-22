const mongoose=require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local").Strategy;


//creation du schema
const userSchema=new mongoose.Schema({
    mail:String,
    password:String,
    salt: String,
    categories:[]  //ou [{preference: String}]
});


userSchema.statics.createOne=function(user){
    let u = new User({
        mail:user.email,
        password:user.password,
        categories:user.categories
    })
    u.save();
}
userSchema.statics.deleteOne=function(email){
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
userSchema.statics.login=function(mail,password){

}


userSchema.statics.logout=function(user){
    //TODO
}
//creaion du model
const User= mongoose.model("User",userSchema);
module.exports=User;