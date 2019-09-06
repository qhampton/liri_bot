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
//put divider indevtween requested info 
var divider = "\n------------------------------------------------------------\n\n";

// inquire prompts - ui of bot 
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
                concertSearch(answer.term);
                console.log("You want to go" + answer.term);
                //run band function
                break;
            case "Spotify-this-song":
                console.log("You want to hear" + answer.term);
                songSearch(answer.term);
                break;
            case "Movie-this":
                movieSearch(answer.term);
                break;
            case "Do-what-it-says":
                    // if(err) throw err;
                    // fs.readFile('random.txt','utf8',function(err,data){
                    //     if(err) throw err;
                    // });
                break;
        }


//functions of bot
//band api -give artist/band name -> returns venue name, location, and dates
var concertSearch = function () {
    this.findConcert = function (term) {
        var bandURL = "https://rest.bandsintown.com/artists/" + answer.term + "/events?app_id=codingbootcamp";
        axios.get(bandURL).then(function (response){
        var data = response.data;
        var concertData = [
            "Place" + venue.name,
            "Location" + venue.region,
            "Date" + moment(response.datetime).format("MM/DD/YYYY"),
            +divide,
        ]
        console.log(concertData);
    });
}}
//spotify api -give song name -> returns artis, song name, preview link, and album (default The Sign by Ace of Base)
// written as an e6 function (arrow function)
var songSearch=()=>{spotify
    .request('https://api.spotify.com/v1/tracks/' + answer.term)
    .then(function (data) {
        var record = data.records.items[0];
        var artists = record.artists;
        var recordName = record.name;
        var preview = record.preview_url;
        var album= record.album.name;
        console.log("\nArtist: " + artists + "\nRecord: "+recordName+ "\nPreview URL: "+preview+"\nAlbum: "+album +divide);
    })
    .catch(function (err) {
        console.error('Error occurred: ' + err);
    });
};

//movie api -give movie name -> return title, year, rating, rotten tomatoes rating, country, language, actors (defualt Mr. Nobody)
var movieSearch = function () {
        // findMovie takes in the name of a tv show and searches the tvmaze API
        this.findMovie = function (term) {
            var URL = "http://www.omdbapi.com/?t=" + answer.term + "&apikey=trilogy";

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
                    +divide
                ].join("\n\n");

                // Append movieData and the divider to log.txt, print movieData to the console
                // fs.appendFile("log.txt", movieData + divider, function (err) {
                //     if (err) throw err;
                console.log(movieData);
                // });
            });
        };
    }
});