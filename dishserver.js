var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Dishes.create({
        name: 'Uthapifgjhzza',
        description: 'A unique . . .',
        image: 'images/uthapizza.png',
        category: 'mains',
        label: 'Hot',
        price: '$4.99',
        comments: [
            {
                "rating": 5,
                "comment": "Imagine all the eatables, living in conFusion!",
                "author": "John Lemon"
            },
            {
                "rating": 4,
                "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                "author": "Paul McVites"
            }
        ]
    }, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!', dish);


        Dishes.find({}, function (err, dishes) {
            if (err) throw err;

            // object of all the users
            console.log("Save dishes", dishes);
            db.collection('dishes').drop(function () {
                db.close();
            });
        });


    });
});