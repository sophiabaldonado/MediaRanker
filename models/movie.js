var app = require("../app");
var db = app.get("db");

// Constructor function
var Movie = function(movie) {
  this.id = movie.id
  this.name = movie.name
  this.description = movie.description
  this.by = movie.director
  this.votes = movie.votes
}

Movie.all = function(callback) {
  db.run("SELECT * FROM movies ORDER BY votes;", function(error, movies) {
    if(error || !movies) {
      callback(error || new Error("Could not retrieve movies"), undefined)
    } else {
      callback(null, movies.map(function(movie) {
        return new Movie(movie)
      }))
    }
  })
}

Movie.find = function(input, callback) {
  db.movies.find({id: input}, function(error, movies) {
    if(error || !movies) {
      callback(error || new Error("Could not retrieve movie"), undefined)
    } else {
      callback(null, movies.map(function(movie) {
        return new Movie(movie)
      }))
    }
  })
}

Movie.topTen = function(callback) {
  db.run("SELECT * FROM movies ORDER BY votes DESC LIMIT 10;", function(error, movies) {
    if(error || !movies) {
      callback(error || new Error("Could not retrieve movies"), undefined)
    } else {
      callback(null, movies.map(function(movie) {
        return new Movie(movie)
      }))
    }
  })
}

Movie.addVote = function(input, callback) {
  db.run("UPDATE movies SET votes=votes+1 WHERE id=$1;", [input], function(error, movie) {
    movie_id = input
    if(error || !movie) {
      callback(error || new Error("Could not retrieve movies"), undefined)
    } else {
      callback(null, movie_id)
    }
  })
}

module.exports = Movie
