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
    var u =new article({
        "action":art.action,
        "keyword":art.keyword,
        "articlesPage": art.articlesPage,
        "articlesCount": art.articlesCount,
        "articlesSortBy": art.articlesSortBy,
        "articlesArticleBodyLen": art.articlesArticleBodyLen,
        "resultType": art.resultType,
        "dataType": art.dataType,
        "apiKey": art.apiKey,
        
    })
    u.save();
}
articleSchema.statics.createMany=function(artList){
    
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

//creaion du model
var article= mongoose.model("article",articleSchema);
module.exports=article;