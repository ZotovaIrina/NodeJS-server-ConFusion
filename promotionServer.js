var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotion');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Promotions.create({
        name: 'Weekend Grand Buffet',
        description: 'Featuring . . .',
        image: 'images/buffet.png',
        label: 'New',
        price: '19.99'
    }, function (err, promotion) {
        if (err) throw err;

        console.log('Promotion created!', promotion);


        Promotions.find({}, function (err, promotion) {
            if (err) throw err;

            // object of all the users
            console.log("Save promotion", promotion);
            db.collection('promotions').drop(function () {
                db.close();
            });
        });


    });
});