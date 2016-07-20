var Movie = require("../models/movie")

var MoviesContoller = {

  index: function (req, res, next) {

    Movie.all(function(error, movies) {
      if(error) {
        var err = new Error("Error retrieving book list:\n" + error.message)
        err.status = 500
        next(err)
      } else {
        var locals = {}
        locals.type = "movies"
        locals.media = movies
        res.render ('index', { locals: locals })
      }
    })
  },

  show: function (req, res, next) {
    var id = req.params.movie_id

    Movie.find(id, function(error, movies) {
      if(error) {
        var err = new Error("Error retrieving book list:\n" + error.message)
        err.status = 500
        next(err)
      } else {
        var locals = {}
        locals.type = "movies"
        locals.madeBy = "Directed"
        locals.media = movies[0]
        res.render ('show', { locals: locals })
      }
    })
  },

  upvote: function (req, res, next) {
    var movie_id = req.body.upvote

    Movie.addVote(movie_id, function(error, moe_id) {
      if(error) {
        var err = new Error("Error retrieving book list:\n" + error.message)
        err.status = 500
        next(err)
      } else {
        res.redirect (200, '/movies/' + movie_id)
      }
    })
  },

  edit: function (req, res, next) {
    var movie_id = req.params.movie_id

    Movie.find(movie_id, function(error, movies) {
      if(error) {
        var err = new Error("Error retrieving movie:\n" + error.message)
        err.status = 500
        next(err)
      } else {
        var locals = {}
        locals.type = "movies"
        locals.madeBy = "Directed"
        locals.media = movies[0]
        // console.log("bah: ", locals.madeBy)
        res.render ('edit', { locals: locals })
      }
    })
  }

}

module.exports = MoviesContoller
