$( document ).ready(function() {
// An array of animals,new animals will be pushed into this array;
var topics = ['cat', 'dog', 'owl', 'peacock', 'horse'];
// Creating Functions & Methods
// Function that displays all gif buttons
function displayGifButtons(){
    $("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
    for (var i = 0; i < topics.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("gif");
        gifButton.addClass("btn")
        gifButton.attr("data-name", topics[i]);
        gifButton.text(topics[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
// Function to add a new animal button
function addNewButton(){

    $("#addGif").on("click", function(){

    var topic= $("#animal-input").val().trim();
    if (topic== ""){
      return false; // added so user cannot add a blank button
    }
    topics.push(topic);

    displayGifButtons();
    return false;
    });
}
// Function to remove last action button
    // Doesnt work properly yet removes all of the added buttons
    // rather than just the last
function resetButton(){
    $("removeGif").on("click", function(){

    topics.pop(topic);
    displayGifButtons();
    return false;
    });
}
// Function that displays all of the gifs
function displayGifs(){
    var topic = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic+ "&api_key=Kne4EZbSuv1e0ZaG3SZYmx5D7hxPQZl7&limit=10";
    console.log(queryURL); // displays the constructed url
    $.ajax({
        url: queryURL,
        method: 'GET'
    })  .done(function(response) {
        console.log(response);
        $("#gifsDisplay").empty();
        var results = response.data; //shows results of gifs
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("gifDiv");
            // pulling rating of gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url);
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still gif
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated gif
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif
            // adding div of gifs to gifsView div
            $("#gifsDisplay").append(gifDiv);
        }
    });
}
// Calling Functions & Methods
displayGifButtons();
addNewButton();
resetButton();
//Document Event Listeners
$(document).on("click", ".gif", displayGifs);{

$(".input").hide;
}

//
//
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});
