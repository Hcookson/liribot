// var input = process.argv[2];
// var input2 = process.argv[3]
// var request = require('request');
// var spotify = require('node-spotify-api');

// // OMDB Section

// function Movie(paramaters) {
//     var queryUrl = "http://www.omdbapi.com/?t=" + paramaters + "&y=&plot=short&apikey=trilogy";
//     console.log(queryUrl);


//     request(queryUrl, function (error, response, body) {

//         // If the request is successful
//         if (!error && response.statusCode === 200) {

//             // Parse the body of the site and recover just the imdbRating
//             // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//             console.log(body);
//         }
//     });
// }
// Movie(input);


require("dotenv").config();
var request = require("request");
let dataKeys = require("./keys.js");
var Spotify = require('node-spotify-api');

// ------------------------------------------------

//takes the command from the terminal
var userCommand = process.argv[2];
//takes the additional input required for few of the commands
var userInput = process.argv[3];

function validateInput(){
    console.log(`
    Command entered = ${userCommand}
    Search value specified = ${userInput}
    `)
    if((userCommand === "concert-this" || userCommand === "spotify-this" || userCommand === "movie-this") && (userInput === '' || userInput === undefined)){
        console.log(`Missing input for your search. Default band (Metallica) enabled`)
    };

    if (userCommand != "concert-this" && userCommand != "spotify-this" && userCommand != "movie-this" && userCommand != "do-what-it-says"){
        console.log(`Input is not defined`)
    };
}

function bandsInTown(){
    // Bands In Town API to return Name of Venue, Venue Location, and Date of event MM/DD/YYYY

    if(userInput===''|| userInput === undefined){
        userInput = 'Metallica';
    };

    request(`https://rest.bandsintown.com/artists/${userInput}/events?app_id=codingbootcamp`, function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
        // var output = body.split(",");
        // console.log(JSON.parse(body));
        var object = JSON.parse(body);
        // console.log("object:" + object[0].venue.name);
        object.forEach(element => {
            //  console.log(element);
             console.log(`
            Venue: ${element.venue.name}
            Venue Location: ${element.venue.city}, ${element.venue.country}
            Date of Event: ${element.datetime}
            `);
        });
        
    }
    });
    
}

function spotify(){
    // default if undifined input
    if(userInput===''|| userInput === undefined){
        userInput = 'Metallica';
    };
   
}

function omdb(){
   
    //api key = trilogy
    
    //default to Ghostbusters if no user input
    if(userInput===''|| userInput === undefined){
        userInput = 'Ghostbusters'
    };

    request(`http://www.omdbapi.com/?t=${userInput}&y=&plot=short&apikey=trilogy`, function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
    
    // Parse the body of the site
    console.log(`
    Title: ${JSON.parse(body).Title}
    Year: ${JSON.parse(body).Year}
    IMBD Rating: ${JSON.parse(body).imdbRating}
    Country: ${JSON.parse(body).Country}
    Language: ${JSON.parse(body).Language}
    Plot: ${JSON.parse(body).Plot}
    Actors: ${JSON.parse(body).Actors}
    `);

//Missing Rotten Tomatoes Rating: + ${JSON.parse(body).Year}

  }
});

}

function doWhatItSays(){

}

// ----------------------------------

validateInput();
if(userCommand === "concert-this"){
    bandsInTown();
}
if(userCommand === "spotify-this"){
    spotify();
}
if(userCommand === "movie-this"){
    omdb();
}
if(userCommand ==='do-what-it-says'){
    doWhatItSays();
}