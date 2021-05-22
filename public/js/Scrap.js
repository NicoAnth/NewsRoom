function imgError(image) {
  image.onerror = "";
  image.src = null;
  return true;
}
function generalSources() {
  let general = [
    "RTE",
    "HuffPost",
    "Yahoo Entertainment",
    "Business Insider",
    "The Verge",
    "CNN",
    "New York Times",
    "Fox Sports",
    "The Guardian",
    "Daily Telegraph",
    "Reuters",
    "BBC News",
    "Independent",
    "The Sun Daily",
    "Sky Sports",
    "TechRadar",
    "The Indian Express",
    "DNA India",
    "Firstpost",
    "India.com",
    "The Sydney Morning Herald",
    "New Zealand Herald",
    "Inquirer.net",
    "The Manila Times",
    "Rappler",
    "The Straits Times",
    "TODAYonline",
    "The Star Online",
    "Jakarta Post",
    "News24"
  ];
  return general;
}

function healthSources() {
  let health = [
    "Medical Dialogues",
    "Telegraph India",
    "The Tribune India",
    "IOL",
    "The Conversation Africa",
    "Ctvnews.ca",
    "Vancouver Sun",
    "News.com.au",
    "The Australian",
    "NT News",
    "News-Medical.Net",
    "Bristol Post",
    "SPORTbible",
    "Daily Mail",
    "Mashable",
    "Irish Examiner",
    "The Irish Times",
    "CNBC",
    "The Washington Post",
    "EurekAlert",
    "Science Daily",
    "CNET",
    "Malaysiakini",
    "swissinfo.ch",
    "Advanced Science News",
    "SciTechDaily",
    "BioSpace",
    "Nature World News",
    "Investing.com"
  ];
  return health;
}

function sportSources() {
  let sport = [
    "The42",
    "Dublin Live",
    "Football365.com",
    "PlanetFootball",
    "Evening Standard",
    "Football Insider",
    "Football.London",
    "Birmingham Live",
    "Leicestershire Live",
    "Shields Gazette",
    "Tribal Football",
    "GIVEMESPORT",
    "PlanetF1",
    "Stuff.co.nz",
    "ESPN",
    "Rivals.com",
    "ClutchPoints",
    "Fox News",
    "hoopsrumors.com",
    "Auburn Citizen",
    "New York Post",
    "MMA Fighting",
    "CBS Sports",
    "SFGate",
    "The Times of India",
    "NDTV News",
    "India Today",
    "Sportskeeda",
    "CNA",
    "Abs-cbn.com",
    "Nrl.com",
    "Speedcafe",
    "Courier Mail",
    "Racenet",
    "Sen.com.au",
    "portsnet.ca",
    "Edmonton Journal",
    "The Hard Tackle",
    "CaughtOffside"
  ];
  return sport;
}

function entertainmentSources() {
  let entertainment = [
    "Global Times",
    "KTVZ",
    "Cosmopolitan.com",
    "soompi",
    "GamesRadar+",
    "CinemaBlend",
    "Forbes",
    "HarpersBAZAAR.com",
    "Teen Vogue",
    "Bustle",
    "ABC News",
    "TMZ",
    "woman&home",
    "Royal Central",
    "digitalspy.com",
    "Post Magazine",
    "NME",
    "The News International",
    "Www.geo.tv",
    "Republic World",
    "WION",
    "IndiaGlitz.com",
    "The Irish Sun",
    "HITC - Football, Gaming, Movies, TV, Music",
    "PerthNow",
    "AsiaOne",
    "eNCA"
  ];
  return entertainment;
}

function scienceSources() {
  let science = [
    "NASA",
    "Engadget",
    "The Hill",
    "Executivetraveller.com",
    "Cbslocal.com",
    "ScienceDaily",
    "Science Magazine",
    "ExtremeTech",
    "MyBroadband",
    "Moneyweb.co.za",
    "Business Day",
    "Eastafricanewspost.com",
    "The Hindu",
    "BloombergQuint",
    "Business Insider India",
    "ScienceAlert",
    "Herald Sun",
    "Newshub",
    "Stuff.co.za",
    "1News",
    "Thedailyguardian.net",
    "Phys.Org",
    "Live Science",
    "IFLScience",
    "Tech Explorist",
    "Azoquantum.com",
    "Telecompaper",
    "Medical Xpress",
    "HPCwire",
    "Science Times"
  ];
  return science;
}

function technologySources() {
  let technology = [
    "Macworld",
    "Polygon",
    "AnandTech",
    "PRNewswire",
    "DC Rainmaker",
    "MacRumors",
    "XDA Developers",
    "VentureBeat",
    "PCMag.com",
    "Motley Fool",
    "IGN",
    "Itnewsafrica.com",
    "TimesLIVE",
    "The Next Web",
    "GSMArena.com",
    "Nintendo Life",
    "Eurogamer.net",
    "India TV News",
    "Tom's Guide",
    "HYPEBEAST",
    "Designboom",
    "Notebookcheck.net",
    "TrueAchievements",
    "Anitrendz.net",
    "Digital Information World",
    "9to5Mac",
    "Pocket-lint"
  ];
  return technology;
}

function filterSource(category, articlesList) {
  switch (category) {
    case "General":
      return articlesList.filter(news =>
        generalSources().includes(news.source)
      );
    case "Health":
      return articlesList.filter(news => healthSources().includes(news.source));
    case "Sport":
      return articlesList.filter(news => sportSources().includes(news.source));
    case "Entertainment":
      return articlesList.filter(news =>
        entertainmentSources().includes(news.source)
      );
    case "Science":
      return articlesList.filter(news =>
        scienceSources().includes(news.source)
      );
    case "Technology":
      return articlesList.filter(news =>
        technologySources().includes(news.source)
      );
  }
}

function getArticle() {
  console.log("Enter function!!");
  const NewsAPI = require("newsapi");
  const fs = require("fs");
  const newsapi = new NewsAPI("06e5537922b040989a7056bdf11539d9");
  var dateFormat = require("dateformat");
  let lg = "en";
  let numberResults = 100;
  newsapi.v2
    .topHeadlines({
      language: lg,
      pageSize: numberResults,
      category: "health"
    })
    .then(response => {
      console.log("Enter response json general!!");
      const obj = response;
      let articles = obj.articles.map(v => ({
        source: v.source.name,
        author: v.author,
        titleArticle: v.title,
        link: v.url,
        linkImage: v.urlToImage,
        date: v.publishedAt,
        content: v.content
      }));

      articles = articles.filter(news => {
        if (news.author == null) news.author = "Unknown Author";
        if (news.author.match("https://*")) news.author = news.source;
        if (news.linkImage == null) news.linkImage = "No photo";

        news.date = dateFormat(new Date(news.date), "dddd d mmmm yyyy H:MM:ss");
        return news;
      });

      articles = filterSource("General", articles);
      
      for (const a in articles) {
        console.log(articles[a]);
      }
      
      //let titleDiv = window.document.body.createElement("div");
      //titleDiv.setAttribute("class", "col-md-offset-4 col-md-4");
      //let HText = document.body.createElement("h1");
      //HText.innerHTML = "General";
      //let HorizontalBar = document.body.createElement("hr");
      //titleDiv.appendChild(HText);
      //titleDiv.appendChild(HorizontalBar);

      let mainDiv = document.body.createElement("div");
      mainDiv.setAttribute("id", "newsList");
      mainDiv.setAttribute("class", "col-md-4 col-md-offset-4 col-mb-2");
      articles.forEach(article => {
        let div = document.createElement("div");
        let h2 = document.createElement("h2");
        let a = document.createElement("a");
        let description = document.createElement("p");
        let br = document.createElement("br");
        let hr = document.createElement("hr");
        let img = document.createElement("img");
        let date = document.createElement("em");
        let author = document.createElement("p");
        let divSocialNetworkBannerRight = document.createElement("div");
        let ulsocialNetwork = document.createElement("ul");
        let liFacebook = document.createElement("li");
        let liTwitter = document.createElement("li");
        let linkFacebook = document.createElement("a");
        let linkTwitter = document.createElement("a");
        let iFacebook = document.createElement("i");
        let iTwitter = document.createElement("i");

        //Set SocialNetwork banner
        divSocialNetworkBannerRight.setAttribute(
          "class",
          "w3layouts_banner_info_right"
        );
        if (article.author == "Unknown Author") {
          divSocialNetworkBannerRight.setAttribute("style", "padding:0;");
        }
        linkFacebook.setAttribute(
          "href",
          "https://www.facebook.com/sharer/sharer.php?u=" + article.link
        );
        linkFacebook.setAttribute("class", "w3_agile_facebook");
        linkTwitter.setAttribute(
          "href",
          "http://twitter.com/share?url=" + article.link
        );
        linkTwitter.setAttribute("class", "agile_twitter");

        iFacebook.setAttribute("aria-hidden", "true");
        iFacebook.setAttribute("class", "fa fa-facebook");
        iTwitter.setAttribute("aria-hidden", "true");
        iTwitter.setAttribute("class", "fa fa-twitter");

        linkFacebook.appendChild(iFacebook);
        liFacebook.appendChild(linkFacebook);
        linkTwitter.appendChild(iTwitter);
        liTwitter.appendChild(linkTwitter);
        ulsocialNetwork.appendChild(liFacebook);
        ulsocialNetwork.appendChild(liTwitter);
        divSocialNetworkBannerRight.appendChild(ulsocialNetwork);

        //title and href formatting
        div.setAttribute("class", "agileinfo_services_grid");
        a.setAttribute("href", article.link);
        a.textContent = article.title;
        a.setAttribute("style", "color:black");
        h2.appendChild(a);

        description.setAttribute("style", "color:black");
        description.textContent = article.content;

        //Get the img from the api and format it to fit the page
        img.setAttribute("src", article.linkImage);
        img.setAttribute("class", "agileinfo_services_grid_right newsImage");
        img.setAttribute("style", "position: absolute;left: 98%;");
        img.setAttribute("width", "auto");
        img.setAttribute("height", "auto");

        //Set the article's date
        date.setAttribute("class", "date");
        date.textContent = article.date;

        //Get the article's author
        author.textContent = "By " + article.author;

        //If img is provided by NewsAPI and available in our country, append it to the div
        if (
          article.linkImage == "No photo" ||
          /kubrick/.test(article.linkImage)
        ) {
          img.src = "../images/000-2.png";
        }

        div.appendChild(img);
        div.appendChild(date);
        div.appendChild(h2);
        div.appendChild(description);
        div.appendChild(divSocialNetworkBannerRight);

        div.appendChild(author);

        div.appendChild(br);
        div.appendChild(hr);
        mainDiv
          .querySelector(".col-md-4 col-md-offset-4 col-mb-2")
          .appendChild(div);
        console.log("Working on script!!");

        //console.log("Finished function!!");
      });
    });
}

function test() {
  console.log("Start test!!");
  const fetch = require("node-fetch");
  fetch(
    "http://newsapi.org/v2/top-headlines?country=us&category=general&apikey=e34c767bd0b34078a7a790f5c0dd9ba5"
  )
    .then(res => res.text())
    .then(data => console.log(data));
  console.log("Finishing test!!!");
}

module.exports = {
  getArticle: getArticle
};
