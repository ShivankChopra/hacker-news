const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/score');
const cors = require('cors');

const PORT = 3001;

// set up db
const dburl = "mongodb://localhost:27017/hackernewsdb";
mongoose.connect(dburl, { useNewUrlParser: true });
mongoose.promise = global.promise;
const db = mongoose.connection;

// set up server
const app = express();
app.use(bodyParser.json());
app.use(routes);
app.use(cors({
    'origin': '*',
    'methods': '*',
    'preflightContinue': false,
    'optionsSuccessStatus': 204
}));

app.get('/', (req, res) => {
    res.send('hello')
})

// start server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log('Server up and running on port : ' + PORT);
    });
});

db.on('error', (err) => console.log('Unable to start server. Error connecting to db ' + err));