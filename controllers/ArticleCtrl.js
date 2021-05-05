const Article = require("../models/Article.js");
const mockData=[{ "sid":1,"name":"junyi","grade":8},{ "sid":2,"name":"junyi2","grade":9}];

exports.createOne=function(req,res){
   
}
exports.createMany=function(req,res){

}
exports.readOne=function(req,res){
  //TODO
  console.log("My script is Running !!")  
    Article.readOne(mockData,function(){});
    res.render("/tension",{
        page:"tension"
    });
}
exports.readMany=function(req,res){
    //TODO
    res.render("/tension",{
        page:"tension"
    });
    /*res.render("/categorie",{
        page:"categorie"
    });*/
}
exports.deleteOne=function(req,res){
    //TODO
    Student.find({},function(err,results){
        res.json({"result": results});
        console.log(results)
    });
}
exports.deleteMany=function(req,res){
    //TODO
    Student.find({},function(err,results){
        res.json({"result": results});
        console.log(results)
    });
}


//Faut il export getNews ici ?
exports.getNews=function(req,res){
        console.log("My script is Running !!")      
}
