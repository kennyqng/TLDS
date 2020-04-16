var apiKey = "kIcbQMoCW5nw4kogd4UhHlAJh1zG5-GC0uyb6nYCFjI";

var unsplashURL = "https://api.unsplash.com/search/?query=";

var id = "&client_id="


$(".button").on("click", function(){
    var search = $("#searchInput").val();

    $("#hideCard").attr('style', 'display: block');

    $('#cardText').text('');
    $('#cardTitle').text('');
    $('#cardTitleSlide').text('');

    $.ajax({
        url: unsplashURL + search + id + apiKey,
        method: 'GET'
    })
    .then(function(response){
        console.log(response);
        var url = response.photos.results[0].urls.small;
        $("#cardImage").attr("src", url);
    });

    wikiSearch(search);
});

//Function to search wikipedia for possible pages to display-----------------Not being used------------------------
function wikiSearch(search) {
    var resultNum = 0;

    $.ajax({
        url: `https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=${search}`,
        method: 'GET'
    }).then(function(data) {
        console.log(data);
        wikiRequest(data.query.search[resultNum].title);        
    });
}

//Function to search and display chosen article----------------------------------------------------------------------
function wikiRequest(search) {
    $.ajax({
        url: `https://en.wikipedia.org/api/rest_v1/page/summary/${search}`,
        method: 'GET',
        success: function(response) {
          console.log(response);
          $('#cardText').text(response.extract);   
          $('#cardTitleSlide').text(response.title);
        },
        error: function() {
            console.log('404 Error');
            resultNum++;
            wikiRequest(data.query.search[resultNum].title);
        }
    });
}