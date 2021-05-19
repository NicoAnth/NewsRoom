//creation un app express
var express= require("express");
var mongoose=require("mongoose");
var mongoConnectionString = "mongodb://localhost:27017/news";
var session =require("express-session");
var bodyParser = require('body-parser');

var UserCtrl=require("./controllers/UserCtrl.js");
var IndexCtrl=require("./controllers/IndexCtrl.js");
var ArticleCtrl=require("./controllers/ArticleCtrl.js");
var NewsletterCtrl=require("./controllers/NewsletterCtrl.js");

//creation de l'app
var app=express();

//connection du BD
mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});

//configuration de la session
app.use(session({
    secret:'news',//calcul du hash afin d'éviter modification du signedCookie
    cookie:{maxAge:60000},//données
    resave:false,//on sauvegarde pas la valeur de session si la valeur de session n'est pas changé 
    saveUninitialized:true//forcer à sauvegarder session
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : false}));
// parse application/json
//app.use(bodyParser.json())

//configuration du template
app.set("view engine","ejs");

//setter routeur
var prePath="/Newsroom";
app.get(prePath+"/index",IndexCtrl.showHomePage);//home page
app.get(prePath+"/login",IndexCtrl.showLoginPage);//login page 
app.get(prePath+"/ModifierPreferences",IndexCtrl.showModifierPreferencesPage);//ModifierPreferences page 
app.get(prePath+"/Parametre",IndexCtrl.showParametrePage);//Parametre page 
app.get(prePath+"/register",IndexCtrl.getRegisterPage);//register page 
app.get(prePath+"/General",IndexCtrl.getGeneralPage);//general page 
app.get(prePath+"/Health",IndexCtrl.getHealthPage);//Health page 
app.get(prePath+"/Science",IndexCtrl.getSciencePage);//Science page 
app.get(prePath+"/Sport",IndexCtrl.getSportPage);//Sport page 
app.get(prePath+"/Technology",IndexCtrl.getTechnologyPage);//Technology page 
app.get(prePath+"/Entertainment",IndexCtrl.getEntertainmentPage);//Entertainment page 
app.get(prePath+"/Email",IndexCtrl.getEmailPage);//Entertainment page 

app.post(prePath+"/User/createOne",UserCtrl.createOne);//creer user
app.post(prePath+"/User/updateOne",UserCtrl.updateOne);//update user
app.post(prePath+"/User/deleteOne",UserCtrl.deleteOne);//delete user
app.post(prePath+"/User/login",UserCtrl.login);//login user
app.post(prePath+"/User/logout",UserCtrl.logout);//logout user
app.get(prePath+"/User/findOne",UserCtrl.findOne);//find one user
app.get(prePath+"/User/findAll",UserCtrl.findAll);//find many user

app.get(prePath+"/Article/createOne",ArticleCtrl.createOne);
app.get(prePath+"/Article/createMany",ArticleCtrl.createMany);
app.get(prePath+"/Article/readOne",ArticleCtrl.readOne);
app.get(prePath+"/Article/readMany",ArticleCtrl.readMany);
app.get(prePath+"/Article/deleteOne",ArticleCtrl.deleteOne);
app.get(prePath+"/Article/deleteMany",ArticleCtrl.deleteMany);

app.get(prePath+"/newsletter/sendMails",NewsletterCtrl.sendMails);

//public source
app.use(express.static("public"));

//setter 404 page
app.use(function(req,res){
    res.send("Oups, la page n'existe pas");
})

//setter le port
app.listen(3000);
console.log("app is running in port 3000!");