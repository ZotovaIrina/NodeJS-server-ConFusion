var express = require('express');
var bodyParser = require('body-parser');

var promotion = express.Router();

promotion.use(bodyParser.json());

promotion.route('/')
    .all(function(req,res,next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
    })

    .get(function(req,res,next){
        res.end('Will send all the promotions to you!');
    })

    .post(function(req, res, next){
        res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
    })

    .delete(function(req, res, next){
        res.end('Deleting all promotions');
    });

promotion.route('/:promId')
    .all(function(req,res,next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
    })

    .get(function(req,res,next){
        res.end('Will send details of the promotion: ' + req.params.promId +' to you!');
    })

    .put(function(req, res, next){
        res.write('Updating the promotion: ' + req.params.promId + '\n');
        res.end('Will update the promotion: ' + req.body.name +
            ' with details: ' + req.body.description);
    })

    .delete(function(req, res, next){
        res.end('Deleting promotion: ' + req.params.promId);
    });

module.exports = promotion;