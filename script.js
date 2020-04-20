var apiKey = "kIcbQMoCW5nw4kogd4UhHlAJh1zG5-GC0uyb6nYCFjI";

var unsplashURL = "https://api.unsplash.com/search/?query=";

var id = "&client_id="

var isSearching = false;

var timeInterval;

var alarmDiv = $("<div class='alarm'></div>").css("height", "25px");

//Events=====================================
$("#searchInput").on("keyup", function(e) {
    if(e.which == 13 || e.keyCode == 13) {
        initiateSearch();
    }
});

$(".button").on("click", function(){
    initiateSearch();
});




//FUNCTIONS===================================
// initiate search
function initiateSearch(){
    if(isSearching === false){
        resetBar();
        isSearching = true;
        clearInterval(timeInterval);
        search();
        countDown();
        setTimeout(function(){isSearching = false;}, 2000);
    }
}
// Timer-----------------------------------
function countDown(){
    var timeLeft = 60; //change time limit to 60 seconds - kenny 4/19
    var barWidth = 100;
    
    timeInterval = setInterval(function(){
        timeLeft--;
        barWidth -= (10/6); //visual correction for bar reduction for 60 secs in a 100% bar. - kenny 4/19
        $("#progress1").css("width", barWidth + "%");
    
        if (timeLeft < 0){
            clearInterval(timeInterval);
            alarmDiv.text("Reminder: You've been here for 1 minute.");
            $(".outline").css("height", "25px");
            $(".outline").prepend(alarmDiv);
            // alert("times up!");
        }
    },1000);
}

// remove reminder text
function resetBar(){
    alarmDiv.remove();
    $(".outline").css("height", "5px");
}


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
        var url = response.photos.results[0].urls.regular; //change pull regular quality pictures instead of small
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
