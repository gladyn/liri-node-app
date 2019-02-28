require("dotenv").config();


//variables 
var keys = require("./keys.js");
var request = require('request');
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var time = moment().format('HH:mm:ss');
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var input = process.argv;
var action = input[2];
var inputs = input[3];

switch (action) {
    case "spotify-this-song":
        spotifySong(inputs);
        break;

    case "concert-this":
        bandInT(inputs);
        break;

    case "movie-this":
        showMovie(inputs);
        break;

    case "do-what-it-says":
        doit();
        break;
};

// spotify music search function
function spotifySong(inputs) {
    if (inputs === undefined) {
        inputs = "The Sign by ace of base";
    }
    spotify.search(
        {
            type: "track",
            query: inputs,
            limit: 10
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;
            for (var i = 0; i < songs.length; i++) {
                console.log("______________________________________");
                console.log(i);
                console.log("Artist name: " + songs[i].artists[0].name);
                console.log("Song title: " + songs[i].name);
                console.log("Track number: " + songs[i].track_number);
                console.log("Album: " + songs[i].album.name);
                console.log("Release date: " + songs[i].album.release_date);
                console.log("Album type: " + songs[i].album.album_type);
                console.log("Preview song: " + songs[i].preview_url);
                console.log("----------------------------------------");
            }
        }
    );
};

// omdb to pull up movie info
function showMovie(inputs) {

    console.log("this is movie-this ", inputs);
    if (inputs === undefined) {
        inputs = "Mr Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey="ecce8d19";

    request(queryUrl, function (error, response, body) {

        // console.log("body ", body);

        if (!error && response.statusCode === 200) {

            console.log("------------------------------------");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Source[1]);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("------------------------------------");
        }
    });
};

// find concerts
function bandInT(inputs) {
    request("https://rest.bandsintown.com/artists/" + inputs + "/events?app_id=codingbootcamp", function (error, response, body) {

        if (inputs === undefined) {
            console.log("Please input a band.");
        }

        if (inputs <= 1) {
            console.log("Sorry! " + inputs + " isn't playing right now. Choose again.");
        }

        if (!error && response.statusCode === 200) {

          //need concert dates venue ect 

          // need to show read random.txt   