const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const config = require('./config');

// Carrega os Models
const User = require('./models/user');

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const authRoute = require('./routes/auth-route');
const userRoute = require('./routes/user-route');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));


// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/authenticate', authRoute);
app.use('/users', userRoute);

// Connecta ao banco
let URI = config.connectionString;
mongoose.connect (URI, err => {
    if (err) console.log("There was an error connection to MongoDB.\nPlease check your connection.")    
    }
);        

module.exports = app;