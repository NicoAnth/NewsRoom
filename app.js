//creation dune app express
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongo");
var passport = require("passport");
var crypto = require("crypto");


const UserCtrl=require("./controllers/UserCtrl.js");
const IndexCtrl=require("./controllers/IndexCtrl.js");
const ArticleCtrl=require("./controllers/ArticleCtrl.js");
const MailCtrl=require("./controllers/MailCtrl.js");

//creation de l'app
var app=express();


// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended : false}));


//Je commence le tuto pour login/logout: 
// https://youtu.be/F-sFp_AvHc8
//https://github.com/zachgoll/express-session-authentication-starter
const uriBdd = "mongodb+srv://newsAdmin:cmsI%230H%4072%21Y@awsnr.jmguc.mongodb.net/test";


//on utilise plus new mongoStore mais create, on a dautres changements , cf npm connect-mongo
const sessionStore = mongoStore.create({
	mongoUrl: uriBdd,
	mongoOptions: {
	useNewUrlParser: true,
    useUnifiedTopology: true
	},
    collectionName: 'sessions' // cree une collection sessions et stocke session ci-dessous
});



//configuration de la session
app.use(session({
  secret:'news',//calcul du hash afin d'éviter modification du signedCookie
    cookie:{maxAge:1000 * 60 * 60 * 24},// temps donné avant expiration du cookie
    resave:false,//on sauvegarde pas la valeur de session si la valeur de session n'est pas changé 
    saveUninitialized:true,//forcer à sauvegarder session
    store: sessionStore // stocker dans la bd la session
}));




//configuration du template
app.set("view engine","ejs");

//setter routeur
var prePath="/Newsroom";
app.get(prePath+"/index",IndexCtrl.showHomePage);//home page
app.get(prePath+"/login",IndexCtrl.showLoginPage);//login page 
app.get(prePath+"/ModifierPreferences",IndexCtrl.showChangePreferencesPage);//ModifierPreferences page 
app.get(prePath+"/Parametre",IndexCtrl.showParameterPage);//Parametre page 
app.get(prePath+"/register",IndexCtrl.getRegisterPage);//register page 

      //Clés NewsAPI
      //06e5537922b040989a7056bdf11539d9 mienne
      //e34c767bd0b34078a7a790f5c0dd9ba5 nicolas

app.get(prePath+"/General",IndexCtrl.getGeneralPage);//general page 
app.get(prePath+"/Health",IndexCtrl.getHealthPage);//Health page 
app.get(prePath+"/Science",IndexCtrl.getSciencePage);//Science page 
app.get(prePath+"/Sport",IndexCtrl.getSportPage);//Sport page 
app.get(prePath+"/Technology",IndexCtrl.getTechnologyPage);//Technology page 
app.get(prePath+"/Entertainment",IndexCtrl.getEntertainmentPage);//Entertainment page 
app.get(prePath+"/Email",IndexCtrl.getEmailPage);

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
app.post(prePath+"/newsletter/sendMails",MailCtrl.sendMails);

//public source
app.use(express.static("public"));

//setter 404 page
app.use(function(req,res){
    res.send("Oups, la page n'existe pas");
})

//setter le port
app.listen(3000);
console.log("app is running in port 3000!");