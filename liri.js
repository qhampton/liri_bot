//allows us to use .env the way we do load the variables we have listed in the file
require('dotenv').config()
//allows us to call our spotify api credentials
var keys = require("./keys.js");
//calls npm spotify package
var Spotify = require("node-spotify-api");
//creating new variable based of class Spotify to use
var spotify = new Spotify(keys.spotify);
//calls npm axios package which is used to call apis (http client)
var axios = require("axios");
//calls npm iquirer package to prompt user input in terminal
var inquirer = require("inquirer");

//band api -give artist/band name -> returns venue name, location, and dates

//spotify api -give song name -> returns artis, song name, preview link, and album (default The Sign by Ace of Base)
//written as an e6 function (arrow function)
var songSearch=()=>{spotify
    .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
    .then(function (data) {
        console.log(data);
    })
    .catch(function (err) {
        console.error('Error occurred: ' + err);
    });
}

//movie api -give movie name -> return title, year, rating, rotten tomatoes rating, country, language, actors (defualt Mr. Nobody)

var Movie = function () {
        // divider will be used as a spacer between the tv data we print in log.txt
        var divider = "\n------------------------------------------------------------\n\n";

        // findMovie takes in the name of a tv show and searches the tvmaze API
        this.findMovie = function (show) {
            var URL = "http://www.omdbapi.com/?t=" + show + "&apikey=trilogy";

            axios.get(URL).then(function (response) {
                // Place the response.data into a variable, jsonData.
                var jsonData = response.data;

                // movieData ends up being the string containing the show data we will print to the console
                var movieData = [
                    "Title: " + jsonData.title,
                    "Year: " + jsonData.year,
                    "IMDB Rating: " + jsonData.ratings[3].imdbRating,
                    "Rotten Tomatoes Rating: " + jsonData.rating.average,
                    "Country: " + jsonData.country,
                    "Language: " + jsonData.language,
                    "Actors: " + jsonData.actors,
                ].join("\n\n");

                // Append movieData and the divider to log.txt, print movieData to the console
                fs.appendFile("log.txt", movieData + divider, function (err) {
                    if (err) throw err;
                    console.log(movieData);
                });
            });
        };
    }
        //other command - do command listed in random txt
// inquire prompts 

inquirer 
    .prompt ([
        {
            type: "list",
            message: "How can I help you today?",
            choices: ["Concerts-this","Spotify-this-song","Movie-this", "Do-what-it-says"],
            name: "liriCommands"
        },
        {
            type:"input",
            message: "What specifically are you looking for?",
            name: "term"
        },
    ])
    .then(function(answers){
        console.log(answers);
        switch (answers.liriCommands){
            case "Concerts-this": 
                console.log("You want to go" + answers.term);
                //run band function
                break;
            
        }
    });