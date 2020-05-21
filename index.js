const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");
require('dotenv').config();


const app = express();
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

app.get('*', function(request, response) {
  response.sendFile(path.resolve(`${__dirname}/client/build`, 'index.html'));
});

app.listen(PORT, () => console.log("Listening on port " + PORT));
