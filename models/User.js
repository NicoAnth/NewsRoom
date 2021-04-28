var mongoose=require("mongoose");

//creation du schema
var userSchema=new mongoose.Schema({
    "mail":String,
    "password":String,
    "preferences":new Array()
});

userSchema.statics.createOne=function(user){
    console.log(user)
    //TODO
    var u =new User({
        "mail":user[0],
        "password":user[1],
        "preferences":user[2]
    })
    u.save();
}
userSchema.statics.login=function(mail,password){
    //TODO
}
userSchema.statics.logout=function(user){
    //TODO
}
userSchema.statics.deleteOne=function(user){
    //TODO
}
userSchema.statics.updateOne=function(user){
    //TODO
}

//creaion du model
var User= mongoose.model("User",userSchema);
module.exports=User;