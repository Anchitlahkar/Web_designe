country = ["World", "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil", "Bulgaria", "Canada", "Chile", "China", "Colombia", "Cuba", "Czech Republic", "Egypt",
  "Finland", "France", "Germany", "Greece", "Hong Kong", "Hungary", "India", "Indonesia", "Iraq", "Ireland", "Israel", "Italy", "Japan", "Kazakhstan", "Kuwait", "Latvia",
  "Lebanon", "Lithuania", "Malaysia", "Mexico", "Morocco", "Netherland", "New Zealand", "Nigeria", "North Korea", "Norway", "Pakistan", "Peru", "Philippines", "Poland",
  "Portugal", "Romania", "Russia", "Saudi Arabia", "Serbia", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sweden", "Switzerland",
  "Taiwan", "Tanzania", "Thailand", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Venezuela", "Vietnam",]

country_codes = ["ar", "au", "at", "bd", "be", "br", "bg", "ca", "cl", "cn", "co", "cu", "cz", "eg", "fi", "fr", "de", "gr", "hk", "hu", "in", "id", "iq", "ie", "il",
  "it", "jp", "kz", "kw", "lv", "lb", "lt", "my", "mx", "ma", "nl", "nz", "ng", "kp", "no", "pk", "pe", "ph", "pl", "pt", "ro", "ru", "sa", "rs", "sg", "sk", "si", "za",
  "kr", "es", "se", "ch", "tw", "tz", "th", "tr", "ua", "ae", "gb", "us", "ve", "vi",]

news = null
code = "in"
country_name = "India"
search = "India"

tag = "News From"

calls = 0


api_list = ["d2af94ecacmshdeebfc210373e8ep177d99jsn573b3d727456", "accedf7bf4msh4a8a92463ff4f82p149113jsn12c0378dffad","a955d335cdmsh0a4365e1b65345fp1ee9ddjsn20e727d988f0"]

try_api = api_list[0]

author = []
content = []
description = []
title = []
url_news = []
urlToImage = []


$(document).ready(function () {
  loaddata(search)
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
  $("#country_name").append(`<a class="nav-link">From  ${country_name}</a>`)


  author = []
  content = []
  description = []
  title = []
  url_news = []
  urlToImage = []

  $(".col").remove()
  $("#news-removable").append(`<div class="col flex-container"></div>`)
  search = country_name
  console.log(search)
  loaddata(search)
})


function api_call() {
  $.ajax({
    "async": true,
    "crossDomain": true,
    "url": Url,
    "method": "GET",
    "headers": {
      "X-RapidAPI-Key": `${try_api}`,
      "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
    },
    success: function (response) {
      console.log(response)
      news = response.value
      sort_news_data(news)
      show_news()
    },
    error: function (error) {
      console.log(try_api)
      try_api = api_list[calls + 1]
      calls += 1

      console.log(try_api)
      console.log("error")
      loaddata(search)
    }
  })


  // $.ajax({
  //   url: "https://raw.githubusercontent.com/Anchitlahkar/Web_designe/master/data.json",
  //   crossDomain: true,
  //   method: "GET",
  //   success: function (res) {
  //     const response = JSON.parse(res);
  //     // console.log(response)
  //     news = response["value"]
  //     sort_news_data(news)
  //     show_news()
  //   }
  // })
}

function loaddata(data) {
  $(".loading_class").remove()

  $(".loading").append(`<div><div class="fa-5x loading_class">
  <i class="fa fa-spinner fa-spin fa-pulse"></i></div></div>`)

  Url = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=${data}&pageNumber=1&pageSize=50&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null`

  console.log(api_list.length)
  if (title.length === 0) {
    api_call()
  }
}


$("#search-btn").click(function () {
  value = $("#search-input").val()
  window.location.href = '?#';

  if (value !== "") {
    tag = `${value}`

    $("#country_name").empty()
    $("#country_name").append(`<a class="nav-link"> Related To ${tag}</a>`)
    
    author = []
    content = []
    description = []
    title = []
    url_news = []
    urlToImage = []

    $(".col").remove()
    $("#news-removable").append(`<div class="col flex-container"></div>`)
    console.log(tag)
    loaddata(tag)
  }
  else {
    alert("Please enter a keyword")
  }

})

function sort_news_data(data) {
  // console.log(data)
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
          <svg class="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img"
          aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
          <img width="100%" height="100%" src="${urlToImage[i]}"</img><rect width="100%" height="100%" fill="#55595c"></rect>
        </svg>
            <div class="card-body">
            <h3><b>${title[i]}</b></h3>
            <br>
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
          <h2 id="text"><b>${title[i]}</b></h2><br>
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
