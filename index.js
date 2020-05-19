const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");


const app = express();
console.log(JSON.stringify(require('./server/config')));
console.log(require('./server/config').keys.mongoURI);
const db = require('./server/config').keys.mongoURI
const PORT = process.env.PORT || 8000;

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/build'));

mongoose.connect(db)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err.message))

// Passport middleware
require("./server/api/middleware/passport")(passport);
app.use(passport.initialize());

app.use('/api', require('./server/api'));

app.listen(PORT, () => console.log("Listening on port " + PORT));
