var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Verify = require('./verify.js');

var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .all(Verify.verifyOrdinaryUser)

    .get(function (req, res, next) {
        var postedBy = req.decoded._doc._id;
        console.log("Get fevorites for user id: ", postedBy);
        Favorites.find({"postedBy": postedBy})
            .populate('postedBy')
            .populate('dishes')
            .exec(function (err, favorite) {
                if (err) throw err;
                res.json(favorite);
            });
    })

    .post(function (req, res, next) {
        Favorites.find({"postedBy": req.decoded._doc._id}, function (err, favorite) {
            console.log("Find favorites: ", favorite);
            if (err) throw err;
            if (favorite.length === 0) {
                console.log("Empty array. User not found");
                var newFavorites = new Favorites({"postedBy": req.decoded._doc._id, "dishes": [req.body._id]});

                newFavorites.save(function (err, favorite) {
                    console.log('favorite created!');
                    if (err) throw err;

                    res.json(favorite);

                });
            } else {
                for (var i = (favorite[0].dishes.length - 1); i >= 0; i--) {
                    if (favorite[0].dishes[i] == req.body._id) {
                        var err = new Error('This Dishes already favorite!');
                        err.status = 401;
                        return next(err);
                    }
                }
                favorite[0].dishes.push(req.body._id);
                //console.log("favorite[0] ", favorite[0], "req.body._id", req.body._id);
                favorite[0].save(function (err, favorite) {
                    if (err) throw err;
                    console.log('Updated favorite!');
                    res.json(favorite);
                });

            }
        })

    })

    .delete(function (req, res, next) {
        Favorites.find({"postedBy": req.decoded._doc._id}, function (err, favorite) {
            if (err) throw err;
            favorite[0].remove();
            console.log("Delete favorite", favorite);
            res.json(favorite);
        });
    });


favoriteRouter.route('/:dishObjectId')
    .all(Verify.verifyOrdinaryUser)

    .delete(function (req, res, next) {
        Favorites.find({"postedBy": req.decoded._doc._id}, function (err, favorite) {
            for (var i = (favorite[0].dishes.length - 1); i >= 0; i--) {
                if (favorite[0].dishes[i] == req.params.dishObjectId) {

                    favorite[0].dishes.splice(i, 1);
                    favorite[0].save(function (err, favorite) {
                        if (err) throw err;
                        console.log('Dish delete from favorite!');
                        res.json(favorite);
                    });
                }
            }
        })
    });

module.exports = favoriteRouter;