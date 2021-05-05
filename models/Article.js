var mongoose=require("mongoose");

//creation du schema
var articleSchema=new mongoose.Schema({
    "action": String,
    "keyword": String,
    "articlesPage": Number,
    "articlesCount": Number,
    "articlesSortBy": String,
    "articlesSortByAsc": Boolean,
    "articlesArticleBodyLen": Number,
    "resultType": String,
    "dataType": [],//je sais pas si il marche
    "apiKey": String,
    "forceMaxDataTimeWindow": Number
});

articleSchema.statics.createOne=function(art){
    //TODO
}
articleSchema.statics.createMany=function(artList){
    //TODO
}
articleSchema.statics.readOne=function(art){
    //TODO
}
articleSchema.statics.readMany=function(artList){
    //TODO
}
articleSchema.statics.deleteOne=function(art){
    //TODO
}
articleSchema.statics.deleteMany=function(artList){
    //TODO
}

//Ajout fonction pour convertir le format date
convertDate=function(d) {
    var converted_date = dateFormat(d, "dd/mmmm/yyyy")
    return converted_date
}

 checkImage = function(url){
        var s = document.createElement("IMG");
        s.src = url
        var check = true;
        s.onerror = function(){
            check=false;
        }
        s.onload = function(){
            check=true;
        }
        return check;
}



//creation du model
var article= mongoose.model("article",articleSchema);
module.exports=article;