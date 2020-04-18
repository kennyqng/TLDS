var apiKey = "kIcbQMoCW5nw4kogd4UhHlAJh1zG5-GC0uyb6nYCFjI";

var unsplashURL = "https://api.unsplash.com/search/?query=";

var id = "&client_id="

var isSearching = false;

//Events=====================================
$("#searchInput").on("keyup", function(e) {
    if(e.which == 13 || e.keyCode == 13) {
        if(isSearching === false){
            isSearching = true;
            search();
            setTimeout(function(){isSearching = false;}, 2000);
        }
    }
});

$(".button").on("click", function(){
    if(isSearching === false){
        isSearching = true;
        search();
        setTimeout(function(){isSearching = false;}, 2000);
    }
});


//FUNCTIONS===================================
//Performs main search---------------------------------------------------------------------------------------------
function search() {
    var search = $("#searchInput").val();

    $("#hideCard").attr('style', 'display: block');
    $('#searchInput').val('');

    wikiSearch(search);
}

//Function for unsplash search-------------------------------------------------------------------------------------
function imageSearch(search) {
    $.ajax({
        url: unsplashURL + search + id + apiKey,
        method: 'GET'
    })
    .then(function(response){
        console.log(response);
        var url = response.photos.results[0].urls.small;
        $("#cardImage").attr("src", url);
    });
}

//Function to search wikipedia for possible pages to display--------------------------------------------------------
function wikiSearch(search) {
    var resultNum = 0;

    $.ajax({
        url: `https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=${search}`,
        method: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
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
          if(response.type === 'disambiguation') {
            console.log('ambiguous');
            $('#cardText').text('');   
            $('#cardTitleSlide').text('');
            $("#cardImage").attr("src", 'refine-search.png');
          }else {  
            $('#cardText').text(response.extract);   
            $('#cardTitleSlide').text(response.title);
            imageSearch(search);
          }
        },
        error: function() {
            resultNum++;
            wikiRequest(data.query.search[resultNum].title);
        }
    });
}
