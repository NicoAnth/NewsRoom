const Article = require("../models/Article.js");
const mockData=[{ "sid":1,"name":"junyi","grade":8},{ "sid":2,"name":"junyi2","grade":9}];

exports.createOne=function(req,res){
    fetch('http://newsapi.org/v2/top-headlines?country=us&category=general&apikey=e34c767bd0b34078a7a790f5c0dd9ba5').then((res)=>{
        return res.json()
    }).then((data)=>{
        console.log(data)

        data.articles.forEach(article =>{
            //const Article = require("../models/Article.js");
            //Article.createOne(article);
            //Create article elements
            let div = document.createElement('div');
            let h2 = document.createElement('h2');
            let a = document.createElement('a');
            let description = document.createElement('p');
            let br = document.createElement('br');
            let hr = document.createElement('hr');
            let img = document.createElement('img');
            let date = document.createElement('em');
            let author = document.createElement('p');
            let divSocialNetworkBannerRight = document.createElement('div');
            let ulsocialNetwork = document.createElement('ul');
            let liFacebook = document.createElement('li');
            let liTwitter = document.createElement('li');
            let linkFacebook = document.createElement('a');
            let linkTwitter = document.createElement('a');
            let iFacebook = document.createElement('i');
            let iTwitter = document.createElement('i');

            //Set SocialNetwork banner
            divSocialNetworkBannerRight.setAttribute('class', 'w3layouts_banner_info_right');
            if(article.author == null){
                divSocialNetworkBannerRight.setAttribute('style', 'padding:0;');
            }
            linkFacebook.setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u='+article.url);
            linkFacebook.setAttribute('class', 'w3_agile_facebook');
            linkTwitter.setAttribute('href', 'http://twitter.com/share?url='+article.url);
            linkTwitter.setAttribute('class', 'agile_twitter');

            iFacebook.setAttribute('aria-hidden', 'true');
            iFacebook.setAttribute('class', 'fa fa-facebook');
            iTwitter.setAttribute('aria-hidden', 'true');
            iTwitter.setAttribute('class', 'fa fa-twitter');

            linkFacebook.appendChild(iFacebook);
            liFacebook.appendChild(linkFacebook);
            linkTwitter.appendChild(iTwitter);
            liTwitter.appendChild(linkTwitter);
            ulsocialNetwork.appendChild(liFacebook);
            ulsocialNetwork.appendChild(liTwitter);
            divSocialNetworkBannerRight.appendChild(ulsocialNetwork);
            
            //Parse the NewsAPI date
            var dateapi = article.publishedAt.split('T');

            //title and href formatting
            div.setAttribute('class', 'agileinfo_services_grid');
            a.setAttribute('href',article.url);
            a.textContent = article.title;
            a.setAttribute('style','color:black');
            h2.appendChild(a);

            description.setAttribute('style', 'color:black');
            description.textContent=article.description;

            //Get the img from the api and format it to fit the page
            img.setAttribute('src',article.urlToImage);
            img.setAttribute('class','agileinfo_services_grid_right newsImage');
            img.setAttribute('style','position: absolute;left: 98%;');
            img.setAttribute('width', 'auto');
            img.setAttribute('height', 'auto');
            
            //Set the article's date
            date.setAttribute('class', 'date');
            date.textContent = dateapi[0];

            //Get the article's author
            author.textContent = 'By ' + article.author;

            //If img is provided by NewsAPI and available in our country, append it to the div
            if(article.urlToImage == null || (/kubrick/.test(article.urlToImage))){
                img.src ="../images/000-2.png";
            }

            div.appendChild(img);
            div.appendChild(date);
            div.appendChild(h2);
            div.appendChild(description);
            div.appendChild(divSocialNetworkBannerRight);

            //If author is provided by NewsAPI, append to the div
            if(article.author != null){
                div.appendChild(author);
            }
            div.appendChild(br);
            div.appendChild(hr);
            document.getElementById("newsList").appendChild(div);
        })
    })

    Article.createOne(req.body);
    //res.redirect("../login");
}
exports.createMany=function(req,res){

}
exports.readOne=function(req,res){
  //TODO
    Article.readOne(mockData,function(){});
    res.render("/tension",{
        page:"tension"
    });
}
exports.readMany=function(req,res){
    //TODO
    res.render("/categorie",{
        page:"categorie"
    });
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