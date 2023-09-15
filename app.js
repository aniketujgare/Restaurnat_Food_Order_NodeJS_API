//! User: aniketujgare
//! Pass: DtnNaPlLidQJPOIh

const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');


mongoose.connect(`mongodb+srv://aniketujgare:${process.env.MONGO_ATLAS_PW}@cluster0.0ccq4oe.mongodb.net/Restaurants`, {
    useNewUrlParser: true
});

app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

const restaurantRouts = require('./api/routes/restaurant');
const menuItemRouts = require('./api/routes/menu_item');
app.use('/', restaurantRouts);
app.use('/menu', menuItemRouts);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});
module.exports = app;