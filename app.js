//creation un app express
var express= require("express");
var mongoose=require("mongoose");
var mongoConnectionString = "mongodb://localhost:27017/news";
var session =require("express-session");

var UserCtrl=require("./controllers/UserCtrl.js");
var IndexCtrl=require("./controllers/IndexCtrl.js");
var ArticleCtrl=require("./controllers/ArticleCtrl.js");

//creation de l'app
var app=express();

//connection du BD
mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});

//configuration de la session
app.use(session({
    secret:'news',
    cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:true
}));

//configuration du template
app.set("view engine","ejs");

//setter routeur
var prePath="/NewsRoom";
app.get(prePath+"/index",IndexCtrl.showHomePage);//home page
app.get(prePath+"/login",IndexCtrl.showLoginPage);//login page 
app.get(prePath+"/ModifierPreferences",IndexCtrl.showModifierPreferencesPage);//ModifierPreferences page 
app.get(prePath+"/Parametre",IndexCtrl.showParametrePage);//Parametre page 
app.get(prePath+"/register",IndexCtrl.getRegisterPage);//register page  
app.get(prePath+"/User/createOne",UserCtrl.createOne);//creer user
app.get(prePath+"/User/updateOne",UserCtrl.updateOne);//update user
app.get(prePath+"/User/deleteOne",UserCtrl.deleteOne);//delete user
app.get(prePath+"/User/login",UserCtrl.login);//login user
app.get(prePath+"/User/logout",UserCtrl.logout);//logout user
app.get(prePath+"/Article/createOne",ArticleCtrl.createOne);
app.get(prePath+"/Article/createMany",ArticleCtrl.createMany);
app.get(prePath+"/Article/readOne",ArticleCtrl.readOne);
app.get(prePath+"/Article/readMany",ArticleCtrl.readMany);
app.get(prePath+"/Article/deleteOne",ArticleCtrl.deleteOne);
app.get(prePath+"/Article/deleteMany",ArticleCtrl.deleteMany);

//public source
app.use(express.static("public"));

//setter 404 page
app.use(function(req,res){
    res.send("Oups, la page n'existe pas");
})

//setter le port
app.listen(3000);
console.log("app is running in port 3000!");