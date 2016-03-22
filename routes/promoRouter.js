var express = require('express');
var bodyParser = require('body-parser');

var Promotion = require('../models/promotion.js');
var promotionRouter = express.Router();
var Verify = require('./verify.js');

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')

    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Promotion.find({}, function (err, prom) {
            if (err) throw err;
            res.json(prom);
        });
    })

    .post(Verify.verifyAdmin, function (req, res, next) {
        Promotion.create(req.body, function (err, prom) {
            if (err) throw err;
            console.log('Promotion created!');
            var id = prom._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the promotion with id: ' + id);
        });
    })

    .delete(Verify.verifyAdmin, function (req, res, next) {
        Promotion.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

promotionRouter.route('/:promId')

    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Promotion.findById(req.params.promId, function (err, prom) {
            if (err) throw err;
            res.json(prom);
        });
    })

    .put(Verify.verifyAdmin, function (req, res, next) {
        Promotion.findByIdAndUpdate(req.params.promId, {
            $set: req.body
        }, {
            new: true
        }, function (err, prom) {
            if (err) throw err;
            res.json(prom);
        });
    })

    .delete(Verify.verifyAdmin, function (req, res, next) {
        Promotion.findByIdAndRemove(req.params.promId, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

module.exports = promotionRouter;