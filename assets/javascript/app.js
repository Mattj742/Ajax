var topics = ["Superman", "Batman", "Gambit", "Deadpool"];

function displaySuperheroInfo() {

    $("#superhero-view").empty();
    var superhero = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        superhero + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var gif = $("<img>");

            gif.attr({
                src: results[i].images.fixed_height_still.url,
                state: 'still',
                'gif-active': results[i].images.fixed_height.url,
                'gif-still': results[i].images.fixed_height_still.url
            });

            gifDiv.append(p);
            gifDiv.append(gif);

            $("#superhero-view").prepend(gifDiv);
        }

        $("#superhero-view").on('click', 'img', function() {

            if ($(this).attr('state') === 'still') {
                $(this).attr({ 'src': $(this).attr('gif-active'), state: 'active' });
            } 
            else if ($(this).attr('state') === 'active') {
                $(this).attr({ 'src': $(this).attr('gif-still'), state: 'still' });

            }
        });
    });
}
// Function for displaying buttons
function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {

        var a = $("<button>");
        a.addClass("superhero");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);

        $("#buttons-view").append(a);
    }
}

// This function handles events where a button is clicked
$("#add-superhero").on("click", function(event) {
    event.preventDefault();

    var superhero = $("#superhero-input").val().trim();

    topics.push(superhero);

    renderButtons();
});

// Adding a click event listener
$(document).on("click", ".superhero", displaySuperheroInfo);

renderButtons();
