exports.showHomePage=function(req,res){
    const userConnected = require("connect-ensure-login");
    res.render("./index",{
        page:"index",
        connected: userConnected
    });
}
exports.showLoginPage=function(req,res){
    res.render("./loginPage",{
        page:"loginPage"
    });
    
}
exports.showChangePreferencesPage=function(req,res){
    
    res.render("./ChangePreferences",{
        page:"ChangePreferences"
    });
}
exports.showParameterPage=function(req,res){
    res.render("./Parameter",{
        page:"Parameter"
    });
}
exports.getRegisterPage=function(req,res){
    res.render("./register",{
        page:"register"
    });
}
exports.getGeneralPage=function(req,res){
    const userConnected = require("connect-ensure-login");
    res.render("./General",{
        pageCategory:"General", 
        connected: userConnected
    });
}
exports.getHealthPage=function(req,res){
    const userConnected = require("connect-ensure-login");
    res.render("./Health",{
        pageCategory:"Health",
        connected: userConnected
    });
}
exports.getEntertainmentPage=function(req,res){
    const userConnected = require("connect-ensure-login");
    res.render("./Entertainment",{
        pageCategory:"Entertainment",
        connected: userConnected
    });
}
exports.getSciencePage=function(req,res){
    const userConnected = require("connect-ensure-login");
    res.render("./Science",{
        pageCategory:"Science",
        connected: userConnected
    });
}
exports.getSportPage=function(req,res){
    const userConnected = require("connect-ensure-login");
    res.render("./Sport",{
        pageCategory:"Sport",
        nameCategoryAPI: "sport", //ici on a pas le meme nom pour l uri de fetch de lapi que le nom de la page
        connected: userConnected
    });
}
exports.getTechnologyPage=function(req,res){
    const userConnected = require("connect-ensure-login");
    res.render("./Technology",{
        pageCategory:"Technology",
        connected: userConnected
    });
}
exports.getEmailPage=function(req,res){
    const userConnected = require("connect-ensure-login");
    res.render("./Email",{
        page:"Email",
        connected: userConnected
    });
}

exports.getBrowsePage=function(req,res){
    const userConnected = require("connect-ensure-login");
    res.render("./Browse", {
        pageCategory: "Browse",
        "keyword": req.body.keyword,
         connected: userConnected
    })
}