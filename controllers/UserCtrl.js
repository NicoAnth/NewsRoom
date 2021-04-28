const User = require("../models/User.js");
const mockData={ "mail":"leowjy123456@gmail.com","passeword":"123456","preferences":["General","Technology"]};
const mockData1={ "mail":"leowjy123456@gmail.com","passeword":"12345678","preferences":["General","Technology"]};

exports.createOne=function(req,res){
    User.createOne(req.body,function(){});
    res.redirect("../login");
}

exports.updateOne=function(req,res){
    User.updateOne(req.body,function(){});
    res.render("/Parametre");
}
exports.deleteOne=function(req,res){
    User.deleteOne(req.body.email,function(err,results){
        console.log(results)
    })
    res.redirect("../index");
}
exports.findOne=function(req,res){
    User.findOne(req.body,function(err,results){
        console.log(results)
        res.render("../index",{
            user:results
        })
    })
}
exports.findAll=function(req,res){
    User.findAll({},function(err,results){
        res.json({"result": results});
        console.log(results)
        /*res.render("../index",{
            users:results
        })*/
    })
}
exports.login=function(req,res){
    //TODO
}
exports.logout=function(req,res){
    //TODO
}