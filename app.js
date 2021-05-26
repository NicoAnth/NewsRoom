//creation dune app express
const express = require("express");
const session = require("express-session");
var passport = require('passport');
const MongoStore = require('connect-mongo');
const dotenv = require("dotenv");
dotenv.config();

const UserCtrl=require("./controllers/UserCtrl.js");
const IndexCtrl=require("./controllers/IndexCtrl.js");
const ArticleCtrl=require("./controllers/ArticleCtrl.js");
const MailCtrl=require("./controllers/MailCtrl.js");
const isAuth = require('./models/PasswordUtils').isAuth;
//creation de l'app
var app=express();



var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
//parse les post requetes du html formulaire
app.use(bodyParser.urlencoded({extended : false}));

// parse pour les requetes post uniquement
// parse application/json
app.use(bodyParser.json());



//Je commence le tuto pour login/logout: 
// https://youtu.be/F-sFp_AvHc8
// https://github.com/zachgoll/express-session-authentication-starter/tree/final
const secret = process.env.SECRET;
const uriBD = process.env.URI;

const sessionStore = MongoStore.create({ mongoUrl: uriBD });
//configuration de la session
app.use(session({
    secret: secret,//calcul du hash afin d'éviter modification du signedCookie
    cookie:{maxAge:1000 * 60 * 60 * 24},// temps donné avant expiration du cookie
    resave:false,//on sauvegarde pas la valeur de session si la valeur de session n'est pas changé 
    saveUninitialized:true,//forcer à sauvegarder session
    store: sessionStore // stocker dans la bd la session
}));


//configuration du template
app.set("view engine","ejs");


require('./models/Passport');
//initialiser passport middleware, 
//refresh express passport middleware 
//a chaque fois quon recharge une route
app.use(passport.initialize());
// manipulation de req.session
app.use(passport.session());
app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});



//setter routeur
var prePath="/Newsroom";
app.get(prePath+"/index",IndexCtrl.showHomePage);//home page
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
app.get(prePath+'/loginPage', IndexCtrl.showLoginPage);


app.post(prePath+"/login", UserCtrl.authentification);
app.post(prePath+"/login-failure",UserCtrl.getFailure);
app.post(prePath+"/login-success",UserCtrl.getSuccess);
app.post(prePath+"/Browse",IndexCtrl.getBrowsePage); //Page recherche article
app.post(prePath+"/User/createOne",UserCtrl.createOne);//creer user
app.post(prePath+"/User/updateOne",UserCtrl.updateOne);//update user
app.post(prePath+"/User/deleteOne",UserCtrl.deleteOne);//delete user
app.get(prePath+"/User/findOne",UserCtrl.findOne);//find one user
app.get(prePath+"/User/findAll",UserCtrl.findAll);//find many user
app.get(prePath+"/User/logout", UserCtrl.logout);
app.post(prePath+"/MaiUs/sendMails",MailCtrl.sendMails);



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
    res.send("<!DOCTYPE html><html><head><style type=text/css>p{color: #0ecc8a; font-weight: 900; font-size: 20px; font-family: Helvetica, Arial, sans-serif;} img{display: block; margin-left: auto; margin-right: auto; width: 50%;}</style></head><body><img src='../images/000-2.png' alt='Newsroom banner'><p>Oups, requested page don't exists, try checking the URL in your web browser.</p><a href='../Newsroom/index'> Go to NewsRoom home page</a></body></html>");
});


//setter le port
app.listen(3000);



console.log("app is running in port 3000!");

