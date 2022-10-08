country = ["Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil", "Bulgaria", "Canada", "Chile", "China", "Colombia", "Cuba", "Czech_republic", "Egypt",
  "Finland", "France", "Germany", "Greece", "Hong_kong", "Hungary", "India", "Indonesia", "Iraq", "Ireland", "Israel", "Italy", "Japan", "Kazakhstan", "Kuwait", "Latvia",
  "Lebanon", "Lithuania", "Malaysia", "Mexico", "Morocco", "Netherland", "New_zealand", "Nigeria", "North_korea", "Norway", "Pakistan", "Peru", "Philippines", "Poland",
  "Portugal", "Romania", "Russia", "Saudi_arabia", "Serbia", "Singapore", "Slovakia", "Slovenia", "South_africa", "South_korea", "Spain", "Sweden", "Switzerland",
  "Taiwan", "Tanzania", "Thailand", "Turkey", "Ukraine", "United_arab_emirates", "United_kingdom", "United_states_of_america", "Venezuela", "Vietnam",]

country_codes = ["ar", "au", "at", "bd", "be", "br", "bg", "ca", "cl", "cn", "co", "cu", "cz", "eg", "fi", "fr", "de", "gr", "hk", "hu", "in", "id", "iq", "ie", "il",
  "it", "jp", "kz", "kw", "lv", "lb", "lt", "my", "mx", "ma", "nl", "nz", "ng", "kp", "no", "pk", "pe", "ph", "pl", "pt", "ro", "ru", "sa", "rs", "sg", "sk", "si", "za",
  "kr", "es", "se", "ch", "tw", "tz", "th", "tr", "ua", "ae", "gb", "us", "ve", "vi",]

news = null
code = "in"
country_name = "India"
search = "India"


author = []
content = []
description = []
title = []
url_news = []
urlToImage = []


$(document).ready(function () {
  loaddata()
})


$(".float-2").click(function () {
  $(window).scrollTop(position);
})

for (i = 0; i < country.length; i++) {
  $(".dropdown-menu").append(`<li><a id='${country_codes[i]}: ${country[i]}' class='dropdown-item' href='#'>${country[i]}</a></li>`)
}

$(`.dropdown-item`).click(function () {
  take_code = $(this).attr('id')
  code = take_code.split(":")[0]
  country_name = take_code.split(":")[1]

  $("#country_name").empty()
  $("#country_name").append(`<a class="nav-link" href="#">${country_name}</a>`)


  author = []
  content = []
  description = []
  title = []
  url_news = []
  urlToImage = []

  $(".col").remove()
  $("#news-removable").append(`<div class="col flex-container"></div>`)
  search = country_name
  loaddata()
})

function loaddata() {
  $(".loading_class").remove()

  $(".loading").append(`<div><div class="fa-5x loading_class">
  <i class="fa fa-spinner fa-spin fa-pulse"></i></div></div>`)

  Url = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=${search}&pageNumber=1&pageSize=50&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null`
  console.log(Url)
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": Url,
    "method": "GET",
    "headers": {
      "X-RapidAPI-Key": "d2af94ecacmshdeebfc210373e8ep177d99jsn573b3d727456",
      "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
    }
  };

  $.ajax(settings).done(function (response) {
    news = response.value
    sort_news_data(news)
    show_news()
  });
}

$("#search-btn").click(function () {
  value = $("#search-input").val()
  console.log(value)
  
  if (value !== "") {
    search = value
    loaddata()
  }
  else{
    alert("Please enter a keyword")
  }

})

function sort_news_data(data) {
  console.log(data)
  for (i = 0; i < data.length; i++) {
    author.push(data[i].provider.name)
    content.push(data[i].snippet)
    description.push(data[i].description)
    title.push(data[i].title)
    url_news.push(data[i].url)
    urlToImage.push(data[i].image.url)
  }
}


function show_news() {
  $(".loading_class").remove()

  for (i = 0; i < title.length; i++) {
    if (title[i] !== null) {
      if (content[i] !== null) {
        $(".col").append(`
      <div id="together" class="together${i}">
          <div id="news_block" class="card shadow-sm">
              <img id="image" src="${urlToImage[i]}" alt="Loading...." />
            <div class="card-body">
            <h3>${title[i]}</h3>
              <p class="card-text">${description[i]}</p>
              <div class=" justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" id="news" onclick="openNav${i}()" class="btn btn-sm btn-outline-primary">Check Out</button>
                </div>
              </div>
            </div>
          </div>

          <div id="myNav_${i}" class="overlay">
          <a href="javascript:void(0)" class="closebtn" onclick="closeNav${i}()">&times;</a>
          <div class="overlay-content">
          <img id="image" src="${urlToImage[i]}" alt="Image" />
          <br>
          <h2 id="text">${title[i]}</h2><br>
          <p id="text">${content[i]}</p>
          <button class="button button1"><a href="${url_news[i]}">Read All</a></Button>
          </div>
        </div>

        <script>
          function openNav${i}() {
            document.getElementById("myNav_${i}").style.height = "100%";
          }
        
          function closeNav${i}() {
            document.getElementById("myNav_${i}").style.height = "0%";
          }
          </script>
          <div>
        `)
      }
    }
  }
}


$("#News-reload").click(function () {
  location.reload(true)
})
