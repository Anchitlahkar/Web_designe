country = ["Argentina", "Australia", "Austria", "Belgium", "Brazil", "Bulgaria", "Canada", "China", "Colombia", "Cuba", "Czech Republic", "Egypt", "France", "Germany",
 "Greece", "Hong Kong", "Hungary", "India", "Indonesia", "Ireland", "Israel", "Italy", "Japan", "Latvia", "Lithuania", "Malaysia", "Mexico", "Morocco", "Netherlands",
  "New Zealand", "Nigeria", "Norway", "Philippines", "Poland", "Portugal", "Romania", "Russia", "Saudi Arabia", "Serbia", "Singapore", "Slovakia", "Slovenia",
   "South Africa", "South Korea", "Sweden", "Switzerland", "Taiwan", "Thailand", "Turkey", "UAE", "Ukraine", "United Kingdom", "United States", "Venuzuela"]

country_codes = ["ar",
  "au", "at", "be", "br", "bg", "ca", "cn", "co", "cu", "cz", "eg", "fr", "de", "gr", "hk", "hu", "in", "id", "ie", "il", "it", "jp", "lv", "lt",
  "my", "mx", "ma", "nl", "nz", "ng", "no", "ph", "pl", "pt", "ro", "ru", "sa", "rs", "sg", "sk", "si", "za", "kr", "se", "ch", "tw", "th", "tr",
  "ae", "ua", "gb", "us", "ve"]

news = null
code = "in"
country_name = "India"


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
  loaddata()
})

function loaddata() {
  url = `https://newsapi.org/v2/top-headlines?country=${code}&apiKey=5e61b7561e794a1d9e169219bf23c6db`
  console.log(url)

  $.ajax({
    url: url,
    type: 'GET',
    success: function (res) {
      news = res.articles;
      result = res.totalResults
      sort_news_data(news)
      show_news()
    },
    error: function (res) {
      console.log(res)
    }
  })
}

function sort_news_data(data) {
  for (i = 0; i < data.length; i++) {
    author.push(data[i].author)
    content.push(data[i].content)
    description.push(data[i].description)
    title.push(data[i].title)
    url_news.push(data[i].url)
    urlToImage.push(data[i].urlToImage)
  }
}


function show_news() {
  for (i = 0; i < author.length; i++) {
    if (title[i] !== null) {
      $(".col").append(`
      <div class="together${i}">
          <div id="news_block" class="card shadow-sm">
              <img id="image" src="${urlToImage[i]}" alt="Image" />
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


$(`#news-removable`).click(function () {

})
