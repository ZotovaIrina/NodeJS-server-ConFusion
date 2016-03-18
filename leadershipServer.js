var mongoose = require('mongoose'),
    assert = require('assert');

var Leaderships = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Leaderships.create({
        name: 'Peter Pan',
        designation: 'Chief Epicurious Officer',
        description: 'ur CEO, Peter, . . .',
        image: 'images/alberto.png',
        abbr: 'CEO'
    }, function (err, leadership) {
        if (err) throw err;

        console.log('Leadership created!', leadership);


        Leaderships.find({}, function (err, leadership) {
            if (err) throw err;

            // object of all the users
            console.log("Save leadership", leadership);
            db.collection('leaderships').drop(function () {
                db.close();
            });
        });


    });
});