var express = require('express');
var bodyParser = require('body-parser');

var Leadership = require('../models/leadership.js');
var leadershipRouter = express.Router();
var Verify = require('./verify.js');

leadershipRouter.use(bodyParser.json());

leadershipRouter.route('/')

    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Leadership.find({}, function (err, leader) {
            if (err) throw err;
            res.json(leader);
        });
    })

    .post(Verify.verifyAdmin, function (req, res, next) {
        Leadership.create(req.body, function (err, leader) {
            if (err) throw err;
            console.log('Leadership created!');
            var id = leader._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the leadership with id: ' + id);
        });
    })

    .delete(Verify.verifyAdmin, function (req, res, next) {
        Leadership.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

leadershipRouter.route('/:leadId')

    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Leadership.findById(req.params.leadId, function (err, leader) {
            if (err) throw err;
            res.json(leader);
        });
    })

    .put(Verify.verifyAdmin, function (req, res, next) {
        Leadership.findByIdAndUpdate(req.params.leadId, {
            $set: req.body
        }, {
            new: true
        }, function (err, leader) {
            if (err) throw err;
            res.json(leader);
        });
    })

    .delete(Verify.verifyAdmin, function (req, res, next) {
        Leadership.findByIdAndRemove(req.params.leadId, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

module.exports = leadershipRouter;