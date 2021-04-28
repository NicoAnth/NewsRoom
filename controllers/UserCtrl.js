const Article = require("../models/Article.js");
const mockData={ "mail":"leowjy123456@gmail.com","passeword":"123456","preferences":["General","Technology"]};
const mockData1={ "mail":"leowjy123456@gmail.com","passeword":"12345678","preferences":["General","Technology"]};

exports.createOne=function(req,res){
    Article.createOne(mockData,function(){});
    res.render("/login");
}

exports.updateOne=function(req,res){
    Article.updateOne(mockData,function(){});
    res.render("/Parametre");
}
exports.deleteOne=function(req,res){
    res.render("/index");
}
exports.login=function(req,res){
    Article.findOne({},function(err,results){
        res.json({"result": results});
        console.log(results)
    });
}
exports.logout=function(req,res){

}