var Album = require("../models/album")

var AlbumsController = {
  index: function (req, res, next) {

    Album.all(function(error, albums) {
      if(error) {
        var err = new Error("Error retrieving book list:\n" + error.message)
        err.status = 500
        next(err)
      } else {
        var locals = {}
        locals.type = "albums"
        locals.displayType = "Album"
        locals.media = albums
        res.render ('index', { locals: locals })
      }
    })
  },

  show: function (req, res, next) {
    var id = req.params.album_id

    Album.find(id, function(error, albums) {
      if(error) {
        var err = new Error("Error retrieving book list:\n" + error.message)
        err.status = 500
        next(err)
      } else {
        var locals = {}
        locals.type = "albums"
        locals.displayType = "Album"
        locals.madeBy = "Recorded"
        locals.media = albums[0]
        res.render ('show', { locals: locals })
      }
    })
  },

  upvote: function (req, res, next) {
    var album_id = req.body.upvote

    Album.addVote(album_id, function(error, moe_id) {
      if(error) {
        var err = new Error("Error retrieving book list:\n" + error.message)
        err.status = 500
        next(err)
      } else {
        return res.redirect ('/albums/' + album_id)
      }
    })
  },

  new: function (req, res, next) {
    var locals = {}
    locals.type = "albums"
    locals.displayType = "Album"
    locals.madeBy = "Directed"
    res.render ('new', { locals: locals })
  },

  edit: function (req, res, next) {
    var album_id = req.params.album_id

    Album.find(album_id, function(error, albums) {
      if(error) {
        var err = new Error("Error retrieving album:\n" + error.message)
        err.status = 500
        next(err)
      } else {
        var locals = {}
        locals.type = "albums"
        locals.madeBy = "Directed"
        locals.media = albums[0]
        res.render ('edit', { locals: locals })
      }
    })
  },

  update: function (req, res, next) {
    var album_id = req.body.albums_id
    var name = req.body.name
    var description = req.body.description
    var artist = req.body.by

    Album.update([name, description, artist, album_id], function(error, id) {
      if(error) {
        var err = new Error("Error retrieving album list:\n" + error.message)
        err.status = 500
        next(err)
      } else {
        return res.redirect ('/albums/' + album_id)
      }
    })
  },

  add: function (req, res, next) {
    var name = req.body.name
    var description = req.body.description
    var artist = req.body.by

    Album.create([name, description, artist], function(error, album) {
      console.log("boop: ", album)
      if(error) {
        var err = new Error("Error retrieving album list:\n" + error.message)
        err.status = 500
        next(err)
      } else {
        return res.redirect ('/albums/' + album.id)
      }
    })
  },

  delete: function (req, res, next) {
    var album_id = req.body.delete

    Album.delete(album_id, function(error, id) {
      if(error) {
        var err = new Error("Error retrieving album list:\n" + error.message)
        err.status = 500
        next(err)
      } else {
        return res.redirect ('/albums')
      }
    })
  }

}

module.exports = AlbumsController
