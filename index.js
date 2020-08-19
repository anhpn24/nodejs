var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var userRoute = require('./router/userRouter');
var roleRoute = require('./router/roleRouter');
var app = express();

app.listen(process.env.PORT || 3000);
userRoute(app, bodyParser);
roleRoute(app, bodyParser);

mongoose.connect('mongodb+srv://anhpn:FKTLo2r7pvyNd48q@clusteranhpn.ayx97.mongodb.net/Demo?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err) {
            console.log('Connect failed !!!' + err);
        } else {
            console.log('Connect successfully.');
        }
    });

app.get("/", function (req, res) {
    res.end('Hello, World !!!');
});

app.get('*', function (req, res) {
    // res.sendStatus(404);
    res.redirect('/');
});
